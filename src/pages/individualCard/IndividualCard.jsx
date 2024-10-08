import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventDetails, getUserDetails } from '../../api';
import './IndividualCard.css';
import { useAuth } from '../../AuthContext';

const BASE_URL = 'http://13.234.118.246';

const IndividualCard = ({ setEventsToCheckout, eventToCheckOut }) => {
  const { eventCode } = useParams();
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [eventData, setEventData] = useState(null);
  const [user, setUser] = useState(null);
  const [rollNumbers, setRollNumbers] = useState([]);
  const [newRollNumber, setNewRollNumber] = useState('');
  const [teamName, setTeamName] = useState('');
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  

  useEffect(() => {
    if (!authState.token && !hasCheckedAuth) {
      // If the user is not logged in, show alert and redirect them to the login page
      setHasCheckedAuth(true); // Set the flag to true after the first check
      alert('You must be logged in');
      navigate('/login');
      return;
    }
  
    const fetchEventDetails = async () => {
      try {
        const response = await getEventDetails(eventCode);
        setEventData(response.data.event); // Set eventData once fetched
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };
  
    fetchEventDetails();
  }, [authState.token, eventCode, navigate, hasCheckedAuth]);
  

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authState.token) {
        try {
          const response = await getUserDetails(authState.token);
          setUser(response.data.user); // Set user data once fetched
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [authState.token]); // Only depends on the token

  useEffect(() => {
    if (user && eventData && eventData.team_size === 1) {
      setRollNumbers([user.roll_no]);
    }
  }, [user, eventData]); // Depends on both user and eventData

  if (!eventData || !user) return <div>Loading...</div>;

  const handleAddRollNumber = () => {
    if (/^\d{7}$/.test(newRollNumber)) {
      if (rollNumbers.includes(newRollNumber)) {
        alert('This roll number has already been added.');
      } else if (rollNumbers.length < eventData.team_size) {
        setRollNumbers([...rollNumbers, newRollNumber]);
        setNewRollNumber('');
      } else {
        alert('Team is already full.');
      }
    } else {
      alert('Please enter a valid 7-digit roll number.');
    }
  };

  const handleSave = () => {
    if (eventData.entry_fee === 0) {
      // For free events, add the event to checkout without roll numbers
      const newEvent = {
        eventCode: eventCode,
        rollNumbers: [],
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        teamName: '',
      };

      setEventsToCheckout(prevEvents => [...prevEvents, newEvent]);
      localStorage.setItem('eventsToCheckout', JSON.stringify([...eventToCheckOut, newEvent]));
      navigate('/profile'); // Redirect to the profile page
    } else {
      // Ensure the team size and roll numbers match for team events
      if (eventData.is_team_size_strict && rollNumbers.length < eventData.team_size) {
        alert(`Please add ${eventData.team_size - rollNumbers.length} more roll numbers to complete the team.`);
        return;
      }
    
      if (rollNumbers.length === 0) {
        alert('Please add at least one roll number.');
        return;
      }
    
      const newEvent = {
        eventCode: eventCode,
        rollNumbers: [...rollNumbers],
        title: eventData.title,
        start: eventData.start,
        end: eventData.end,
        teamName: teamName,
      };
    
      setEventsToCheckout(prevEvents => [...prevEvents, newEvent]);
      localStorage.setItem('eventsToCheckout', JSON.stringify([...eventToCheckOut, newEvent]));
    
      // Decrement seats only if it's not a team event
      if (eventData.team_size === 1) {
        eventData.max_seats -= 1; // Decrease seats by 1 for individual participation
      }
      navigate('/profile'); // Redirect to the profile page
    }
  };

  return (
    <div className='flex w-full justify-center items-center'>
      <div className="event-card">
        <div className="left-section">
          <div className="event-image">
            <img src={`${BASE_URL}${eventData.image}`} alt={eventData.title || "Event"} />
          </div>
          {eventData.entry_fee !== 0 && (
            <>
              <div className="seats-info">
                <b>Seats: {eventData.max_seats - eventData.seats}</b>
              </div>

              {eventData.team_size > 1 && (
                <>
                  <div className="roll-number-input team-name-input">
                    <input
                      className='p-2'
                      type="text"
                      placeholder="Team Name"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                    />
                  </div>
                  <div className="roll-number-input m-2">
                    <input
                      type="text"
                      placeholder="Roll no"
                      value={newRollNumber}
                      onChange={(e) => setNewRollNumber(e.target.value)}
                    />
                    <button onClick={handleAddRollNumber}>Add</button>
                  </div>
                </>
              )}
              <div className="roll-number-list-container">
                <div className="roll-number-list">
                  {rollNumbers.map((roll, index) => (
                    <div key={index} className="roll-number">{roll}</div>
                  ))}
                </div>
              </div>
            </>
          )}
          {eventData.entry_fee !== 0 && (
            <button className="join-button" onClick={handleSave}>Save</button>
          )}
        </div>
        <div className="right-section">
          <div className="title">
            <span className="big-bold-text">{eventData.title}</span>
          </div>
          <div className="event-details">
            <p>
              Day: {eventData.day}<br />
              Time: {eventData.start} - {eventData.end}<br />
              Team Size: {eventData.team_size === 1 ? 'Solo Event' : eventData.team_size}<br />
              {eventData.entry_fee === 0 ? (
                <span>You are always welcomed for this event.</span>
              ) : (
                `Price: ${eventData.entry_fee}/-`
              )}
            </p>
          </div>
          <p className="event-description">
            {eventData.event_rules}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IndividualCard;

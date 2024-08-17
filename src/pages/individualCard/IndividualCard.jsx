import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEventDetails, getUserDetails } from '../../api';
import './IndividualCard.css';
import Sponsors from '../../components/Sponsors';
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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await getEventDetails(eventCode);
        setEventData(response.data.event); // Set eventData once fetched
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventCode]); // Only depends on eventCode

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

  // A third effect to handle automatic roll number addition after both data are fetched
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
  
    // Add the new event to the checkout list
    setEventsToCheckout(prevEvents => [...prevEvents, newEvent]);
  
    // Optionally store in localStorage
    localStorage.setItem('eventsToCheckout', JSON.stringify([...eventToCheckOut, newEvent]));
  
    // Decrement seats only if it's not a team event
    if (eventData.team_size === 1) {
      eventData.max_seats -= 1; // Decrease seats by 1 for individual participation
    }
    console.log(newEvent)
    navigate('/profile'); // Redirect to the profile page
  };
  

  return (
    <div className='flex w-full flex justify-center items-center'>
      <div className="event-card ">
        <div className="left-section">
          <div className="event-image">
            <img src={`${BASE_URL}${eventData.image}`} alt={eventData.title || "Event"} />
          </div>
          <div className="seats-info">
  <b>Seats: {eventData.max_seats-eventData.seats}</b>
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
          <button className="join-button" onClick={handleSave}>Save</button>
        </div>
        <div className="right-section">
          <div className="title">
            <span className="big-bold-text">{eventData.title}</span>
          </div>
          <div className="event-details">
            <p>
              Day: {eventData.day}<br />
              Time: {eventData.start} - {eventData.end}<br />
              Venue: {/* Add venue if available */}<br />
              Price: {eventData.entry_fee}/-
            </p>
          </div>
          <p className="event-description">
            {eventData.description}
          </p>
        </div>
      </div>
      <Sponsors />
    </div>
  );
};

export default IndividualCard;

import { useState, useEffect } from 'react';
import userImg from '../../assets/image.png'
import { useAuth } from '../../AuthContext';
import { getEventDetails, getUserDetails, registerForEvent } from '../../api';

const Profile = ({ eventToCheckOut, setEventsToCheckout }) => {
  const { authState } = useAuth();
  const [user, setUser] = useState(null);
  const [verifiedEvents, setVerifiedEvents] = useState([]);
  const [unverifiedEvents, setUnverifiedEvents] = useState([]);
  const [rollNo, setRollNo] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (authState.token) {
        try {
          const response = await getUserDetails(authState.token);
          const userData = response.data.user;
          setUser(userData);

          const verified = [];
          const unverified = [];

          const eventDetailsRequests = userData.participations.map(participation =>
            getEventDetails(participation.event.event_code)
          );

          const eventDetailsResponses = await Promise.all(eventDetailsRequests);

          userData.participations.forEach((participation, index) => {
            const eventDetailsData = eventDetailsResponses[index].data.event;

            if (participation.is_verified) {
              verified.push({
                ...eventDetailsData,
                teamName: participation.team_name,
                members: participation.members,
              });
            } else {
              unverified.push({
                ...eventDetailsData,
                teamName: participation.team_name,
                members: participation.members,
              });
            }
          });

          setVerifiedEvents(verified);
          console.log(verified);
          setUnverifiedEvents(unverified);

        } catch (error) {
          console.error('Error fetching user details or events:', error);
        }
      }
    };

    fetchUserDetails();
  }, [authState.token]);

  const handleCheckout = async () => {
    if (rollNo.trim() === '') {
      setCheckoutStatus('Please enter your roll number.');
      return;
    }
  
    try {
      let isSuccess = true;
      let message = '';
  
      // Process each event in the checkout list
      for (const event of eventToCheckOut) {
        // Check if the roll number is already in the rollNumbers array
        const allRollNumbers = event.rollNumbers.includes(rollNo)
          ? [...event.rollNumbers]
          : [...event.rollNumbers, rollNo];
  
        const data = {
          event_code: event.eventCode,
          team_name: event.teamName,
          members: JSON.stringify(allRollNumbers), // Convert the list to a JSON string
        };
  
        try {
          const response = await registerForEvent(authState.token, data);
  
          if (response.success) {
            continue; // Proceed with next event if the current one is successful
          } else {
            isSuccess = false;
            message = `Failed to register for ${event.title}: ${response.detail || 'No error message provided'}`;
            break; // Stop further registration attempts if any fail
          }
        } catch (error) {
          console.error(`Error during registration for ${event.title}:`, error);
          isSuccess = false;
          message = `Error during registration for ${event.title}: ${error.message || 'Unknown error'}`;
          break;
        }
      }
  
      if (isSuccess) {
        setCheckoutStatus('All events registered successfully!');
        setEventsToCheckout([]); // Clear events after successful checkout
      } else {
        setCheckoutStatus(message); // Show failure message for the specific event
      }
    } catch (error) {
      setCheckoutStatus('Error during checkout: ' + error.message);
      console.error('Error during checkout process:', error);
    }
  };
  
  
  

  return (
    <div className="p-6 font-sans">
      <div className="flex items-center mb-6">
        <img src={userImg} alt="Profile Image" className="w-24 h-24 rounded-full mr-4" />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{user?.name || 'Name'}</h2>
          <p className="text-lg text-gray-600">{user?.roll_no || 'Roll No'}</p>
        </div>
      </div>
      <h1 className="text-3xl font-semibold mb-6">DASHBOARD</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Verified Events</h2>
        {verifiedEvents.length ? (
          verifiedEvents.map((event, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4">
              <span className="block text-xl font-semibold">{event.title}</span>
              <span className="block text-gray-600">{`${event.start} - ${event.end}`}</span>
              <span className="block text-gray-600">Day: {`${event.day}`}</span>
              <span className="block italic text-gray-500">{`${event.teamName}`}</span>
              <span className="block text-green-500">Verified</span>
              {event.whatsapp_link && (
                <div className='flex'>
                  <a href={event.whatsapp_link} className="block bg-green-500 p-2 mt-2 rounded-lg  text-white" target="_blank" rel="noopener noreferrer">
                  Contact on WhatsApp
                </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600">No verified events.</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Unverified Events</h2>
        {unverifiedEvents.length ? (
          unverifiedEvents.map((event, index) => (
            <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4">
              <span className="block text-xl font-semibold">{event.title}</span>
              <span className="block text-gray-600">{`${event.start} - ${event.end}`}</span>
              <span className="block text-gray-600">Day: {`${event.day}`}</span>
              <span className="block italic text-gray-500">{`${event.teamName}`}</span>
              <span className="block text-yellow-500">Pending Verification</span>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No unverified events.</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Checkout Events</h2>
        {eventToCheckOut && eventToCheckOut.length > 0 ? (
          <div>
            {eventToCheckOut.map((event, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg mb-4">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <p>{`${event.start} - ${event.end}`}</p>
                <span className="block text-gray-600">Day: {`${event.day}`}</span>
                <p>{`${event.rollNumbers.join(', ')}`}</p>
              </div>
            ))}

            <div className="mt-6">
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter your roll number"
                className="p-2 border border-gray-300 rounded-lg mr-4"
              />
              <button
                onClick={handleCheckout}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Register
              </button>
              {checkoutStatus && <p className="mt-2 text-red-500">{checkoutStatus}</p>}
            </div>
          </div>
        ) : (
          <p>No events to checkout.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

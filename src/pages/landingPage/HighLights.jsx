import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../../api';
import '../landingPage/HighLight.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faMapMarkerAlt, faCalendarAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

const HighLights = () => {
  const sportsContainerRef = useRef(null);
  const culturalContainerRef = useRef(null);
  const [eventsData, setEventsData] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('S'); // Default to 'S' for Sports

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventData = await getEvents();
        setEventsData(eventData.data); // Ensure you're setting the correct data
        console.log(eventData.data); // Log to inspect the structure
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  if (!eventsData) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  // Filter events to show only featured events
  const featuredEvents = eventsData.events.filter(event => event.is_featured);

  // Further filter featured events based on the current category
  const filteredEvents = featuredEvents.filter(event => event.category === currentCategory);

  return (
    <>    
      <div className="landing-page">
        {/* <div className="blob1"></div> */}
        <h2 className='text-[32px]'>HIGHLIGHTS</h2>
        {['S', 'C'].map((category, index) => (
          <div key={index} className='flex-row overflow-hidden'>
            <h2 className='text-[24px]'>{category === 'S' ? 'SPORTS' : 'CULTURAL'}</h2>
            <div
              className="card-container flex"
              ref={category === 'S' ? sportsContainerRef : culturalContainerRef}
            >
              {featuredEvents.filter(event => event.category === category).map((item, idx) => (
                <Link to={`/individualCard/${item.event_code}`} key={idx}>
                  <div className="card">
                    <div className="small-box">
                      <div className="card-body">
                        <h3>{item.title}</h3>
                        <p><FontAwesomeIcon icon={faClock} /> {item.start} - {item.end}</p>
                        <p><FontAwesomeIcon icon={faCalendarAlt} /> Day {item.day}</p>
                        <p><FontAwesomeIcon icon={faMoneyBill} /> {item.entry_fee}/-</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        {/* <div className="blob2"></div> */}
      </div>
    </>
  );
};

export default HighLights;

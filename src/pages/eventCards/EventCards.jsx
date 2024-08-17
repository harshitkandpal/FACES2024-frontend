import { useState, useEffect } from 'react';
import { getEvents } from '../../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faChair, faTag, faChevronLeft, faChevronRight, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import './eventcard.css';
import { Link } from 'react-router-dom';

const EventCards = () => {
  const [eventsData, setEventsData] = useState(null);
  const [currentDay, setCurrentDay] = useState('day1');
  const [currentCategory, setCurrentCategory] = useState('C'); // Start with Cultural category
  const [flip, setFlip] = useState(false);
  const [slide, setSlide] = useState('');

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

  const handleDayChange = (day) => {
    if (day !== currentDay) {
      const direction = day > currentDay ? 'slide-right' : 'slide-left';
      setSlide(direction);
      setTimeout(() => {
        setCurrentDay(day);
        setSlide('');
      }, 400);
    }
  };

  const handleCategoryToggle = () => {
    const categories = ['C', 'S'];
    const currentIndex = categories.indexOf(currentCategory);
    const nextIndex = (currentIndex + 1) % categories.length;
    const newCategory = categories[nextIndex];
    setFlip(true);
    setTimeout(() => {
      setCurrentCategory(newCategory);
      setFlip(false);
    }, 500);
  };

  if (!eventsData) {
    return <div>Loading...</div>; // Show loading indicator while fetching data
  }

  const filteredEvents = eventsData.events.filter(event => 
    event.day === parseInt(currentDay.replace('day', '')) && event.category === currentCategory
  );

  return (
    <div className="event-cards-container">
      <div className="day-selector">
        <button onClick={() => handleDayChange('day1')} className={currentDay === 'day1' ? 'active' : ''}>DAY 1</button>
        <button onClick={() => handleDayChange('day2')} className={currentDay === 'day2' ? 'active' : ''}>DAY 2</button>
        <button onClick={() => handleDayChange('day3')} className={currentDay === 'day3' ? 'active' : ''}>DAY 3</button>
      </div>
      <div className="category-selector">
        <button onClick={handleCategoryToggle} className="arrow-button">
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span>
          {currentCategory === 'C' ? 'Cultural' : 'Sports'}
        </span>
        <button onClick={handleCategoryToggle} className="arrow-button">
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`event-cards-wrapper`}>
        <div className={`event-cards ${flip ? 'flip' : slide}`}>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, index) => (
              <Link to={`/individualCard/${event.event_code}`} key={index}>
                <div className="eventCard">
                  <div className="event-card-content">
                    <div className="event-card-details">
                      <h3>{event.title}</h3>
                      <div className="event-info">
                        <p><FontAwesomeIcon icon={faClock} /> {new Date(`1970-01-01T${event.start}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</p>
                        <p><FontAwesomeIcon icon={faChair} /> {event.seats}/{event.max_seats}</p>
                        <p><FontAwesomeIcon icon={faTag} /> {event.entry_fee}/-</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>No events available for this day and category.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCards;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/login/Login';
import LandingPage from './pages/landingPage/LandingPage';
import AboutFaces from './pages/aboutFaces/AboutFaces';
import EventCards from './pages/eventCards/EventCards';
import IndividualCard from './pages/individualCard/IndividualCard';
import Profile from './pages/profile/Profile';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import { EventProvider } from './contexts/EventContext'; // Import EventProvider

function App() {
  const [events, setEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [eventsToCheckout, setEventsToCheckout] = useState([]); // Centralized state

  useEffect(() => {
    const fetchEvents = async () => {
      // Fetch events and featured events (replace with actual API calls)
      // const eventData = await getEvents();
      // const featuredEventData = await getFeaturedEvents();
      
      // Simulated data
      setEvents([]);
      setFeaturedEvents([]);
    };

    fetchEvents();
  }, []);

  const Mainframe = ({ element }) => (
    <>
      <Navbar />
      {element}
      <Footer />
    </>
  );

  return (
    <AuthProvider>
      <EventProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Mainframe element={<LandingPage />} />} />
            <Route path='/aboutFaces' element={<Mainframe element={<AboutFaces />} />} />
            <Route path='/eventCards' element={<Mainframe element={<EventCards />} />} />
            <Route path="/profile" element={<Mainframe element={<Profile eventToCheckOut={eventsToCheckout} setEventsToCheckout={setEventsToCheckout} />} />} />
            <Route path="/individualCard/:eventCode" element={<Mainframe element={<IndividualCard setEventsToCheckout={setEventsToCheckout} eventToCheckOut={eventsToCheckout} />} />} />
            <Route path='/login' element={<Mainframe element={<Login />} />} />
          </Routes>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;

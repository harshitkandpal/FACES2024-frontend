
import mobPoster from '../../assets/mobPoster.jpg';
import pcPoster from '../../assets/pcPoster.jpg';
import '../landingPage/LandingPage.css'
import HighLights from './HighLights';
import Sponsors from '../../components/Sponsors';

const LandingPage = () => {
  return (
  <div className='bg-[#032A33]'>

  <div className="fullscreen-image">
    <img 
      src={pcPoster} 
      srcSet={`${mobPoster} 768w, ${pcPoster} 1024w`}
      alt="Poster" 
    />
  </div>

    <div>
      <HighLights />
    </div>
  </div>

  );
};

export default LandingPage;

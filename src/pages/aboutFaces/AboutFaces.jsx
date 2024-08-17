import './AboutFaces.css';
import myImage from "../../assets/finalimage.png"; // Importing the image


const AboutFaces = () => {
  return (
    <div className="body">
    {/* <div className="blob1"></div>        */}
    {/* <div className="blob1D"></div> */}
    {/* <img className="umangM" src={myImage} alt="My Local Image" /> */}
    {/* <img className="umangD" src={myImage1} alt="My Local Image" /> */}
    {/* <div className="blob2"></div> */}
    {/* <div className="blob2D"></div> */}
    <div className="umang-section">
      <img className="umang" src={myImage} alt="My Local Image" />
      <div className="about-umang">
        <h2>About Umang</h2>
        <p>
        “Umang” is a Hindi word that encapsulates the essence of boundless enthusiasm and excitement.
Umang is not just a fleeting emotion but a deep-seated drive that inspires people to pursue their dreams and embrace life's experiences with an open heart.
When enthusiasm meets the sportsmanship spirit, every match is an opportunity to grow, to push our limits, and to embrace the thrill of competition. True victory lies in the spirit of participation.
So, let's come together for this exciting sports event that fills you with boundless UMANG and joy !!
        </p>
      </div>
    </div>
    {/* <div className="dummy">
      <p>dummy1</p>
      <p>dummy2</p>
    </div> */}
    {/* <div className="blob1M"></div> */}
    {/* <img className="facesD" src={myImage1} alt="My Local Image" /> */}
    {/* <div className="blob2M"></div> */}
    {/* <div className="blob3D"></div> */}
    <div className="faces-section">
      <img className="faces" src={myImage} alt="My Local Image" />
      <div className="about-faces">
        <h2>About faces</h2>
        <p>FACES is a dynamic college festival that celebrates the intersection of sports and culture. 
          This event is a highlight of the academic year, offering students a platform to showcase their athletic and artistic talents. 
          The sports segment includes competitions in football, basketball, cricket, and other games, emphasizing teamwork, strategy, and 
          physical skill. Meanwhile, the cultural side of FACES features vibrant performances in singing and dancing, where students explore
           various genres and styles, from classical to contemporary. The fest also includes other cultural events like drama and fashion 
           shows, enriching the overall experience. FACES is more than just a series of competitions; it’s a celebration of youth and 
           creativity, fostering a strong sense of community and school spirit. It’s a time when students come together to share their 
           passions, build lasting friendships, and create memories that define their college experience.
        </p>
      </div>
    </div>
    
  </div>
  );
};

export default AboutFaces;

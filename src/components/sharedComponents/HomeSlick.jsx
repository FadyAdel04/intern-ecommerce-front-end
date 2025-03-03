import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "../../images/slick1 (1).jpg";
import slider2 from "../../images/slick1 (2).jpg";


function Mainslick() {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 1500, 
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} style={{ overflowX: "hidden" }}>
      <img src={slider1} alt="Slide 1" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
      <img src={slider2} alt="Slide 2" style={{ width: "100%", height: "400px", objectFit: "cover" }} />
    </Slider>
  );
}

export default Mainslick;

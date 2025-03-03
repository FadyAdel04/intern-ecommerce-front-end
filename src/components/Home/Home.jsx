
import Mainslick from "../sharedComponents/HomeSlick";
import CardSlider from "./Card-Slider/CardSlider";


const Home = () => {
  return (
    <>
      <div className="Home">
        <Mainslick/>
        <CardSlider />
      </div>
    </>
  );
};

export default Home;

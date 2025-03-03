import ClothingSlider from "../../sharedComponents/ClothingSlider" 
import BestSlider from "../../sharedComponents/BestSlider" 
import Card1 from "../Card/Card1" 
import HomeCard from "../../sharedComponents/HomeCard" 

const CardSlider = () => {
  return (
    <>
      <div className="HomeContent">
        <Card1/>
        <ClothingSlider />
        <HomeCard/>
        <BestSlider />
      </div>
    </>
  )
}

export default CardSlider
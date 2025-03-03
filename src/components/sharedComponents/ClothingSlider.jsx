import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ClothingSlider = () => {
  const [clothingItems, setClothingItems] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const clothes = data.filter(
          (item) =>
            item.category === "men's clothing" ||
            item.category === "women's clothing"
        );
        setClothingItems(clothes);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.firstChild.offsetWidth + 20; // Item width + gap
      sliderRef.current.scrollBy({
        left: direction === "next" ? itemWidth : -itemWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="clothing-slider-container">
      <h4 className="slider-title">Best Sellers in Clothing & Accessories</h4>
      <div className="clothing-slider-wrapper">
        <button className="slider-btn prev-btn" onClick={() => scrollSlider("prev")}>
          ❮
        </button>
        <div className="clothing-slider" ref={sliderRef}>
          {clothingItems.map((item) => (
            <div key={item.id} className="slider-item">
              <Link to={`/product/${item.id}`} className="product-link">
                <img src={item.image} alt={item.title} className="slider-img" />
              </Link>
            </div>
          ))}
        </div>
        <button className="slider-btn next-btn" onClick={() => scrollSlider("next")}>
          ❯
        </button>
      </div>
    </div>
  );
};

export default ClothingSlider;

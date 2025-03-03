import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = ({ onFilterChange }) => {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    brand: "All",
    price: "All",
    delivery: null,
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);

        // Extract unique brands (assuming brands are in the "category" field)
        const uniqueBrands = ["All", ...new Set(data.map((product) => product.category))];
        setBrands(uniqueBrands);

        // Calculate price ranges dynamically
        const prices = data.map((product) => product.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const step = (maxPrice - minPrice) / 4;

        const ranges = [
          "All",
          `${Math.floor(minPrice)} to ${Math.floor(minPrice + step)}`,
          `${Math.floor(minPrice + step)} to ${Math.floor(minPrice + 2 * step)}`,
          `${Math.floor(minPrice + 2 * step)} to ${Math.floor(minPrice + 3 * step)}`,
          `${Math.floor(minPrice + 3 * step)} to ${Math.ceil(maxPrice)}`,
        ];
        setPriceRanges(ranges);
      });
  }, []);

  // Handle filter change
  const handleFilterChange = (type, value) => {
    setSelectedFilters((prevFilters) => ({ ...prevFilters, [type]: value }));
    onFilterChange({ type, value });
  };

  // Reset filters function
  const resetFilters = () => {
    setSelectedFilters({
      brand: "All",
      price: "All",
      delivery: null,
    });
    onFilterChange({ type: "brand", value: "All" });
    onFilterChange({ type: "price", value: "All" });
    onFilterChange({ type: "delivery", value: null });
  };

  return (
    <div className="sidebar p-3">
      <h5>Filters</h5>

      <h6>Delivery Day</h6>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="delivery"
          id="delivery1"
          checked={selectedFilters.delivery === "2 Days"}
          onChange={() => handleFilterChange("delivery", "2 Days")}
        />
        <label className="form-check-label" htmlFor="delivery1">
          Get It in 2 Days
        </label>
      </div>

      <h6 className="mt-3">Customer Reviews</h6>
      <p className="text-warning">⭐⭐⭐⭐ & up</p>

      <h6 className="mt-3">Brands</h6>
      {brands.map((brand, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="brand"
            id={brand}
            value={brand}
            checked={selectedFilters.brand === brand}
            onChange={() => handleFilterChange("brand", brand)}
          />
          <label className="form-check-label" htmlFor={brand}>
            {brand}
          </label>
        </div>
      ))}

      <h6 className="mt-3">Price</h6>
      {priceRanges.map((range, index) => (
        <div key={index} className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="price"
            id={range}
            value={range}
            checked={selectedFilters.price === range}
            onChange={() => handleFilterChange("price", range)}
          />
          <label className="form-check-label" htmlFor={range}>
            {range}
          </label>
        </div>
      ))}

      {/* Reset Filters Button */}
      <button className="btn btn-warning mt-3 w-100" onClick={resetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

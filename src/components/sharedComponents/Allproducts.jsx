import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { addToCart } from "../../redux/cartSlice";
import { addToFav, removeFromFav } from "../../redux/favSlice";
import icon from "../../assets/Vector 5.png";
import Sidebar from "../Home/Side/SideBar";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: "All", price: "All" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favItems } = useSelector((state) => state.fav);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Fetch products from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data); // Default: show all products
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter products when filters change
  useEffect(() => {
    let filtered = products;

    if (filters.brand !== "All") {
      filtered = filtered.filter((product) => product.category === filters.brand);
    }

    if (filters.price !== "All") {
      const [min, max] = filters.price.split(" to ").map(Number);
      filtered = filtered.filter((product) => product.price >= min && product.price <= max);
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  // Handle filter change from Sidebar
  const handleFilterChange = (filter) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter.type]: filter.value,
    }));
  };

  // Add to Cart Logic
  const handleAddToCart = (product) => {
    const isItemInCart = cartItems.some((item) => item.id === product.id);
    if (isItemInCart) {
      toast.info("Item already in cart!", { autoClose: 2000 });
    } else {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success("Added to cart!", { autoClose: 2000 });
    }
  };

  // Toggle Wishlist Logic
  const handleToggleWishlist = (product) => {
    if (favItems.some((item) => item.id === product.id)) {
      dispatch(removeFromFav(product.id));
      toast.error("Removed from wishlist", { autoClose: 2000 });
    } else {
      dispatch(addToFav(product));
      toast.success("Added to wishlist", { autoClose: 2000 });
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer className="toast-container" position="top-center" autoClose={3000} />
      <div className="row">
        {/* Sidebar on the left */}
        <div className="col-lg-2 col-md-4">
          <Sidebar onFilterChange={handleFilterChange} />
        </div>

        {/* Products on the right */}
        <div className="col-lg-10 col-md-8">
          <div className="row">
            {filteredProducts.map((product) => {
              const isFav = favItems.some((item) => item.id === product.id);

              return (
                <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={product.id}>
                  <div className="card h-100 d-flex flex-column">
                    <img
                      src={product.image}
                      className="card-img-top p-3"
                      onClick={() => navigate(`/product/${product.id}`)}
                      alt={product.title}
                      style={{ cursor: "pointer", height: "200px", objectFit: "contain" }}
                    />
                    <div className="card-body d-flex flex-column flex-grow-1 text-start p-2">
                      <a className="card-title text-decoration-none hover-underline" href={`/product/${product.id}`}>
                        {product.title}
                      </a>
                      <p className="review text-primary">
                        ⭐⭐⭐⭐ <img src={icon} alt="icon" style={{ width: "15px" }} /> {product.rating.count}
                      </p>
                      <p className="text-secondary">300+ bought in past month</p>
                      <h5 className="price">
                        ₹{product.price}{" "}
                        <small className="text-muted">
                          <del>₹{(product.price * 1.2).toFixed(2)}</del>
                        </small>
                      </h5>
                      <p className="text-secondary">Save extra with No Cost EMI</p>
                      <p className="card-text">FREE delivery by <b>Sun, 15th Sept, 7:00 am - 9:00 pm</b></p>
                      
                      <div className="d-flex align-items-center justify-content-between mt-auto">
                        <button 
                          className="btn btn-warning w-50 mt-auto rounded-5" 
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to cart
                        </button>
                        <div onClick={() => handleToggleWishlist(product)} style={{ cursor: "pointer" }}>
                          {isFav ? <FaHeart className="text-danger fs-4" /> : <FaRegHeart className="text-danger fs-4" />}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="text-center mt-4">
                <h5>No products found</h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;

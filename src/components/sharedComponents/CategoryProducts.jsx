import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../redux/cartSlice";
import { addToFav, removeFromFav } from "../../redux/favSlice";
import Sidebar from "../Home/Side/SideBar";

function CategoryProducts() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        price: "All",
        delivery: null,
    });

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category") || "all";
    const dispatch = useDispatch();
    const { favItems } = useSelector((state) => state.fav);
    const cartItems = useSelector((state) => state.cart.cartItems);

    // Fetch products based on category
    useEffect(() => {
        let apiUrl = "https://fakestoreapi.com/products";
        if (category !== "all") {
            apiUrl = `https://fakestoreapi.com/products/category/${category}`;
        }

        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data); // Initially set filtered products as all products
            })
            .catch((err) => console.log(err));
    }, [category]);

    // Function to update filters
    const handleFilterChange = ({ type, value }) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: value,
        }));
    };

    // Apply Filters
    useEffect(() => {
        let filtered = [...products];

        // Filter by price
        if (filters.price !== "All") {
            const [min, max] = filters.price.split(" to ").map(Number);
            filtered = filtered.filter((product) => product.price >= min && product.price <= max);
        }

        // Filter by delivery (Assuming all products are eligible for 2-day delivery)
        if (filters.delivery) {
            filtered = filtered.filter((product) => product.price < 100); // Example condition for "Get It in 2 Days"
        }

        setFilteredProducts(filtered);
    }, [filters, products]);

    const handleAddToCart = (product) => {
        const isItemInCart = cartItems.some((item) => item.id === product.id);
        if (isItemInCart) {
            toast.info("Item already in cart!", { autoClose: 2000 });
        } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
            toast.success("Added to cart!", { autoClose: 2000 });
        }
    };

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
            <h2 className="mb-4 text-capitalize">{category} Products</h2>

            <div className="row">
                {/* Sidebar on the Left */}
                <div className="col-md-2">
                    <Sidebar onFilterChange={handleFilterChange} />
                </div>

                {/* Products on the Right */}
                <div className="col-md-10">
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
                                            <h6 className="card-title">{product.title}</h6>
                                            <p className="review text-primary">
                                                ⭐⭐⭐⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                                            </p>
                                            <p className="text-secondary">300+ bought in past month</p>
                                            <h5 className="price">
                                                ₹{product.price}{" "}
                                                <small className="text-muted">
                                                    <del>₹{(product.price * 1.2).toFixed(2)}</del>
                                                </small>
                                            </h5>
                                            <p className="text-secondary">Save extra with No Cost EMI</p>
                                            <p className="card-text">
                                                FREE delivery by <b>Sun, 15th Sept, 7:00 am - 9:00 pm</b>
                                            </p>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryProducts;

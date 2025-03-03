import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToCart } from "../../redux/cartSlice";
import { addToFav } from "../../redux/favSlice";
import CustomerReviews from "./CustomerReviews";
import {
  FaStar,
  FaTag,
  FaShieldAlt,
  FaShoppingCart,
  FaTruck,
  FaExclamationTriangle,
  FaCreditCard,
  FaBolt,
} from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa";

import card from "../../images/card.svg";
import Card1 from "../../images/30.svg";
import card2 from "../../images/1.svg";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError("Failed to load product. Please try again.");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }));
      setQuantity(1);
      toast.success(`${quantity} item(s) added to cart! `, { autoClose: 2000 });
    }
  };

  const handleAddToFavorites = () => {
    if (product) {
      dispatch(addToFav(product));
      toast.success(`${product.title} added to favorites `, {
        autoClose: 2000,
      });
    }
  };

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5 text-danger">{error}</h2>;
  if (!product)
    return <h2 className="text-center mt-5 text-danger">Product not found!</h2>;

  return (
    <div className="container my-4">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="row">
        {/* Left Section - Product Images & Thumbnails */}
        <div className="col-md-4">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a
                  href={`/categoryproducts?category=${encodeURIComponent(
                    product.category
                  )}`}
                >
                  {product.category}
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title.split(" ")[0]}
              </li>
            </ol>
          </nav>
          <div className="d-flex">
            <img
              src={product.image}
              alt={product.title}
              className="img-fluid w-100"
            />
          </div>
        </div>

        {/* Center Section - Product Details */}
        <div className="col-md-5">
          <p className="fw-bold " style={{ color: "#1F8394" }}>
            <FaTag className="me-1 " /> Brand: <a>{product.category}</a>
          </p>
          <h2 className="fw-bold">{product.title}</h2>

          <div className="d-flex align-items-center mb-2">
            4.1
            <span className="text-warning fs-5">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar className="text-secondary" />
            </span>
            <span className="ms-2" style={{ color: "#1F8394" }}>
              | <a>67 ratings</a> | <a>Search this page</a>
            </span>
          </div>

          <hr></hr>
          <h4 className="text-dark">SAR {product.price.toFixed(2)}</h4>
          <p className="text-muted">All prices include VAT.</p>

          <div className="p-2">
            <p className="text-muted">
              Sign in to redeem.{" "}
              <span style={{background: "#71ED58"}} className="bg-lime-400 text-dark font-bold px-2 py-1 rounded">
                Extra 20%
              </span>{" "}
              off with MEEM credit cards.
            </p>
            <p>
              Enter code <strong>MEEM20</strong> at checkout. Discount by
              Amazon.
            </p>
          </div>

          <ul
            className="list-unstyled"
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <li>
              <img src={card} /> <br /> Electronic Payment Only
            </li>
            <li>
              <img src={card2} />
              <br /> 30 Days Return
            </li>
            <li>
              <img src={Card1} />
              <br />
              Secure Transaction
            </li>
          </ul>

          <hr></hr>
          <h3>About this item</h3>
          <ul>
            {product.description.split(". ").map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Right Section - Purchase Card */}
        <div className="col-md-3">
          <div className="card p-3 border">
            <h4 className="text-start text-dark">
              SAR {product.price.toFixed(2)}
            </h4>
            <p className="text-muted">
              <FaTruck className="text-primary me-1" /> SAR 96 delivery{" "}
              <strong>6-9 October</strong>
            </p>
            <p className="text-danger">
              <FaExclamationTriangle className="me-1" /> Usually ships within 4
              to 5 days
            </p>

            <label htmlFor="quantity">Quantity:</label>
            <select
              className="form-select mb-3"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>

            <button
              style={{ background: "#FFD814" }}
              className="btn rounded-pill w-100 mb-2 fw-bold d-flex align-items-center justify-content-center"
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-2" /> Add to Cart
            </button>
            <button
              style={{ background: "#FFA41C" }}
              className="btn rounded-pill w-100 mb-2 fw-bold d-flex align-items-center justify-content-center"
            >
              <FaBolt className="me-2" /> Buy Now
            </button>

            <p>
              <strong className="text-muted">Ships from:</strong> Monatik LLC
            </p>
            <p style={{ color: "#1F8394" }}>
              <strong className="text-muted">Sold by:</strong> Monatik LLC
            </p>
            <p style={{ color: "#1F8394" }}>
              <strong className="text-muted">Payment:</strong> Secure transaction
            </p>
            <hr></hr>
            <button
              className="btn btn-outline-secondary w-100"
              onClick={handleAddToFavorites}
            >
              Add to List
            </button>
          </div>
        </div>
      </div>
      <hr />
      <CustomerReviews />
    </div>
  );
};

export default SingleProduct;

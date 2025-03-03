import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/AmazonLogo.svg";
import { BiCart } from "react-icons/bi";
import { CiLocationOn, CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const TopNavbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const { favItems } = useSelector((state) => state.fav);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (searchQuery.trim()) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filtered);
        })
        .catch((error) => console.error("Error fetching products:", error));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      {/* Logo */}
      <a className="navbar-brand d-flex align-items-center" href="/">
        <img src={logo} alt="Amazon Logo" width="100" />
      </a>

      {/* Location */}
      <div
        className="navbar-text ms-2 d-none d-lg-block"
        style={{ color: "#C0CCCC" }}
      >
        Delivering to Surat 394210 <br />
        <a href="#" className="text-white fw-bold text-decoration-none">
          <CiLocationOn size={20} /> Update location
        </a>
      </div>

      {/* Search Bar */}
      <form
        className="d-flex flex-grow-1 mx-3 position-relative"
        style={{ maxWidth: "800px" }}
      >
        <select className="form-select w-auto rounded-end-0 bg-body-secondary">
          <option>All</option>
        </select>
        <input
          className="form-control rounded-0 p-3"
          type="search"
          placeholder="Search Amazon.in"
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn btn-warning rounded-start-0">
          <CiSearch size={30} />
        </button>
      </form>

      {/* Right Side Elements */}
      <div className="d-flex align-items-center ms-auto">
        {/* Language Dropdown */}
        <div className="dropdown me-3">
          <button
            className="btn text-white dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            EN
          </button>
          <ul className="dropdown-menu">
            <li className="dropdown-item">English</li>
            <li className="dropdown-item">Arabic</li>
          </ul>
        </div>
        {/* Account Section */}
        <div className="text-white me-3 d-none d-lg-block">
          <SignedOut>
            <button
              className="btn text-white bg-dark fw-bold text-decoration-none"
              onClick={() => (window.location.href = "/login")}
            >
              Sign In
            </button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Orders Section */}
        <div className="text-white me-3 d-none d-lg-block">
          Returns <br />
          <a href="#" className="text-white fw-bold text-decoration-none">
            & Orders
          </a>
        </div>

        {/* Wishlist */}
        <a href="/wishlist" className="position-relative me-4">
          <FaRegHeart className="text-white" size={30} />
          {favItems?.length > 0 && (
            <span
              className="position-absolute bg-danger text-white rounded-3"
              style={{
                fontSize: "10px",
                top: "-6px",
                right: "-8px",
                padding: "2px 5px",
              }}
            >
              {favItems.length}
            </span>
          )}
        </a>

        {/* Cart */}
        <a className="nav-link text-white position-relative me-3" href="/cart">
          <BiCart size={40} /> Cart
          {cartItems?.length > 0 && (
            <span
              className="position-absolute bg-danger text-white rounded-3"
              style={{
                fontSize: "10px",
                top: "0px",
                right: "32px",
                padding: "2px 5px",
              }}
            >
              {cartItems.length}
            </span>
          )}
        </a>
      </div>
    </nav>
  );
};

export default TopNavbar;

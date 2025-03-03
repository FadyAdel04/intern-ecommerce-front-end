import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icon from "../../assets/Vector 5.png";
import { CgClose } from 'react-icons/cg';
import { removeFromFav } from '../../redux/favSlice';
import { toast, ToastContainer } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import '../../App.css';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
    const { favItems } = useSelector((state) => state.fav);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product) => {
        const isItemInCart = cartItems.some((item) => item.id === product.id); 

        if (isItemInCart) {
            toast.info("Item already in cart!", { autoClose: 2000 });
        } else {
            dispatch(addToCart({ ...product, quantity: 1 }));
            toast.success("Added to cart! ", { autoClose: 2000 });
        }
    };

    const handleRemoveFromFav = (productId) => {
        dispatch(removeFromFav(productId));
        toast.error(`Removed from wishlist `, { autoClose: 2000 });
    };

    return (
        <div className="container my-4 min-vh-60">
            <ToastContainer position="top-center" autoClose={2000} />
            
            {favItems.length === 0 ? (
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
                    <h1 className="my-5">Your Wishlist is Empty </h1>
                    <a href="/" className="mt-4 btn btn-primary">Shop Now</a>
                </div>
            ) : (
                <>
                    <h1 className='mb-4'>My Wishlist ❤</h1>
                    <div className="row">
                        {favItems.map((item) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={item.id}>
                                <div className="card h-100 d-flex flex-column position-relative p-2">
                                    <CgClose 
                                        onClick={() => handleRemoveFromFav(item.id)} 
                                        style={{ cursor: "pointer" }} 
                                        className='position-absolute top-0 end-0 m-2' 
                                    />
                                    <img
                                        src={item.image}
                                        className="card-img-top p-3"
                                        alt={item.title}
                                        onClick={() => navigate(`/product/${item.id}`)}
                                        style={{ cursor: "pointer", height: "200px", objectFit: "contain" }}
                                    />
                                    <div className="card-body d-flex flex-column flex-grow-1 text-start p-2">
                                        <a 
                                            className="card-title text-decoration-none hover-underline" 
                                            style={{ cursor: "pointer" }} 
                                            href={`/product/${item.id}`}
                                        >
                                            {item.title}
                                        </a>
                                        <p className="review text-primary">
                                            ⭐⭐⭐⭐{" "}
                                            <img src={icon} alt="icon" style={{ width: "15px" }} />{" "}
                                            {item.rating?.count}
                                        </p>
                                        <p className="text-secondary">300+ bought in past month</p>
                                        <h5 className="price">
                                            ₹{item.price}{" "}
                                            <small className="text-muted">
                                                <del>₹{(item.price * 1.2).toFixed(2)}</del>
                                            </small>
                                        </h5>
                                        <p className="text-secondary">Save extra with No Cost EMI</p>
                                        <p className="card-text">
                                            FREE delivery by <b>Sun, 15th Sept, 7:00 am - 9:00 pm</b>
                                        </p>
                                        <div className='d-flex justify-content-between align-items-center mt-auto'>
                                            <button className="btn btn-warning w-50 mt-auto rounded-5" 
                                                onClick={() => handleAddToCart(item)}>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Wishlist;

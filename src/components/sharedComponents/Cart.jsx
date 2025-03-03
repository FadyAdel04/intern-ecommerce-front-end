import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../../redux/cartSlice"; // Ensure correct import
import emptyCart from "../../images/emtyCart.png";

const Cart = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="container my-4 min-vh-60">
      {cartItems.length === 0 ? (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "100vh" }}>
          <img src={emptyCart} alt="empty cart" className="img-fluid" />
          <a href="/" className="mt-4 btn btn-primary">Shop Now</a>
          <h1 className="my-5">Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-xl-8">
            <div className="card shadow-sm">
              <div className="card-header bg-dark text-white text-center fs-4">
                Your Cart ({cartItems.length} Items)
              </div>
              <div className="card-body">
              {cartItems.map((item, index) => (
  <div 
    key={item.id} 
    className="py-4 d-md-flex align-items-center"
    style={{ borderBottom: index !== cartItems.length - 1 ? "1px solid #ddd" : "none" }}
  >
                    <a href={`/product/${item.id}`}>
                      <img src={item.image} alt={item.title} width={180} height={180} className="img-fluid" />
                    </a>
                    <div className="ms-md-4 flex-grow-1">
                      <h5 className="fw-bold">{item.title}</h5>
                      <p className="mb-1">Category: {item.category}</p>
                      <p className="fw-bold text-black fs-5">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p>Quantity: {item.quantity}</p>
                      <div className="mt-2 d-flex justify-content-between ">
                       <div className="d-flex gap-3">
                       <button
                          className="btn btn-secondary text-center "
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-secondary text-center "
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                        >
                          -
                        </button>
                       </div>
                        <button className="btn btn-danger" onClick={() => dispatch(removeFromCart(item.id))} type="button">
                          Remove Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-xl-4">
            <div className="card text-white sticky-top" style={{ top: "25vh", zIndex: 1 }}>
              <div className="card-body">
                <h3 className="text-center fw-bold mb-4 text-dark">Summary</h3>
                <hr className="border-dark" />
                <div className="d-flex justify-content-between fs-5 fw-bold mb-4 text-black">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                  </div>
                <button
                  className="btn btn-light w-100 bg-dark text-white"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

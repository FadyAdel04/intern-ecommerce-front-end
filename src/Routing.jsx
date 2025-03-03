import { Route, Routes } from "react-router-dom";
import AllProducts from './components/sharedComponents/Allproducts';
import CategoryProducts from './components/sharedComponents/CategoryProducts'
import SingleProduct from './components/sharedComponents/SingleProduct';
import Home from "./components/Home/Home";
import Cart from "./components/sharedComponents/Cart";
import Wishlist from "./components/sharedComponents/wishlist";
import Login from "./components/sharedComponents/Login";
import Register from "./components/sharedComponents/Register";
import ProtectedRoute from "./components/ProtectedRoute";


export const Routing = () => {
	return (
		<Routes>
			<Route path="/login" element={ <Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/" element={<Home />} />
			<Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      		<Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
			<Route path="/allproducts" element={<><AllProducts/></>} />
			<Route path="/product/:id" element={<SingleProduct />} />
			<Route path="/CategoryProducts" element={<><CategoryProducts/></>} />
			<Route path="/about" element={<h1>About</h1>} />
			<Route path="/contact" element={<h1>Contact</h1>} />
			<Route path="*" element={<h1>Error Page</h1>} />
		</Routes>
	);
};

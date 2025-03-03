import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./Routing";
import SubNavbar from "./components/sharedComponents/SubNavbar";
import TopNavbar from "./components/sharedComponents/TopNavbar";
import Footer from "./components/sharedComponents/Footer";
import Card1 from "./components/Home/Card/Card1";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />
      <TopNavbar />
      <SubNavbar />
      <Routing />
      <Footer />
    </BrowserRouter>
  );
}

export default App;

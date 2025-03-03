import { SignUp } from "@clerk/clerk-react";
import logo from "../../images/Vector.svg";
import polygon from "../../images/Polygon-black.png";
import line from "../../images/line.svg";

function Register() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 px-3 bg-light">
      <div className="text-center w-100">
        <h2 className="text-black fw-bold">Amazon<span className="fs-6">.in</span></h2>
        <img src={logo} className="d-block mx-auto mt-0 mb-4" alt="logo" style={{ maxWidth: "100px" }} />
        
        <div className="card mx-auto p-4 shadow-sm border-0" style={{ maxWidth: "450px", backgroundColor: "#fff" }}>
          
          {/* Clerk Sign Up Component */}
          <SignUp path="/register" routing="path" />

          <div className="text-start mt-3">
            <h6 className="text-black">By creating an account, you agree to Amazon’s <a href="#" className="text-warning">Conditions of Use</a></h6>
            <h6 className="mb-3 text-black">and <a href="#" className="text-warning">Privacy Notice</a></h6>
            <a href="#" className="text-decoration-none text-black">
              <img src={polygon} alt="" className="me-1" style={{ width: "12px" }} /> Need Help?
            </a>
          </div>
        </div>

        <div className="d-flex align-items-center text-secondary my-3 mx-auto w-100" style={{ maxWidth: "450px" }}>
          <div className="flex-grow-1 border-bottom border-secondary"></div>
          <span className="mx-2 text-black">Already have an account?</span>
          <div className="flex-grow-1 border-bottom border-secondary"></div>
        </div>

        <button 
          onClick={() => window.location.href = "/login"} 
          className="btn w-100 text-black fw-bold border-0" 
          style={{ maxWidth: "450px", backgroundColor: "#FFD814" }}
        >
          Sign in
        </button>

        <img src={line} className="d-block mx-auto mt-4 mb-4" alt="line" style={{ maxWidth: "100%", height: "auto" }} />

        <div className="links mb-3">
          <a className="me-3 text-decoration-none text-black" href="#">Conditions of Use</a>
          <a className="me-3 text-decoration-none text-black" href="#">Privacy Notice</a>
          <a className="text-decoration-none text-black" href="#">Help</a>
        </div>
        
        <p className="text-muted">© 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  );
}

export default Register;
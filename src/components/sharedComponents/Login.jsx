import { SignIn } from "@clerk/clerk-react";
import logo from "../../images/Vector.svg";
import polygon from "../../images/Polygon-black.png";
import line from "../../images/line.svg";

function Login() {
  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
      <div className="text-center w-100">
        <h2 className="fw-bold text-black">Amazon<span className="fs-6">.in</span></h2>
        <img src={logo} className="d-block mx-auto mt-0 mb-3" alt="logo" style={{ maxWidth: "100px" }} />

        <div className="card mx-auto p-4 w-100 shadow-sm border-0" style={{ maxWidth: "450px", borderRadius: "8px" }}>
          
          {/* Clerk Sign In Component */}
          <div className="d-flex justify-content-center">
            <SignIn path="/login" routing="path" />
          </div>

          <div className="text-start mt-3 text-black">
            <p className="mb-1" style={{ fontSize: "14px" }}>
              By continuing, you agree to Amazon’s <a href="#" className="text-primary">Conditions of Use</a>
            </p>
            <p style={{ fontSize: "14px" }}>
              and <a href="#" className="text-primary">Privacy Notice</a>
            </p>
            <a href="#" className="text-decoration-none text-primary">
              <img src={polygon} alt="" className="me-1" style={{ width: "12px" }} /> Need Help?
            </a>
          </div>
        </div>

        <div className="d-flex align-items-center text-secondary my-3 mx-auto w-100" style={{ maxWidth: "400px" }}>
          <div className="flex-grow-1 border-bottom"></div>
          <span className="mx-2 text-black">New to Amazon?</span>
          <div className="flex-grow-1 border-bottom"></div>
        </div>

        <button 
          onClick={() => window.location.href = "/register"} 
          className="btn w-100" 
          style={{ maxWidth: "400px", backgroundColor: "#f0c14b", borderColor: "#a88734", color: "black" }}>
          Create Your Amazon Account
        </button>

        <img src={line} className="d-block mx-auto mt-4 mb-3" alt="line" style={{ maxWidth: "100%", height: "auto" }} />

        <div className="links mb-3">
          <a className="me-3 text-decoration-none text-dark" href="#">Conditions of Use</a>
          <a className="me-3 text-decoration-none text-dark" href="#">Privacy Notice</a>
          <a className="text-decoration-none text-dark" href="#">Help</a>
        </div>

        <p className="text-muted" style={{ fontSize: "12px" }}>
          © 1996-2024, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </div>
  );
}

export default Login;
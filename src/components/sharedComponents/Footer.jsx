import { Dcontact, Dhelp, Dknows, DMakeMoney } from "./Dfooter";
import logo from "../../assets/AmazonLogo.svg";
import DeepFooter from "../sharedComponents/DeepFooter";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="BTNfooter">
        <button className="btnFooter" onClick={scrollToTop}>
          Back to Top
        </button>
      </div>

      <footer>
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between gap-4 ">
            <div className="footer-section">
              <h3 className="text-light">Get to know Us</h3>
              <ul className="FooterText">
                {Dknows.map((e, i) => (
                  <li key={i} className="text-light">
                    <span>{e.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-light">Connect with Us</h3>
              <ul className="FooterText">
                {Dcontact.map((e, i) => (
                  <li key={i} className="text-light">
                    <span>{e.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-light">Make Money with Us</h3>
              <ul className="FooterText">
                {DMakeMoney.map((e, i) => (
                  <li key={i} className="text-light">
                    <span>{e.title}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-section">
              <h3 className="text-light">Let Us Help You</h3>
              <ul className="FooterText">
                {Dhelp.map((e, i) => (
                  <li key={i} className="text-light">
                    <span>{e.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="inputsFooter d-flex justify-content-center align-items-center mt-5">
          <div className="img mx-3">
            <img src={logo} alt="logo" />
          </div>
          <div className="inputsFooter d-flex align-items-center">
            <div className="d-flex align-items-center border border-secondary px-3 py-2 rounded bg-transparent text-white">
              <select className="form-select bg-transparent text-white border-0 me-3">
                <option className="text-dark">English</option>
                <option className="text-dark">French</option>
                <option className="text-dark">Spanish</option>
              </select>
            </div>
            <div className="d-flex align-items-center border border-secondary px-3 py-2 rounded bg-transparent text-white">
              <select className="form-select bg-transparent text-white border-0 me-3">
                <option className="text-dark">
                  {" "}
                  <span>
                    <img src="/src/assets/India.svg" alt="india" />
                  </span>
                  India
                </option>
                <option className="text-dark">Egypt</option>
                <option className="text-dark">USA</option>
              </select>
            </div>
          </div>
        </div>
        <DeepFooter />
      </footer>
    </>
  );
};

export default Footer;

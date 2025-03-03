
import { DdeepFooter } from "./Dfooter";

const DeepFooter = () => {
  return (
    <>
    <div className="deepFooter mt-5">
    <div className="container ">
        <div className="row ">
          {DdeepFooter.map((e, i) => {
            return (
              <>
                <div className="col-md-3 mt-5" key={i}>
                  <h3>{e.title}</h3>
                  <p>{e.url}</p>
                </div>
              </>
            );
          })}
        </div>
        <footer className="feramFooter">
  <div className="container text-center">
    <div className="row">
      <div className="col-md-12">
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#" className="text-white">Conditions of Use & Sale</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#" className="text-white">Privacy Notice</a></li>
          <li className="list-inline-item">|</li>
          <li className="list-inline-item"><a href="#" className="text-white">Interest-Based Ads</a></li>
        </ul>
        <p className="mb-0">&copy; 1996-2024, Amazon.com, Inc. or its affiliates</p>
      </div>
    </div>
  </div>
</footer>
  
      </div>
    </div>
   
    </>
  );
};

export default DeepFooter;

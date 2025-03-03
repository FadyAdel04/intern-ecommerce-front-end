import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockReviews = [
      {
        reviewer: "Brooke",
        profileImage: "https://i.pravatar.cc/40?img=1",
        rating: 4,
        title: "Favorite dress",
        date: "2024-08-06",
        verified: true,
        comment:
          "I initially purchased this dress on sale. It turned out to be my favorite dress this summer! It's extremely versatile and unexpectedly flattering.",
      },
      {
        reviewer: "Elva S. D.",
        profileImage: "https://i.pravatar.cc/40?img=2",
        rating: 5,
        title: "Lindo!!",
        date: "2023-08-11",
        verified: true,
        comment: "Bien hecho, bonita tela y bonita caída, fresco y casual.",
      },
      {
        reviewer: "Ana Patricia Rodriguez",
        profileImage: "https://i.pravatar.cc/40?img=3",
        rating: 4,
        title: "COMODIDAD",
        date: "2023-06-29",
        verified: true,
        comment: "Es lindo, cómodo y ligero para clima cálido. Es la tela adecuada.",
      },
      {
        reviewer: "Ivelisse",
        profileImage: "https://i.pravatar.cc/40?img=4",
        rating: 5,
        title: "Excellent dress",
        date: "2019-04-03",
        verified: true,
        comment:
          "Lovely dress... I'm 5'1 with a pear-shaped body (149 lbs mostly in hips and booty) and it fits perfect.",
      },
    ];

    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <h2 className="text-center mt-5">Loading Reviews...</h2>;
  }

  return (
    <div className="container mt-5 p-4 ">
      <div className="row gap-5 d-flex ">
        <div className="col-lg-4">
          <h2 className="fw-bold">Customer Reviews</h2>
          <div className="d-flex align-items-center mt-2">
            <span className="text-warning fs-4">★★★★☆</span>
            <span className="ms-2 text-secondary fs-5">4.1 out of 5</span>
          </div>
          <div className="mt-3">
            <h5 className="fw-semibold">1 global rating</h5>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="d-flex align-items-center my-1">
                <span className="me-2">{star} star</span>
                <div className="progress flex-grow-1" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${star === 4 ? 71 : star === 2 ? 6 : 0}%` }}
                  ></div>
                </div>
                <span className="ms-2 text-secondary">
                  {star === 4 ? 71 : star === 2 ? 6 : 0}%
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-6">
          <div >
            {reviews.map((review, index) => (
              <div key={index} className={`pb-3 mb-3 ${index !== reviews.length - 1 ? "border-bottom" : ""}`}>
                <div className="d-flex align-items-center">
                  <img
                    src={review.profileImage}
                    alt={review.reviewer}
                    className="rounded-circle me-3"
                    width="40"
                    height="40"
                  />
                  <h5 className="mb-0">{review.reviewer}</h5>
                </div>
                <div className="text-warning mt-1">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</div>
                <h6 className="fw-bold mt-1">{review.title}</h6>
                <p className="text-muted mb-1">Reviewed on {new Date(review.date).toLocaleDateString()}</p>
                {review.verified && <p className="text-success fw-semibold">Verified Purchase</p>}
                <p>{review.comment}</p>
                <button className="btn btn-link p-0 text-primary">Report</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;

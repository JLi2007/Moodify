import ReviewBox from "./ReviewBox.jsx";
import { useState } from "react";
import "../Home.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { boxes } from "./Box.ts";

const ReviewsList = () => {
  const reviews = [];
  boxes.forEach((element) => {
    reviews.push(
      <ReviewBox
        name={element.name}
        contact={element.contact}
        description={element.description}
        key={`${element.name}123`}
      />
    );
  });

  const [visibleReviews, setVisibleReviews] = useState(3);

  const showMoreReviews = () => {
    if (visibleReviews === 9) {
      setVisibleReviews(visibleReviews + 1);
    } else {
      setVisibleReviews(visibleReviews + 3);
    }
  };

  return (
    <div className="col" id="reviews-container">
      <div className="row justify-content-md-center" id="reviews-title">
        What our Customers are Saying
        <br />
        &darr;
      </div>
      <div className="row justify-content-md-center">
        {reviews.slice(0, visibleReviews).map((review) => review)}
      </div>
      <div className="row justify-content-md-center" id="button-div">
        <div className="col-md-auto text-center">
          <button onClick={showMoreReviews} id="show-more-button">
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewsList;

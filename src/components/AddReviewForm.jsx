import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function AddReviewForm({ property_id, onReviewAdded }) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const user = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const reviewData = {
      guest_id: user.user_id,
      rating: newReview.rating,
      comment: newReview.comment,
    };

    console.log(reviewData);

    fetch(
      `https://be-airbnc.onrender.com/api/properties/${property_id}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        onReviewAdded(data);
        setNewReview({ rating: 0, comment: "" });
      });
  };

  return (
    <div className="review-form">
      <h3>➕ Review</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="review-label">Rating: </label>
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: parseInt(e.target.value) })
            }
          >
            <option value="0">Select a rating...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div>
          <label className="review-label">Comment: </label>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

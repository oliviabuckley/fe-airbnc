import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function AddReviewForm({ property_id, onReviewAdded }) {
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
  });
  const { user } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (newReview.rating === 0) {
      setErrorMessage("Please select a rating.");
      return;
    }
    if (newReview.comment.trim() === "") {
      setErrorMessage("Please enter a comment.");
      return;
    }

    const reviewData = {
      guest_id: user.user_id,
      rating: newReview.rating,
      comment: newReview.comment,
    };

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
      .then((res) => {
        if (!res.ok) {
          if (res.status === 400) {
            setErrorMessage("You have already reviewed this property.");
          }
          return res.json();
        }
      })
      .then((data) => {
        onReviewAdded(data);
        setNewReview({ rating: 0, comment: "" });
      });
  };

  return (
    <div className="review-form">
      <h3>➕ Review</h3>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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

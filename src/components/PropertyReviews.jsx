import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import AddReviewForm from "./AddReviewForm";
import { UserContext } from "../contexts/UserContext";

export default function PropertyReviews() {
  const { property_id } = useParams();
  const [propertyReviews, setPropertyReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  if (!user) {
    return <p>Loading user data...</p>;
  }
  console.log(user.first_name);
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://be-airbnc.onrender.com/api/properties/${property_id}/reviews`
    )
      .then((res) => res.json())
      .then((data) => {
        setPropertyReviews(data.propertyReviews || []);
        setAverageRating(data.average_rating || 0);
        setLoading(false);
      });
  }, [property_id]);

  const handleNewReview = (newReview) => {
    const updatedReview = {
      ...newReview,
      guest: `${user.first_name} ${user.surname}`,
    };

    fetch(
      `https://be-airbnc.onrender.com/api/properties/${property_id}/reviews`
    )
      .then((res) => res.json())
      .then((data) => {
        setPropertyReviews(data.propertyReviews || []);
        setAverageRating(data.average_rating || 0);
      });
  };

  const handleDeleteReview = (review_id) => {
    console.log("Deleting review with ID:", review_id);
    fetch(`https://be-airbnc.onrender.com/api/reviews/${review_id}`, {
      method: "DELETE",
    }).then(() => {
      setPropertyReviews(
        propertyReviews.filter((review) => review.review_id !== review_id)
      );
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="property-reviews-container">
      <p>
        <strong>
          Reviews ({propertyReviews.length}) 🌟 {averageRating}
        </strong>
      </p>
      {propertyReviews.length > 0 ? (
        propertyReviews.map((propertyReview) => (
          <div key={propertyReview.review_id} className="review-card">
            <p>🌟 {propertyReview.rating}</p>
            <p>
              <img
                src={propertyReview.guest_avatar}
                alt={`${propertyReview.guest}'s avatar`}
                className="guest-avatar"
              />
              {propertyReview.guest}
            </p>
            <p>📝 {propertyReview.comment}</p>
            {propertyReview.guest === `${user.first_name} ${user.surname}` && (
              <button
                onClick={() => handleDeleteReview(propertyReview.review_id)}
              >
                🗑️ Delete
              </button>
            )}
          </div>
        ))
      ) : (
        <p>
          <em>No reviews yet. Be the first to leave one!</em>
        </p>
      )}

      <AddReviewForm
        property_id={property_id}
        onReviewAdded={handleNewReview}
      />
    </div>
  );
}

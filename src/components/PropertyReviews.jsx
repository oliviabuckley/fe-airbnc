import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function PropertyReviews() {
  const { property_id } = useParams();
  const [propertyReviews, setPropertyReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://be-airbnc.onrender.com/api/properties/${property_id}/reviews`
    )
      .then((res) => res.json())
      .then((data) => {
        setPropertyReviews(data.propertyReviews || []);
        setLoading(false);
      });
  }, [property_id]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://be-airbnc.onrender.com/api/properties/${property_id}/reviews`
    )
      .then((res) => res.json())
      .then((data) => {
        setAverageRating(data.average_rating || []);
        setLoading(false);
      });
  }, [property_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (propertyReviews.length === 0) {
    return (
      <p>
        <em>No reviews yet.</em>
      </p>
    );
  }

  return (
    <div className="property-reviews-container">
      <p>
        <strong>Reviews:</strong>
      </p>
      <div>Average rating: 🌟 {averageRating}</div>
      {propertyReviews.map((propertyReview) => (
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
        </div>
      ))}
    </div>
  );
}

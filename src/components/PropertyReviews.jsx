import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function PropertyReviews() {
  const { property_id } = useParams();
  const [propertyReviews, setPropertyReviews] = useState([]);
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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (propertyReviews.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="property-reviews-container">
      {propertyReviews.map((propertyReview) => (
        <div key={propertyReview.review_id} className="review-card">
          <p>⭐ {propertyReview.rating}</p>
          <p>👤 {propertyReview.guest}</p>
          <p>📝 {propertyReview.comment}</p>
        </div>
      ))}
    </div>
  );
}

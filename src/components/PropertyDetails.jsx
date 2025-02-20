import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PropertyReviews from "./PropertyReviews";

export default function PropertyDetails() {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://be-airbnc.onrender.com/api/properties/${property_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data.property);
        setLoading(false);
      });
  }, [property_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="property-details-container">
      <h2>🏡</h2>
      <h3 className="property-title">{property.property_name}</h3>
      <p>📍 {property.location}</p>
      <p>💜 {property.favourites} Favourites</p>
      <p>💰 £{property.price_per_night} per night</p>
      <p>
        <strong>Description:</strong>
      </p>
      <p>{property.description}</p>
      <PropertyReviews />
    </div>
  );
}

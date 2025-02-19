import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function PropertyDetails() {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetch(`https://be-airbnc.onrender.com/api/properties/${property_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data.property);
      });
  }, [property_id]);

  if (!property) {
    return <p>Loading...</p>;
  }

  return (
    <div className="property-details-container">
      <h2>{property.property_name} 🏡</h2>
      <p>📍 {property.location}</p>
      <p>💜 {property.favourites} Favourites</p>
      <p>💰 £{property.price_per_night} per night</p>
      <p>{property.description}</p>
    </div>
  );
}

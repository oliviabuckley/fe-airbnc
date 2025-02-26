import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import PropertyReviews from "./PropertyReviews";
import AddToFavouritesButton from "./AddToFavourites";
import { UserContext } from "../contexts/UserContext";

export default function PropertyDetails() {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

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

  if (!user) {
    return <p>You need to be logged in to view this property.</p>;
  }

  return (
    <div className="property-details-container">
      <div className="add-to-favourites-container">
        <AddToFavouritesButton
          user_id={user.user_id}
          property_id={property_id}
        />
      </div>
      <h2>🏡</h2>
      <h3 className="property-title">{property.property_name}</h3>
      <p>📍 {property.location}</p>
      <p>💜 {property.favourites} Favourites</p>
      <p>💰 £{property.price_per_night} per night</p>
      <img
        src={property.host_avatar}
        alt={`${property.host}'s avatar`}
        className="guest-avatar"
      />
      <p>Hosted by {property.host}</p>
      <p>
        <strong>Description:</strong>
      </p>
      <p>{property.description}</p>

      <PropertyReviews />
    </div>
  );
}

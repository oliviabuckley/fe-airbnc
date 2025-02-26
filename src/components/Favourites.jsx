import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://be-airbnc.onrender.com/api/users/${user.user_id}/favourites`)
      .then((res) => res.json())
      .then((data) => {
        setFavourites(data);
        setLoading(false);
      });
  }, [user.user_id]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="properties-grid">
        {favourites.map((favourite) => (
          <Link
            to={`/properties/${favourite.property_id}`}
            key={favourite.property_id}
            className="property-card-link"
          >
            <div className="property-card" key={favourite.property_id}>
              <p>{favourite.favourites}💜</p>
              <h2>🏡</h2>
              <h3>📍 {favourite.location}</h3>
              <h4>{favourite.name}</h4>
              <h4>💰 £{favourite.price_per_night} per night</h4>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

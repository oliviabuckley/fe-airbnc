import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (user && user.user_id) {
      setLoading(true);
      fetch(
        `https://be-airbnc.onrender.com/api/users/${user.user_id}/favourites`
      )
        .then((res) => res.json())
        .then((data) => {
          setFavourites(data);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDeleteFavourite = (e, favouriteId) => {
    e.stopPropagation();
    fetch(`https://be-airbnc.onrender.com/api/favourites/${favouriteId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 204) {
          setFavourites(
            favourites.filter(
              (favourite) => favourite.favourite_id !== favouriteId
            )
          );
        } else {
          setErrorMessage("Failed to delete the favourite");
        }
      })
      .catch((error) => setErrorMessage("Failed to delete the favourite"));
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <p className="my-favourites">My Favourites</p>
      <div className="properties-grid">
        {favourites.map((favourite) => (
          <div key={favourite.property_id}>
            <Link
              to={`/properties/${favourite.property_id}`}
              className="property-card-link"
            >
              <div className="property-card">
                <p>{favourite.favourites}💜</p>
                <h2>🏡</h2>
                <h3>📍 {favourite.location}</h3>
                <h4>{favourite.name}</h4>
                <h4>💰 £{favourite.price_per_night} per night</h4>
              </div>
            </Link>
            <button
              className="delete-button"
              onClick={(e) => handleDeleteFavourite(e, favourite.favourite_id)}
            >
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}

import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router";

export default function HostProperties() {
  const [properties, setProperties] = useState([]);
  const [stats, setStats] = useState({
    numProperties: 0,
    avgRating: 0,
    totalFavourites: 0,
  });
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (user && user.user_id) {
      setLoading(true);
      fetch(
        `https://be-airbnc.onrender.com/api/properties?host=${user.user_id}`
      )
        .then((res) => res.json())
        .then((data) => {
          const fetchedProperties = data.properties;
          setProperties(fetchedProperties);
          setLoading(false);
          const numProperties = fetchedProperties.length;
          const totalFavourites = fetchedProperties.reduce(
            (sum, property) => sum + property.favourites,
            0
          );

          setStats({
            numProperties,
            totalFavourites,
          });
        })
        .catch((error) => {
          setErrorMessage("Error fetching properties.");
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <p className="host-properties">My Properties</p>
      <div className="stats-card">
        <p>
          <strong>Number of properties:</strong> {stats.numProperties}
        </p>
        <p>
          <strong>Total favourites:</strong> {stats.totalFavourites}
        </p>
      </div>
      <div className="properties-grid">
        {properties.map((property) => (
          <div key={property.property_id}>
            <Link
              to={`/properties/${property.property_id}`}
              className="property-card-link"
            >
              <div className="property-card">
                <p>{property.favourites}💜</p>
                <h2>🏡</h2>
                <h3>📍 {property.location}</h3>
                <h4>{property.name}</h4>
                <h4>💰 £{property.price_per_night} per night</h4>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </>
  );
}

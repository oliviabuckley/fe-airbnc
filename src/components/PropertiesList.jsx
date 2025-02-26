import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://be-airbnc.onrender.com/api/properties`)
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!sortBy || !order) return;
    setLoading(true);
    fetch(
      `https://be-airbnc.onrender.com/api/properties?sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProperties(data.properties);
        setLoading(false);
      });
  }, [sortBy, order]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="properties-list-container">
        <div className="filters">
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="">Sort By</option>
            <option value="price_per_night">Price</option>
            <option value="favourites">Popularity</option>
          </select>
          <select onChange={(e) => setOrder(e.target.value)} value={order}>
            <option value="">Order</option>
            <option value="ASC">Low to High</option>
            <option value="DESC">High to Low</option>
          </select>
        </div>
        <div className="properties-grid">
          {properties.map((property) => (
            <Link
              to={`/properties/${property.property_id}`}
              key={property.property_id}
              className="property-card-link"
            >
              <div className="property-card" key={property.property_id}>
                <p>{property.favourites}💜</p>
                <h2>🏡</h2>
                <h3>📍 {property.location}</h3>
                <h4>{property.property_name}</h4>
                <h4>💰 £{property.price_per_night} per night</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

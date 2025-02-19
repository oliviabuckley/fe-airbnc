import { useState, useEffect } from "react";

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    fetch(`https://be-airbnc.onrender.com/api/properties`)
      .then((res) => res.json())
      .then((data) => setProperties(data.properties));
  }, []);

  useEffect(() => {
    if (!sortBy || !order) return;
    fetch(
      `https://be-airbnc.onrender.com/api/properties?sortBy=${sortBy}&order=${order}`
    )
      .then((res) => res.json())
      .then((data) => setProperties(data.properties));
  }, [sortBy, order]);

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
            <div className="property-card" key={property.property_id}>
              <p>{property.favourites}💜</p>
              <h2>🏡</h2>
              <h3>{property.location}</h3>
              <h4>{property.property_name}</h4>
              <h4>£{property.price_per_night} per night</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { useState } from "react";

export default function AddToFavouritesButton({ user_id, property_id }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [isFavourite, setIsFavourite] = useState(false);

  const handleAddToFavourites = async () => {
    const url = `https://be-airbnc.onrender.com/api/properties/${property_id}/favourite`;

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ guest_id: user_id }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.status === 201) {
        setIsFavourite(true);
        setErrorMessage("");
      } else if (response.status === 400) {
        setErrorMessage(data.msg);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToFavourites}
        disabled={isFavourite}
        className="add-to-favourites-button"
      >
        {isFavourite ? "Added to Favourites 💜" : "Add to Favourites ➕💜"}
      </button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}

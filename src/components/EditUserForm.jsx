import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function EditUserForm({ handleCancel }) {
  const { user, setUser } = useContext(UserContext);
  const [formData, setFormData] = useState(user ? { ...user } : {});
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { first_name, surname, email, phone, avatar } = formData;
    const updatedData = { first_name, surname, email, phone, avatar };

    try {
      const response = await fetch(
        `https://be-airbnc.onrender.com/api/users/${user.user_id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const responseData = await response.json();
      console.log("Backend Response:", responseData);

      if (response.ok) {
        setUser(responseData);
        alert("Profile updated successfully!");
        handleCancel();
      } else {
        setErrorMessage(
          "Failed to update profile. Response: " + responseData.message
        );
      }
    } catch (error) {
      setErrorMessage("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <label>First Name:</label>
      <input
        type="text"
        name="first_name"
        value={formData.first_name || ""}
        onChange={handleInputChange}
      />

      <label>Surname:</label>
      <input
        type="text"
        name="surname"
        value={formData.surname || ""}
        onChange={handleInputChange}
      />

      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email || ""}
        onChange={handleInputChange}
      />

      <label>Phone:</label>
      <input
        type="tel"
        name="phone_number"
        value={formData.phone_number || ""}
        onChange={handleInputChange}
      />

      <label>Avatar URL:</label>
      <input
        type="url"
        name="avatar"
        value={formData.avatar || ""}
        onChange={handleInputChange}
      />

      <button type="submit">Save Changes</button>
      <button type="button" onClick={handleCancel} className="cancel-btn">
        Cancel
      </button>
    </form>
  );
}

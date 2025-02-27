import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import EditUserForm from "./EditUserForm";

export default function UserProfile() {
  const { user, updateUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  if (!user) return <p>Loading...</p>;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-card">
        <img
          src={user.avatar}
          alt={`${user.first_name} ${user.surname}`}
          className="profile-user-avatar"
        />
        <p>
          <strong>Name:</strong> {user.first_name} {user.surname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone_number}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Joined: </strong>
          {new Date(user.created_at).toLocaleDateString()}
        </p>
        {!isEditing ? (
          <button onClick={handleEditClick} className="edit-profile-button">
            Edit Profile
          </button>
        ) : (
          <EditUserForm handleCancel={handleCancelClick} />
        )}
      </div>
    </div>
  );
}

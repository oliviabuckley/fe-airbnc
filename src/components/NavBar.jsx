import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export default function NavBar() {
  const { user } = useContext(UserContext);
  return (
    <div className="nav-bar">
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/favourites" className="nav-link">
          My Favourites
        </Link>
      </div>
      <div className="profile-link">
        <Link to="/profile" className="nav-link">
          My Profile
        </Link>
        {user && (
          <img src={user.avatar} alt="User Avatar" className="user-avatar" />
        )}
      </div>
    </div>
  );
}

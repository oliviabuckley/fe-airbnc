import { Link } from "react-router";
export default function NavBar() {
  return (
    <>
      <div className="nav-bar">
        <nav>
          <Link className="nav-link">Home</Link>
          <Link className="nav-link">My Favourites</Link>
          <Link className="nav-link">My Profile</Link>
        </nav>
      </div>
    </>
  );
}

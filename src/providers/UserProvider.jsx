import { UserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(2);

  const fetchUser = async (userId) => {
    const response = await fetch(
      `https://be-airbnc.onrender.com/api/users/${userId}`
    );
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };
  useEffect(() => {
    console.log("Fetching user with ID:", currentUserId);
    fetchUser(currentUserId);
  }, [currentUserId]);

  const toggleUser = async () => {
    const newUserId = currentUserId === 1 ? 2 : 1;
    setCurrentUserId(newUserId);
    console.log("Switched to User ID:", newUserId);
  };

  return (
    <UserContext.Provider value={{ user, toggleUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

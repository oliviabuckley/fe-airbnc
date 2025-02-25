import { UserContext } from "../contexts/UserContext";
import { useState, useEffect } from "react";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    const response = await fetch(`https://be-airbnc.onrender.com/api/users/2`);
    if (response.ok) {
      const data = await response.json();
      setUser(data);
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

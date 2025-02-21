import { UserContext } from "../contexts/UserContext";

export default function UserProvider({ children }) {
  const user = {
    user_id: 2,
    first_name: "Bob",
    surname: "Smith",
    email: "bob@example.com",
    phone_number: "+44 7000 222222",
    role: "guest",
    avatar: "https://example.com/images/bob.jpg",
    created_at: "2024-12-13T10:29:41.241Z",
  };

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

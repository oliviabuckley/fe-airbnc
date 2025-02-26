import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router";
import PropertiesList from "./components/PropertiesList";
import Footer from "./components/Footer";
import PropertyDetails from "./components/PropertyDetails";
import UserProvider from "./providers/UserProvider";
import UserProfile from "./components/UserProfile";
import Favourites from "./components/Favourites";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<PropertiesList />}></Route>
            <Route
              path="/properties/:property_id"
              element={<PropertyDetails />}
            ></Route>
            <Route path="/favourites" element={<Favourites />}></Route>
            <Route path="/profile" element={<UserProfile />}></Route>
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

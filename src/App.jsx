import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router";
import PropertiesList from "./components/PropertiesList";
import Footer from "./components/Footer";
import PropertyDetails from "./components/PropertyDetails";
import UserProvider from "./providers/UserProvider";

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
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </>
  );
}

export default App;

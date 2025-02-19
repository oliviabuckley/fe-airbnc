import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router";
import PropertiesList from "./components/PropertiesList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<PropertiesList />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

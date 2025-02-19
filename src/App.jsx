import Header from "./components/Header";
import NavBar from "./components/NavBar";
import { BrowserRouter } from "react-router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <NavBar />
      </BrowserRouter>
    </>
  );
}

export default App;

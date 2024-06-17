import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between h-screen">
        <Navbar />

        <main>Content</main>
      </div>
    </BrowserRouter>
  );
}

export default App;

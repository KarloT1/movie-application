import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/navbar";
import Home from "./routes/home";
import MovieDetails from "./routes/movieDetails";
import MovieDiscovery from "./routes/movieDiscovery";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-discovery" element={<MovieDiscovery />} />
        <Route path="/movie-details" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

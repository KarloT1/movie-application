import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/navbar";
import SearchResults from "./routes/searchResults";
import Home from "./routes/home";
import MovieDetails from "./routes/movieDetails";
import MovieDiscovery from "./routes/movieDiscovery";
import * as Icon from 'react-bootstrap-icons';

const App = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-discovery" element={<MovieDiscovery />} />
        <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        <Route path="/search-results/:query" element={<SearchResults />} />
      </Routes>
      <Icon.ArrowUpCircle 
        className="position-fixed bottom-0 end-0 text-light h1 mb-3 me-2" 
        onClick={scrollToTop} 
        style={{cursor: "pointer"}}
      />
    </BrowserRouter>
  );
}

export default App;

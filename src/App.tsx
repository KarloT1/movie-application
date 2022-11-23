import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Components
import Navbar from "./components/navbar";
import Home from "./routes/home";
import MovieDetails from "./routes/movieDetails";
import MovieDiscovery from "./routes/movieDiscovery";
// Utils
import * as moviesAPI from "./utils/moviesAPI"; 

export interface State {
  genres: {
    [key: string]: number
  }[]
}

const App = () => {
  const [genres, getGenres] = useState<State["genres"]>([{}])

  useEffect(() => {

  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
  }

  return (
    <BrowserRouter>
      <Navbar handleChange={handleChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie-discovery" element={<MovieDiscovery />} />
        <Route path="/movie-details" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

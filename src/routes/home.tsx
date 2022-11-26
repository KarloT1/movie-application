import { useState, useEffect } from "react"
import MovieHorizontalList from "../components/movieHorizontalList"
import { MovieSingle, Genre } from "../interfaces"
// Utils
import * as moviesAPI from "../utils/moviesAPI";

const Home = () => {
  const [trending, setTrending] = useState<MovieSingle[]>([])
  const [thrillers, setThrillers] = useState<MovieSingle[]>([])
  const [upcoming, setUpcoming] = useState<MovieSingle[]>([])
  const [comedies, setComedies] = useState<MovieSingle[]>([])
  const [popular, setPopular] = useState<MovieSingle[]>([])
  const [horrors, setHorrors] = useState<MovieSingle[]>([])

  useEffect(() => {
    getTrending()
    getMovieByGenreName("Thriller", setThrillers)
    getUpcoming()
    getMovieByGenreName("Comedy", setComedies)
    getPopular()
    getMovieByGenreName("Horror", setHorrors)
  }, [])

  // Get trending movies
  const getTrending = () => {
    moviesAPI.getTrending().then(trending => setTrending(trending.results))
  }

  // Get upcoming movies
  const getUpcoming = () => {
    moviesAPI.getUpcoming().then(upcoming => setUpcoming(upcoming.results))
  }

  // Get popular movies
  const getPopular = () => {
    moviesAPI.getPopular().then(popular => setPopular(popular.results))
  }

  // Function which based on genre name returns an array of movies,
  // and based on state setting function name sets the state
  const getMovieByGenreName = async (genreName: string, setState: (state: MovieSingle[]) => void) => {
    const genres = await moviesAPI.getGenres().then(genres => genres.genres)
    const genreInfo = genres.filter((genre: Genre) => genre.name === genreName)
    const genreId = genreInfo[0].id;

    const discoverMoviesByGenreName = await moviesAPI.getByGenreName(genreId).then(movieByGenre => movieByGenre.results)

    setState(discoverMoviesByGenreName)
  }

  return (
    <div className="bg-dark text-white p-3">
      <MovieHorizontalList listName={trending} listNameTitle="Todays trending movies" />
      <MovieHorizontalList listName={thrillers} listNameTitle="Discover Thriller movies" />
      <MovieHorizontalList listName={upcoming} listNameTitle="Upcoming movies" />
      <MovieHorizontalList listName={comedies} listNameTitle="Discover Comedy movies" />
      <MovieHorizontalList listName={popular} listNameTitle="Popular movies" />
      <MovieHorizontalList listName={horrors} listNameTitle="Discover Horror movies" />
    </div>
  )
}

export default Home
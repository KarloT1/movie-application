import { useState, useEffect } from "react";
import MovieHorizontalList from "../components/movieHorizontalList";
import { MovieSingle, Genre } from "../interfaces"
import * as moviesAPI from "../utils/moviesAPI";

const Home = () => {
  const [trending, setTrending] = useState<MovieSingle[]>([])
  const [thrillers, setThrillers] = useState<MovieSingle[]>([])
  const [upcoming, setUpcoming] = useState<MovieSingle[]>([])
  const [comedies, setComedies] = useState<MovieSingle[]>([])
  const [popular, setPopular] = useState<MovieSingle[]>([])
  const [horrors, setHorrors] = useState<MovieSingle[]>([])
  const [error, setError] = useState(false)

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
    moviesAPI.getTrending().then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setError(true)
        return
      }
    }).then(trending => setTrending(trending.results))
  }

  // Get upcoming movies
  const getUpcoming = () => {
    moviesAPI.getUpcoming().then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setError(true)
        return
      }
    }).then(upcoming => setUpcoming(upcoming.results))
  }

  // Get popular movies
  const getPopular = () => {
    moviesAPI.getPopular().then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setError(true)
        return
      }
    }).then(popular => setPopular(popular.results))
  }

  // Function which based on genre name returns an array of movies,
  // and based on state setting function name sets the state
  const getMovieByGenreName = async (genreName: string, setState: (state: MovieSingle[]) => void) => {
    const genres = await moviesAPI.getGenres().then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setError(true)
        return
      }
    }).then(genres => genres.genres)
    const genreInfo = genres.filter((genre: Genre) => genre.name === genreName)
    const genreId = genreInfo[0].id;

    const discoverMoviesByGenreName = await moviesAPI.getByGenreName(genreId).then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setError(true)
        return
      }
    }).then(movieByGenre => movieByGenre.results)

    setState(discoverMoviesByGenreName)
  }

  return (
    <div className="bg-dark text-white p-3 py-5">
      {error
      ? <div className="container">
          <div className="vh-100">
            <h1 className="position-absolute top-50 start-50 translate-middle text-center">
              There seems to be an error. <br/> We're working on it, try again later. 
            </h1>
          </div>
        </div>
      : <>
          <MovieHorizontalList listName={trending} listNameTitle="Todays trending movies" />
          <MovieHorizontalList listName={thrillers} listNameTitle="Discover Thriller movies" />
          <MovieHorizontalList listName={upcoming} listNameTitle="Upcoming movies" />
          <MovieHorizontalList listName={comedies} listNameTitle="Discover Comedy movies" />
          <MovieHorizontalList listName={popular} listNameTitle="Popular movies" />
          <MovieHorizontalList listName={horrors} listNameTitle="Discover Horror movies" />
        </>
      }
    </div>
  )
}

export default Home
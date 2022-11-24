import { useState, useEffect } from "react"
import MovieHorizontalList from "../components/movieHorizontalList"
import { movieSingle } from "../interfaces"
// Utils
import * as moviesAPI from "../utils/moviesAPI";

const Home = () => {
  const [trending, setTrending] = useState<movieSingle[]>([])
  const [upcoming, setUpcoming] = useState<movieSingle[]>([])
  const [popular, setPopular] = useState<movieSingle[]>([])

  useEffect(() => {
    getTrending()
    getUpcoming()
    getPopular()
  }, [])


  const getTrending = () => {
    moviesAPI.getTrending().then(trending => setTrending(trending.results))
  }

  const getUpcoming = () => {
    moviesAPI.getUpcoming().then(upcoming => setUpcoming(upcoming.results))
  }

  const getPopular = () => {
    moviesAPI.getPopular().then(popular => setPopular(popular.results))
  }

  return (
    <div className="bg-dark text-white p-3">
      <MovieHorizontalList listName={trending} listNameTitle="Trending movies" />
      <MovieHorizontalList listName={upcoming} listNameTitle="Upcoming movies" />
      <MovieHorizontalList listName={popular} listNameTitle="Popular movies" />
    </div>
  )
}

export default Home
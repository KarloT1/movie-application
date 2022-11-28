import React, { useState, useEffect} from 'react'
import MovieCard from '../components/movieCard'
import { MovieSingle } from '../interfaces'
import * as moviesAPI from "../utils/moviesAPI"

const MovieDiscovery = () => {
  const [discoverMovies, setDiscoverMovies] = useState<MovieSingle[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(1)

  useEffect(() => {
    getDiscover()
  }, [currentPage])

  const getDiscover = () => {
    moviesAPI.getDiscover(currentPage).then(discover => {
      setTotalPages(discover.total_pages)
      setTotalResults(discover.total_results)

      let updatedData = discoverMovies.concat(discover.results) 
      setDiscoverMovies(updatedData)
    })
  }

  const handleScroll = () => {
    const userScrollHeight = window.innerHeight + window.scrollY;
    const windowBottomHeight = document.documentElement.offsetHeight;

    if (userScrollHeight >= windowBottomHeight && currentPage <= totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }
  return (
    <div className="bg-dark text-white p-3 py-5">
      <div className="container">
        <h2 className="mb-3">Discover new movies</h2>
        <p className="lead text-muted mb-3">{`Total number of results: ${totalResults}`}</p>
        <p className="lead text-muted mb-5">{`Currently showing: ${discoverMovies.length}`}</p>
        <div className="d-flex flex-wrap justify-content-lg-between justify-content-center">
          {discoverMovies.map((movie, index) => (
            <MovieCard listNameMovie={movie} key={index} className="mb-4" />
          ))}
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button 
            type="button" 
            className="btn btn-outline-warning btn-lg"
            onClick={handleScroll}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDiscovery
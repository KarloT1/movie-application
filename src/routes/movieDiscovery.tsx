import React, { useState, useEffect} from 'react'
import GenreFilters from '../components/genreFilters'
import MovieCard from '../components/movieCard/movieCard'
import { Genre, MovieSingle } from '../interfaces'
import * as moviesAPI from "../utils/moviesAPI"

const MovieDiscovery = () => {
  const [discoverMovies, setDiscoverMovies] = useState<MovieSingle[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [activeGenre, setActiveGenre] = useState<number[]>([])
  const [genreDeleted, setGenreDeleted] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(1)

  useEffect(() => {
    discoverFilter()
    getGenres()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeGenre])

  const discoverFilter = async () => {
    if (activeGenre.length) {
      const activeGenreString = activeGenre.join(",");
      genreDeleted && setCurrentPage(1)
      await moviesAPI.filterDiscover(currentPage, activeGenreString).then(discover => {
        setTotalPages(discover.total_pages)
        setTotalResults(discover.total_results)
        if (currentPage > 1) {
          if (genreDeleted) {
            setDiscoverMovies(discover.results)
            setGenreDeleted(false)
          } else {
            const lastAddedGenre = activeGenre.at(-1)
            console.log(lastAddedGenre);
            
            let updatedData = discoverMovies.concat(discover.results)
            setDiscoverMovies(updatedData.filter(data => data.genre_ids.includes(lastAddedGenre ? lastAddedGenre : 0)))
          }
        } else {
          setDiscoverMovies(discover.results)
        }
      })
      
    } else {
      genreDeleted && setCurrentPage(1)
      await moviesAPI.filterDiscover(currentPage, "").then(discover => {
        setTotalPages(discover.total_pages)
        setTotalResults(discover.total_results)
        if (currentPage > 1) {
          if (genreDeleted) {
            setDiscoverMovies(discover.results)
            setGenreDeleted(false)
          } else {
            let updatedData = discoverMovies.concat(discover.results)
            setDiscoverMovies(updatedData)
          }
        } else {
          setDiscoverMovies(discover.results)
        }
      })
    }
  }

  const getGenres = () => {
    moviesAPI.getGenres().then(genres => setGenres(genres.genres))
  }

  const handleScroll = () => {
    if (currentPage <= totalPages) {      
      setCurrentPage(prev => prev + 1)
    }
  }

  const disabled = totalResults <= discoverMovies.length ? true : false
  return (
    <div className="bg-dark text-white p-3 py-5">
      <div className="container">
        <h2 className="mb-3">Discover new movies</h2>
        <p className="lead text-muted mb-3">{`Total number of results: ${totalResults}`}</p>
        <p className="lead text-muted mb-5">{`Currently showing: ${discoverMovies.length}`}</p>
          {genres.map(genre => (
            <GenreFilters genre={genre} activeGenre={activeGenre} setActiveGenre={setActiveGenre} setGenreDeleted={setGenreDeleted} key={genre.id} />
          ))}
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
            disabled={disabled}
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieDiscovery
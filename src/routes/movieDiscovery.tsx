import { useState, useEffect} from 'react';
import GenreFilters from '../components/genreFilters';
import MovieCard from '../components/movieCard/movieCard';
import { Genre, MovieSingle } from '../interfaces';
import * as moviesAPI from "../utils/moviesAPI";

const MovieDiscovery = () => {
  const [discoverMovies, setDiscoverMovies] = useState<MovieSingle[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [activeGenre, setActiveGenre] = useState<number[]>([])
  const [genreDeleted, setGenreDeleted] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(1)

  const [error, setError] = useState((false))

  useEffect(() => {
    discoverFilter()
    getGenres()
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, activeGenre])

  // Update list based on filters selected and/or load more button click
  const discoverFilter = async () => {
    if (activeGenre.length) {
      const activeGenreString = activeGenre.join(",");
      genreDeleted && setCurrentPage(1)
      await moviesAPI.filterDiscover(currentPage, activeGenreString).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError(true)
          return
        }
      }).then(discover => {
        setTotalPages(discover.total_pages)
        setTotalResults(discover.total_results)
        if (currentPage > 1) {
          if (genreDeleted) {
            setDiscoverMovies(discover.results)
            setGenreDeleted(false)
          } else {
            const lastAddedGenre = activeGenre.at(-1)
            
            let updatedData = discoverMovies.concat(discover.results)
            setDiscoverMovies(updatedData.filter(data => data.genre_ids.includes(lastAddedGenre ? lastAddedGenre : 0)))
          }
        } else {
          setDiscoverMovies(discover.results)
        }
      })
      
    } else {
      genreDeleted && setCurrentPage(1)
      await moviesAPI.filterDiscover(currentPage, "").then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError(true)
          return
        }
      }).then(discover => {
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

  // Get genres (looped over to create checkboxes)
  const getGenres = () => {
    moviesAPI.getGenres().then(res => {
      if (res.ok) {
        return res.json()
      } else {
        setError(true)
        return
      }
    }).then(genres => setGenres(genres.genres))
  }

  // Handle load more button
  const handleScroll = () => {
    if (currentPage <= totalPages) {      
      setCurrentPage(prev => prev + 1)
    }
  }

  // Disable load more button based on number of fetched movies
  const disabled = totalResults <= discoverMovies.length ? true : false
  return (
    <>
      {error
      ? <div className="bg-dark text-white p-3 py-5">
          <div className="container">
            <div className="vh-100">
              <h1 className="position-absolute top-50 start-50 translate-middle text-center">
                There seems to be an error. <br/> We're working on it, try again later. 
              </h1>
            </div>
          </div>
        </div>
      : <div className="bg-dark text-white p-3 py-5">
          <div className="container">
            <h2 className="mb-3">Discover new movies</h2>
            <p className="lead text-muted mb-3">{`Total number of results: ${totalResults}`}</p>
            <p className="lead text-muted mb-5">{`Currently showing: ${discoverMovies.length}`}</p>
              {genres.map(genre => (
                <GenreFilters genres={genres} genre={genre} activeGenre={activeGenre} setActiveGenre={setActiveGenre} setGenreDeleted={setGenreDeleted} error={error} key={genre.id} />
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
      }
    </>
  )
}

export default MovieDiscovery
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/movieCard/movieCard';
import { MovieSingle } from '../interfaces';
import * as moviesAPI from "../utils/moviesAPI";

interface Params {
  query: string
}

const SearchResults = () => {

  const [query, setQuery] = useState("")
  const [moviesByKeyword, setMoviesByKeyword] = useState<MovieSingle[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(1)
  const [error, setError] = useState(false)
  
  const params = useParams<keyof Params>() as Params

  useEffect(() => {
    setQuery(params.query)
    getMoviesByKeyword()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.query, currentPage])

  // Fetch searched movies based on url parameters
  const getMoviesByKeyword = async () => {
    if (params.query !== query) {
      setMoviesByKeyword([])
      setCurrentPage(1)
      await moviesAPI.searchMoviesPagination(params.query, currentPage).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError(true)
          return
        }
      })
      .then(searchedMovies => {
        setTotalPages(searchedMovies.total_pages)
        setTotalResults(searchedMovies.total_results)
        setMoviesByKeyword(searchedMovies.results)
      })
    } else {
      await moviesAPI.searchMoviesPagination(params.query, currentPage).then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError(true)
          return
        }
      })
      .then(searchedMovies => {
        setTotalPages(searchedMovies.total_pages)
        setTotalResults(searchedMovies.total_results)

        let updatedData = moviesByKeyword.concat(searchedMovies.results)
        setMoviesByKeyword(updatedData)
      })
    }
  }

  // Handle load more button
  const handleScroll = async () => {
    const userScrollHeight = window.innerHeight + window.scrollY;
    const windowBottomHeight = document.documentElement.offsetHeight;

    if(userScrollHeight >= windowBottomHeight && currentPage <= totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const disabled = totalPages === 1 ? true : false
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
      : <div className="container">
          {moviesByKeyword.length ? (
            <>
              <h2 className="mb-3">{`Search results for: "${query}"`}</h2>
              <p className="lead text-muted mb-3">{`Total number of results: ${totalResults}`}</p>
              <p className="lead text-muted mb-5">{`Currently showing: ${moviesByKeyword.length}`}</p>
              <div className="d-flex flex-wrap justify-content-lg-between justify-content-center">
                {moviesByKeyword.map((movie, index) => (
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
            </>
          ): (
            <div className="vh-100">
              <h1 className="position-absolute top-50 start-50 translate-middle text-center">
                {`There seems to be no matches for "${query}".`}
                <br/>
                Please check your spelling or try using different words.
              </h1>
            </div>
          )}
        </div>
      }
    </div>
  )
}

export default SearchResults
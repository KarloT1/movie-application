import { useEffect, useState } from 'react';
import * as moviesAPI from "../utils/moviesAPI";
import { MovieSingle } from '../interfaces';
import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';

const Search =() => {
  const [query, setQuery] = useState("")
  const [searchedMovies, setSearchedMovies] = useState<MovieSingle[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    searchBooks()
  }, [query])

  const searchBooks = () => {
    query.length && (
      moviesAPI.searchMovies(query).then(searchedMovies => {
        setSearchedMovies(searchedMovies.results)
      })
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigate(`/search-results/${query}`)
      setQuery("")
    }
  }

  return (
    <>
      <div className="input-group w-50 position-relative">
        <div className="position-relative w-100">
          <input 
            type="text" 
            className="form-control bg-dark text-white" 
            placeholder="Search Movies or TV Shows"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyPress}
          />
          {query.length > 2 && (
            <Icon.XLg 
              className="position-absolute top-50 end-0 translate-middle text-light h5" 
              onClick={() => setQuery("")}
            />
          )}
        </div>
        {(query.length > 2 && query) && (
          <div className="position-absolute top-100 start-0 w-100" style={{zIndex: "1"}}>
            <ul className="list-group">
              {searchedMovies.splice(0, 5).map(movie => (
                <Link to={`/movie-details/${movie.id}`} className="text-decoration-none" key={movie.id} onClick={() => setQuery("")}>
                  <li className="list-group-item bg-dark text-light d-flex justify-content-start align-items-center">
                    {movie.poster_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
                        style={{height: "120px", width: "80px"}}
                        className="me-3"
                        alt=""
                      />
                    ): (
                      <img 
                        src="" 
                        style={{height: "120px", width: "80px"}}
                        className="me-3"
                        alt={`${movie.title} poster.`}
                      />
                    )}
                    <div className="d-flex flex-column">
                      <p className="fs-5">{movie.title}</p>
                      <p className="text-muted">{movie.release_date.split("-")[0]}</p>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
            {searchedMovies.length ? (
              <Link to={`/search-results/${query}`} className="text-decoration-none text-dark" onClick={() => setQuery("")}>
                <p className="bg-dark text-light lead py-3 pe-3 text-end">{`Show all results for: "${query}"`}</p>
              </Link>
            ): (
              <p 
                className="bg-dark text-light lead py-3 pe-3 text-center"
              >
                {`We can't find any results for: "${query}". Try something else.`}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default Search
import React, { useEffect, useState } from 'react';
import * as moviesAPI from "../utils/moviesAPI";
import { MovieSingle } from '../interfaces';

const Search =() => {
  const [query, setQuery] = useState("")
  const [searchedMovies, setSearchedMovies] = useState<MovieSingle[]>([])

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

  return (
    <>
      <div className="input-group w-50 position-relative">
        <input 
          type="text" 
          className="form-control bg-dark text-white" 
          placeholder="Search Movies or TV Shows"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        {(query.length > 2 && query) && (
          <div className="position-absolute top-100 start-0 w-100" style={{zIndex: "1"}}>
            <ul className="list-group">
              {searchedMovies.map(movie => (
                <li className="list-group-item bg-dark text-light d-flex justify-content-start align-items-center" key={movie.id}>
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
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Search
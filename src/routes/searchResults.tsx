import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/movieCard'
import { MovieSingle } from '../interfaces'
import * as moviesAPI from "../utils/moviesAPI"

interface Params {
  query: string
}

const SearchResults = () => {
  
  const [query, setQuery] = useState("")
  const [moviesByKeyword, setMoviesByKeyword] = useState<MovieSingle[]>([])
  
  const params = useParams<keyof Params>() as Params

  useEffect(() => {
    setQuery(params.query)
    getMoviesByKeyword()
  }, [params.query])

  const getMoviesByKeyword = () => {
    moviesAPI.searchMovies(params.query).then(moviesByKeyword => setMoviesByKeyword(moviesByKeyword.results))
  }

  return (
    <div className="bg-dark text-white p-3 py-5">
      <div className="container">
        {moviesByKeyword.length ? (
          <>
            <h2 className="mb-5">{`Search results for: "${query}"`}</h2>
            <div className="d-flex flex-wrap justify-content-lg-between justify-content-center">
              {moviesByKeyword.map((movie, index) => (
                <MovieCard listNameMovie={movie} key={index} className="mb-4" />
              ))}
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
    </div>
  )
}

export default SearchResults
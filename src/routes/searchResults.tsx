import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieCard from '../components/movieCard/movieCard'
import { MovieSingle } from '../interfaces'
import * as moviesAPI from "../utils/moviesAPI"

interface Params {
  query: string
}

const SearchResults = () => {
  
  const [query, setQuery] = useState("")
  const [moviesByKeyword, setMoviesByKeyword] = useState<MovieSingle[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalResults, setTotalResults] = useState(1)
  
  const params = useParams<keyof Params>() as Params

  useEffect(() => {
    setQuery(params.query)
    getMoviesByKeyword()
    window.addEventListener("scroll", handleScroll)

  }, [params.query, currentPage])

  const getMoviesByKeyword = async () => {
    await moviesAPI.searchMoviesPagination(params.query, currentPage)
    .then(searchedMovies => {
      setTotalPages(searchedMovies.total_pages)
      setTotalResults(searchedMovies.total_results)
      
      if (params.query !== query) {
        setMoviesByKeyword(searchedMovies.results)
      } else {
        let updatedData = moviesByKeyword.concat(searchedMovies.results)
        setMoviesByKeyword(updatedData)
      }
    })
  }

  const handleScroll = async () => {
    const userScrollHeight = window.innerHeight + window.scrollY;
    const windowBottomHeight = document.documentElement.offsetHeight;

    if(userScrollHeight >= windowBottomHeight && currentPage <= totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  return (
    <div className="bg-dark text-white p-3 py-5">
      <div className="container">
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
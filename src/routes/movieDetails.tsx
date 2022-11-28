import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as moviesAPI from "../utils/moviesAPI"
import { MovieSingle } from "../interfaces";
import MovieHorizontalList from '../components/movieHorizontalList';

interface Params {
  movieId: string
}


const MovieDetails = () => {
  const [movieDetails, setMovieDetails] = useState<MovieSingle>()
  const [similar, setSimilar] = useState<MovieSingle[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const params = useParams<keyof Params>() as Params;

  useEffect(() => {
    getMovieDetails()
    getSimilarMovies()
  }, [params.movieId])

  const getMovieDetails = async () => {
    await moviesAPI.getMovieDetails(params.movieId)
      .then(movieDetails => {
        setMovieDetails(movieDetails)
      })
      .then(() => setLoading(false))
  }

  const getSimilarMovies = async () => {
    await moviesAPI.getSimilarMovies(params.movieId)
      .then(similarMovies => {
        setSimilar(similarMovies.results)
      })
      .then(() => setLoading(false))
  }

  const releaseDate = movieDetails?.release_date
  const releaseDateEuFormat = releaseDate?.split("-").reverse().join(" / ")
  
  return (
    <div className="bg-dark text-white p-3 py-5">
      <div className="container">
        {(loading || !movieDetails) ? (
          <>
            <div className="vh-100">
              <h1 className="position-absolute top-50 start-50 translate-middle">
                Give us a few moments, we are fetching your data.
              </h1>
            </div>
          </>
        ) : (   
          <>
          <div className="row mb-5">

            <div className="col-lg-6 text-lg-start text-center mb-lg-0 mb-5">
              <img 
                src={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`} 
                className="img-fluid w-75" 
                alt={`${movieDetails.title} poster.`}
              />
            </div>

            <div className="col-lg-6">
              <h2 className="text-lg-start text-center">{movieDetails.title}</h2>
              <hr className="my-5"/>
              <p className="lead">
                <span className="fw-bold text-uppercase">Plot: </span>
                {movieDetails.overview}
              </p>
              <p className="lead">
                <span className="fw-bold text-uppercase">Rating: </span>
                {movieDetails.vote_average} / 10
              </p>
              <p className="lead">
                <span className="fw-bold text-uppercase">Release date: </span>
                {releaseDateEuFormat}
              </p>
            </div>

          </div>

          <div className="row">
            <MovieHorizontalList listName={similar} listNameTitle={`Similar to ${movieDetails.title}`} />
          </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MovieDetails
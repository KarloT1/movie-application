import React, { useState, useEffect } from 'react'
import MovieCard from '../components/movieCard/movieCard';
import { MovieSingle } from '../interfaces';

const Favorites = () => {
  const [favorites, setFavorites] = useState<MovieSingle[]>([])

  useEffect(() => {
    let existingFavorites: MovieSingle[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    setFavorites(existingFavorites)
  }, [])

  const removeFav = (movieId: number) => {
    setFavorites(favorites.filter(favorite => favorite.id !== movieId))
  }
  
  return (
    <div className="bg-dark text-white p-3 py-5">
      <div className="container">
        {!favorites.length ? (
          <div className="vh-100">
            <h1 className="position-absolute top-50 start-50 translate-middle text-center">
              You haven't added any favorites to your list.
            </h1>
          </div>
        ): (
          <>
            <h2 className="mb-3">Your Favorite Movies</h2>
              <div className="d-flex flex-wrap justify-content-lg-start justify-content-center vh-100">
                {favorites.length && favorites.map((movie, index) => (
                  <MovieCard listNameMovie={movie} key={index} removeFav={removeFav} className="mb-4" />
                ))}
              </div>
          </>
        )}
          
      </div>
    </div>
  )
}

export default Favorites
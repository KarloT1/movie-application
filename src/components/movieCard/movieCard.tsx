import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MovieSingle } from '../../interfaces'
import * as Icon from 'react-bootstrap-icons';

interface IProps {
  listNameMovie: MovieSingle
  className?: string
  removeFav?: (movieId: number) => void
}

const MovieCard = ({ listNameMovie, className, removeFav }: IProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [, setStorageItems] = useState<MovieSingle[]>([])
  const [storageIds, setStorageIds] = useState<number[]>([])

  const areFavorites = storageIds.includes(listNameMovie.id)
  
  useEffect(() => {
    setStorageItems(JSON.parse(localStorage.getItem("favorites") || "[]"))
    setStorageIds(JSON.parse(localStorage.getItem("favoritesIds") || "[]"))
  }, [])

  const toggleFavorite = () => {
    // Save existing favorites objects and ids to a variable
    let existingFavorites: MovieSingle[] = JSON.parse(localStorage.getItem("favorites") || "[]")
    let existingFavIds: number[] = JSON.parse(localStorage.getItem("favoritesIds") || "[]")
    // Check if the clicked movie is a favorite
    let isFavorite = existingFavorites.filter(entry => {
      return entry.id === listNameMovie.id
    })
    
    if (!isFavorite.length) {

      // Set favorites object to local storage & to state
      existingFavorites.push(listNameMovie)
      localStorage.setItem("favorites", JSON.stringify(existingFavorites))
      setStorageItems(existingFavorites)

      // Set favorites id to local storage & to state
      existingFavIds.push(listNameMovie.id)
      localStorage.setItem("favoritesIds", JSON.stringify(existingFavIds))
      setStorageIds(existingFavIds)
    } else {

      // Set favorites object to local storage & to state
      existingFavorites = existingFavorites.filter(favoriteMovie => favoriteMovie.id !== listNameMovie.id)
      localStorage.setItem("favorites", JSON.stringify(existingFavorites))
      setStorageItems(existingFavorites)

      // Set favorites id to local storage & to state
      existingFavIds = existingFavIds.filter(favoriteId => favoriteId !== listNameMovie.id)
      localStorage.setItem("favoritesIds", JSON.stringify(existingFavIds))
      setStorageIds(existingFavIds)

      removeFav && removeFav(listNameMovie.id)
    }
  }

  return (
    <div className="position-relative me-4">
      <Link to={`/movie-details/${listNameMovie.id}`} className="text-decoration-none text-dark custom-card-box">
        <div 
          className={`card border-0 pe-none 
                      user-select-none bg-dark
                      ${className ? className : ""}`} 
          style={{minWidth: "250px"}}
        >
          {!listNameMovie.poster_path 
          ? <div className='border border-warning' style={{ height: "375px"}}>
              <p className="text-white lead text-center mt-5" style={{ maxWidth: "250px"}}>
                {`${listNameMovie.title} poster.`}
              </p>
            </div>
          : <img 
              src={`https://image.tmdb.org/t/p/w300${listNameMovie.poster_path}`} 
              className="card-img-top" 
              alt=""
              style={{height: "375px"}}
            />
          }
        </div>
      </Link>
      <div 
        className="position-absolute end-0 top-0"
        onMouseOver={() => setIsHovered(true)} 
        onMouseOut={() => setIsHovered(false)} 
        onClick={toggleFavorite}
        style={{cursor: "pointer"}}
      >
        {isHovered || areFavorites
        ? <Icon.BookmarkFill
            className="text-warning h3 m-2"
          />
        : <Icon.Bookmark
            className="text-warning h3 m-2"
          />
        }
      </div>
    </div>
  )
}

export default MovieCard
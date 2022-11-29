import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MovieSingle } from '../../interfaces'
import * as Icon from 'react-bootstrap-icons';

interface IProps {
  listNameMovie: MovieSingle
  className?: string
}

const MovieCard = ({ listNameMovie, className }: IProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [storageItem, setStorageItem] = useState<number[]>([])

  const isFavorite = storageItem.includes(listNameMovie.id)
  
  useEffect(() => {
    setStorageItem(JSON.parse(localStorage.getItem("favorites") || "[]"))
  }, [])

  const toggleFavorite = () => {
    if (!isFavorite) {
      const newStorageItem = [...storageItem, listNameMovie.id];
      setStorageItem(newStorageItem)
      localStorage.setItem("favorites", JSON.stringify(newStorageItem))
    } else {
      const newStorageItem = storageItem.filter(favoriteId => favoriteId !== listNameMovie.id)
      setStorageItem(newStorageItem)
      localStorage.setItem("favorites", JSON.stringify(newStorageItem))
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
        {isHovered || isFavorite
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
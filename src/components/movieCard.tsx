import React from 'react'
import { Link } from 'react-router-dom'
import { MovieSingle } from '../interfaces'

interface IProps {
  listNameMovie: MovieSingle
  className?: string
}

const MovieCard = ({ listNameMovie, className }: IProps) => {
  return (
    <Link to={`/movie-details/${listNameMovie.id}`} className="text-decoration-none text-dark">
      <div 
        className={`card me-3 border-0 pe-none 
                    user-select-none bg-dark
                    ${className ? className : ""}`} 
        style={{minWidth: "250px"}}
      >
        {listNameMovie.poster_path ? (
          <img 
            src={`https://image.tmdb.org/t/p/w300${listNameMovie.poster_path}`} 
            className="card-img-top" 
            alt=""
            style={{height: "375px"}}
          />
        ) : (
          <img 
            src="" 
            className="card-img-top" 
            alt={`${listNameMovie.title} poster.`}
            style={{height: "375px"}}
          />
        )}
      </div>
    </Link>
  )
}

export default MovieCard
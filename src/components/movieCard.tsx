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
  )
}

export default MovieCard
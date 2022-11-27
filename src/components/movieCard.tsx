import React from 'react'
import { Link } from 'react-router-dom'
import { MovieSingle } from '../interfaces'

interface IProps {
  listNameMovie: MovieSingle
}

const MovieCard = ({ listNameMovie }: IProps) => {
  return (
    <Link to={`/movie-details/${listNameMovie.id}`} className="text-decoration-none text-dark">
      <div className="card me-3 border-0 pe-none user-select-none bg-dark" style={{minWidth: "250px"}}>
        <img 
          src={`https://image.tmdb.org/t/p/w300${listNameMovie.poster_path}`} 
          className="card-img-top" 
          alt=""
          style={{height: "375px"}}
        />
      </div>
    </Link>
  )
}

export default MovieCard
import React from 'react'
import { MovieSingle } from '../interfaces'

interface IProps {
  listNameMovie: MovieSingle
}

const MovieCard = ({ listNameMovie }: IProps) => {
  return (
    <div className="card me-3 border-0 pe-none user-select-none" style={{minWidth: "250px"}}>
      <img 
        src={`https://image.tmdb.org/t/p/w200${listNameMovie.poster_path}`} 
        className="card-img-top" 
        alt=""
        style={{height: "372px"}}
      />
      <div className="card-body">
        <p className="card-text">{listNameMovie.title}</p>
      </div>
    </div>
  )
}

export default MovieCard
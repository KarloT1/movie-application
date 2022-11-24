import React from 'react'
import { movieSingle } from '../interfaces'

interface IProps {
  listNameMovie: movieSingle
}

const MovieCard = ({ listNameMovie }: IProps) => {
  return (
    <div className="card me-3 border-0" style={{minWidth: "250px"}}>
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
import React from 'react'
import { MovieSingle } from '../interfaces'
import MovieCard from './movieCard'

interface IProps {
  listName: MovieSingle[]
  listNameTitle: string
}

const MovieHorizontalList = ({ listName, listNameTitle }: IProps) => {
  return (
    <div className="container mb-5">
      <h2 className="mb-3">{listNameTitle}</h2>
      <div className="d-flex flex-row flex-nowrap overflow-auto text-dark">
        {listName.map((listNameMovie, index) => (
          <MovieCard listNameMovie={listNameMovie} key={index} />
        ))}
      </div>
    </div>
  )
}

export default MovieHorizontalList
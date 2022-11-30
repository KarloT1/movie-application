import React from 'react'
import { Genre } from '../interfaces'
import * as moviesAPI from "../utils/moviesAPI"

interface IProps {
  genre: Genre
  activeGenre: number[]
  setActiveGenre: React.Dispatch<React.SetStateAction<number[]>>
}
const GenreFilters = ({ genre, activeGenre, setActiveGenre }: IProps) => {

  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    getMoviesByGenreName(e.target.value)
  }

  const getMoviesByGenreName = async (genreName: string) => {
    const genres = await moviesAPI.getGenres().then(genres => genres.genres)
    const genreInfo = genres.filter((genre: Genre) => genre.name === genreName)
    const genreId = genreInfo[0].id;
    if (activeGenre.includes(genreId)) {
      setActiveGenre(activeGenre.filter(genre => genre !== genreId))
    } else {
      let newGenre = [...activeGenre, genreId]
      setActiveGenre(newGenre)
    }
  }
  return (
    <div className="form-check form-check-inline" key={genre.id}>
      <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={genre.name} onChange={handleChange} />
      <label className="form-check-label" htmlFor="inlineCheckbox1">{genre.name}</label>
    </div>
  )
}

export default GenreFilters
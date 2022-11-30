import { Genre } from '../interfaces';

interface IProps {
  genre: Genre
  genres: Genre[]
  activeGenre: number[]
  setActiveGenre: React.Dispatch<React.SetStateAction<number[]>>
  setGenreDeleted: React.Dispatch<React.SetStateAction<boolean>>
  error: boolean
}
const GenreFilters = ({ genres, genre, activeGenre, setActiveGenre, setGenreDeleted, error }: IProps) => {
  // Handle checkbox interactions 
  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    getMoviesByGenreName(e.target.value)
  }

  // Genre name is passed in as an argument, whose id is then added to active genres list
  const getMoviesByGenreName = async (genreName: string) => {
    const genreInfo = genres.filter((genre: Genre) => genre.name === genreName)
    const genreId = genreInfo[0].id;
    if (activeGenre.includes(genreId)) {
      setActiveGenre(activeGenre.filter(genre => genre !== genreId))
      setGenreDeleted(true)
    } else {
      let newGenre = [...activeGenre, genreId]
      setActiveGenre(newGenre)
    }
  }
  return (
    <>
      {error
      ? <div className="container">
          <div className="vh-100">
            <h1 className="position-absolute top-50 start-50 translate-middle text-center">
              There seems to be an error. <br/> We're working on it, try again later. 
            </h1>
          </div>
        </div>
      : <div className="form-check form-check-inline" key={genre.id}>
          <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value={genre.name} onChange={handleChange} />
          <label className="form-check-label" htmlFor="inlineCheckbox1">{genre.name}</label>
        </div>
      }
    </>
  )
}

export default GenreFilters
const path = "https://api.themoviedb.org/3";
const token = "e7e6f4accbd101ba872a52040540bb5d"

export const getGenres = async () => {
  const response = await fetch(`${path}/genre/movie/list?api_key=${token}`)

  return response.json()
}
const path = "https://api.themoviedb.org/3";
const token = "e7e6f4accbd101ba872a52040540bb5d";

export const getTrending = async () => {
  const res = await fetch(`${path}/trending/movie/day?api_key=${token}`)
  return res.json()
}

export const getUpcoming = async () => {
  const res = await fetch(`${path}/movie/upcoming?api_key=${token}`)
  return res.json()
}

export const getPopular = async () => {
  const res = await fetch(`${path}/movie/popular?api_key=${token}`)
  return res.json()
}

export const getGenres = async () => {
  const res = await fetch(`${path}/genre/movie/list?api_key=${token}`)
  return res.json()
}

export const getDiscover = async () => {
  const res = await fetch(`${path}/discover/movie?api_key=${token}`)
  return res.json()
}

export const searchMovies = async (query: string) => {
  const res = await fetch (`${path}/search/movie?api_key=${token}&query=${query}`)
  return res.json()
}

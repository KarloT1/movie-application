export interface MovieSingle {
  id: number
  title: string
  genre_ids: number[]
  poster_path: string | null
  release_date: string
  overview: string
  vote_average: number
}

export interface Genre {
  id: number
  name: string
}
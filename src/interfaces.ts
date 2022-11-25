export interface MovieSingle {
  id: number
  title: string
  genre_ids: number[]
  poster_path: string,
  overview?: string
}

export interface Genre {
  id: number
  name: string
}
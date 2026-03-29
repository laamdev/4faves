export interface Artist {
  id: number | string
  favoriteId?: number | string
  name: string
  updatedAt?: string
  createdAt?: string
  role: string
  headshotUrl: string | null
}

export interface Movie {
  id: number | string
  _id?: string
  name: string
  slug: string
  genres?: string[] | null
  overview?: string
  updatedAt?: string
  createdAt?: string
  releaseDate: string
  country?: string
  posterUrl?: string | null
}

export interface MoviesToFavorites {
  movieId?: number | string
  favoriteId?: number | string
  movie: Movie
}

export interface Favorite {
  id: number | string
  name: string
  slug: string
  votes?: string
  likes?: number
  publishingDate: string
  videoUrl: string
  category: string
  artist?: Artist
  moviesToFavorites?: MoviesToFavorites[]
}

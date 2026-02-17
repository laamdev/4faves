export interface Artist {
  id: number
  favoriteId: number
  name: string
  updatedAt: string
  createdAt: string
  role: string
  headshotUrl: string
}

export interface Movie {
  id: number
  name: string
  slug: string
  genres: string[] | null
  overview: string
  updatedAt: string
  createdAt: string
  releaseDate: string
  country: string
  posterUrl: string | null
}

export interface MoviesToFavorites {
  movieId: number
  favoriteId: number
  movie: Movie
}

export interface Favorite {
  id: number
  name: string
  slug: string
  votes: string
  publishingDate: string
  videoUrl: string
  category: string
  artist: Artist
  moviesToFavorites: MoviesToFavorites[]
}

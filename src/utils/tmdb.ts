interface MovieSearchResponse {
  results: {
    id: number
    title: string
    poster_path: string
    release_date: string
  }[]
}

export async function searchMovies(query: string) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TMDB_READ_TOKEN}`,
          Accept: 'application/json'
        }
      }
    )

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(
        `Failed to fetch movies: ${res.status} ${JSON.stringify(errorData)}`
      )
    }

    const data: MovieSearchResponse = await res.json()
    return data.results
  } catch (error) {
    console.error('Error searching movies:', error)
    throw error
  }
}

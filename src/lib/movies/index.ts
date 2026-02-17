'use server'

export async function searchMovies(query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query
    )}&include_adult=false&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`
  )
  const { results } = await response.json()

  return results
    .map(
      ({
        id,
        poster_path,
        release_date,
        title
      }: {
        id: string
        release_date: string
        poster_path: string
        title: string
      }) => ({
        id,
        poster_path,
        title,
        release_date
      })
    )
    .filter(({ poster_path }: { poster_path: string }) => !!poster_path)
}

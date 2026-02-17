/**
 * Data Migration Script: Neon PostgreSQL -> Convex
 *
 * Prerequisites:
 *   1. Set DATABASE_URL in .env.local (Neon connection string)
 *   2. Set NEXT_PUBLIC_CONVEX_URL in .env.local to the Convex deployment you want to migrate TO.
 *   3. Run: npx convex dev (to deploy schema first), then run this script.
 *
 * IMPORTANT – Dev vs prod:
 *   Convex has separate "development" and "production" deployments. This script writes to
 *   whichever deployment URL is in NEXT_PUBLIC_CONVEX_URL. Your local app also uses that
 *   same env var. So: run the migration while .env.local has the URL you use for local dev
 *   (e.g. the dev deployment URL that convex dev writes). If you migrated to a different
 *   URL (e.g. prod), set NEXT_PUBLIC_CONVEX_URL in .env.local to that URL to see data locally.
 *
 * This script:
 *   - Reads all data from the existing Neon PostgreSQL database
 *   - Inserts it into Convex using the ConvexHttpClient
 *   - Maintains ID mappings between old serial IDs and new Convex IDs
 *   - Inserts in dependency order: movies -> artists -> favorites -> join tables -> user data
 */

import { config } from 'dotenv'
import pg from 'pg'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../convex/_generated/api'
import { Id } from '../convex/_generated/dataModel'

config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URL!
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL!

if (!DATABASE_URL) {
  console.error('DATABASE_URL is required in .env.local')
  process.exit(1)
}

if (!CONVEX_URL) {
  console.error('NEXT_PUBLIC_CONVEX_URL is required in .env.local')
  process.exit(1)
}

// Use explicit sslmode to avoid pg SSL semantics warning (verify-full = strict cert verification)
const connectionString = DATABASE_URL.includes('sslmode=')
  ? DATABASE_URL.replace(/sslmode=[^&]+/, 'sslmode=verify-full')
  : DATABASE_URL + (DATABASE_URL.includes('?') ? '&' : '?') + 'sslmode=verify-full'
const pool = new pg.Pool({ connectionString })
const convex = new ConvexHttpClient(CONVEX_URL)

const movieIdMap = new Map<number, Id<'movies'>>()
const artistIdMap = new Map<number, Id<'artists'>>()
const favoriteIdMap = new Map<number, Id<'favorites'>>()

async function migrateMovies() {
  console.log('Migrating movies...')
  const { rows } = await pool.query('SELECT * FROM movies ORDER BY id')

  for (const row of rows) {
    const convexId = await convex.mutation(api.migration.insertMovie, {
      name: row.name,
      overview: row.overview || '',
      releaseDate: row.release_date
        ? new Date(row.release_date).toISOString()
        : new Date().toISOString(),
      posterUrl: row.poster_url || undefined,
      slug: row.slug,
      director: row.director || 'Unknown',
      country: row.country || 'US',
      genres: row.genres || [],
      letterboxdUrl: row.letterboxd_url || undefined,
      legacyId: row.id,
    })

    movieIdMap.set(row.id, convexId)
  }

  console.log(`  Migrated ${rows.length} movies`)
}

async function migrateArtists() {
  console.log('Migrating artists...')
  const { rows } = await pool.query('SELECT * FROM artists ORDER BY id')

  for (const row of rows) {
    const convexId = await convex.mutation(api.migration.insertArtist, {
      name: row.name,
      role: row.role,
      headshotUrl: row.headshot_url || undefined,
      slug: row.slug,
      legacyId: row.id,
    })

    artistIdMap.set(row.id, convexId)
  }

  console.log(`  Migrated ${rows.length} artists`)
}

async function migrateFavorites() {
  console.log('Migrating favorites...')
  const { rows } = await pool.query('SELECT * FROM favorites ORDER BY id')

  for (const row of rows) {
    const convexId = await convex.mutation(api.migration.insertFavorite, {
      name: row.name,
      likes: Number(row.likes) || 0,
      publishingDate: row.publishing_date
        ? new Date(row.publishing_date).toISOString()
        : new Date().toISOString(),
      videoUrl:
        row.video_url ||
        'https://www.youtube.com/playlist?list=PL5aexARLijfUCryhTPUxTlCo5MIkwqTBA',
      slug: row.slug,
      category: row.category || 'overall',
      featuredCategory: row.featured_category || undefined,
      legacyId: row.id,
    })

    favoriteIdMap.set(row.id, convexId)
  }

  console.log(`  Migrated ${rows.length} favorites`)
}

async function migrateMoviesToFavorites() {
  console.log('Migrating movies_to_favorites...')
  const { rows } = await pool.query('SELECT * FROM movies_to_favorites')

  let migrated = 0
  for (const row of rows) {
    const movieId = movieIdMap.get(row.movie_id)
    const favoriteId = favoriteIdMap.get(row.favorite_id)

    if (!movieId || !favoriteId) {
      console.warn(
        `  Skipping movies_to_favorites: movie_id=${row.movie_id} favorite_id=${row.favorite_id} (missing mapping)`
      )
      continue
    }

    await convex.mutation(api.migration.insertMovieToFavorite, {
      movieId,
      favoriteId,
    })
    migrated++
  }

  console.log(`  Migrated ${migrated}/${rows.length} movie-favorite links`)
}

async function migrateArtistsToFavorites() {
  console.log('Migrating artists_to_favorites...')
  const { rows } = await pool.query('SELECT * FROM artists_to_favorites')

  let migrated = 0
  for (const row of rows) {
    const artistId = artistIdMap.get(row.artist_id)
    const favoriteId = favoriteIdMap.get(row.favorite_id)

    if (!artistId || !favoriteId) {
      console.warn(
        `  Skipping artists_to_favorites: artist_id=${row.artist_id} favorite_id=${row.favorite_id} (missing mapping)`
      )
      continue
    }

    await convex.mutation(api.migration.insertArtistToFavorite, {
      artistId,
      favoriteId,
    })
    migrated++
  }

  console.log(`  Migrated ${migrated}/${rows.length} artist-favorite links`)
}

async function migrateUserMovies() {
  console.log('Migrating user_movies...')
  const { rows } = await pool.query('SELECT * FROM user_movies ORDER BY id')

  let migrated = 0
  for (const row of rows) {
    const movieId = movieIdMap.get(row.movie_id)

    if (!movieId) {
      console.warn(
        `  Skipping user_movie: movie_id=${row.movie_id} (missing mapping)`
      )
      continue
    }

    await convex.mutation(api.migration.insertUserMovie, {
      userId: row.user_id,
      movieId,
      position: row.position,
    })
    migrated++
  }

  console.log(`  Migrated ${migrated}/${rows.length} user movies`)
}

async function migrateUserLikes() {
  console.log('Migrating user_likes...')
  const { rows } = await pool.query('SELECT * FROM user_likes')

  let migrated = 0
  for (const row of rows) {
    const favoriteId = favoriteIdMap.get(row.favorite_id)

    if (!favoriteId) {
      console.warn(
        `  Skipping user_like: favorite_id=${row.favorite_id} (missing mapping)`
      )
      continue
    }

    await convex.mutation(api.migration.insertUserLike, {
      userId: row.user_id,
      favoriteId,
    })
    migrated++
  }

  console.log(`  Migrated ${migrated}/${rows.length} user likes`)
}

async function main() {
  console.log('Starting migration from Neon to Convex...')
  console.log('')

  try {
    await migrateMovies()
    await migrateArtists()
    await migrateFavorites()
    await migrateMoviesToFavorites()
    await migrateArtistsToFavorites()
    await migrateUserMovies()
    await migrateUserLikes()

    console.log('')
    console.log('Migration complete!')
    console.log(`  Movies: ${movieIdMap.size}`)
    console.log(`  Artists: ${artistIdMap.size}`)
    console.log(`  Favorites: ${favoriteIdMap.size}`)
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

main()

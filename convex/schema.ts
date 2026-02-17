import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'
import { authTables } from '@convex-dev/auth/server'

const artistRoles = v.union(
  v.literal('actor'),
  v.literal('director'),
  v.literal('producer'),
  v.literal('writer'),
  v.literal('composer'),
  v.literal('costume'),
  v.literal('musician'),
  v.literal('cinematographer'),
  v.literal('fictional'),
  v.literal('critic')
)

const favoritesCategories = v.union(
  v.literal('horror'),
  v.literal('family'),
  v.literal('western'),
  v.literal('overall')
)

const featuredCategories = v.union(
  v.literal('oscar_winners'),
  v.literal('old_directors'),
  v.literal('new_directors'),
  v.literal('new_stars'),
  v.literal('old_stars')
)

export default defineSchema({
  ...authTables,

  movies: defineTable({
    name: v.string(),
    overview: v.string(),
    releaseDate: v.string(),
    posterUrl: v.optional(v.string()),
    slug: v.string(),
    director: v.string(),
    country: v.string(),
    genres: v.optional(v.array(v.string())),
    letterboxdUrl: v.optional(v.string()),
    legacyId: v.optional(v.number()),
  })
    .index('by_slug', ['slug'])
    .index('by_name', ['name'])
    .index('by_director', ['director'])
    .searchIndex('search_name', { searchField: 'name' }),

  artists: defineTable({
    name: v.string(),
    role: artistRoles,
    headshotUrl: v.optional(v.string()),
    slug: v.string(),
    legacyId: v.optional(v.number()),
  })
    .index('by_slug', ['slug'])
    .index('by_role', ['role']),

  favorites: defineTable({
    name: v.string(),
    likes: v.number(),
    publishingDate: v.string(),
    videoUrl: v.string(),
    slug: v.string(),
    category: favoritesCategories,
    featuredCategory: v.optional(featuredCategories),
    legacyId: v.optional(v.number()),
  })
    .index('by_slug', ['slug'])
    .index('by_publishing_date', ['publishingDate'])
    .index('by_featured_category', ['featuredCategory'])
    .index('by_category', ['category'])
    .searchIndex('search_name', { searchField: 'name' }),

  userMovies: defineTable({
    userId: v.string(),
    movieId: v.id('movies'),
    position: v.number(),
  })
    .index('by_user', ['userId'])
    .index('by_user_movie', ['userId', 'movieId'])
    .index('by_user_position', ['userId', 'position']),

  userLikes: defineTable({
    userId: v.string(),
    favoriteId: v.id('favorites'),
  })
    .index('by_user', ['userId'])
    .index('by_user_favorite', ['userId', 'favoriteId'])
    .index('by_favorite', ['favoriteId']),

  moviesToFavorites: defineTable({
    movieId: v.id('movies'),
    favoriteId: v.id('favorites'),
  })
    .index('by_movie', ['movieId'])
    .index('by_favorite', ['favoriteId']),

  artistsToFavorites: defineTable({
    artistId: v.id('artists'),
    favoriteId: v.id('favorites'),
  })
    .index('by_artist', ['artistId'])
    .index('by_favorite', ['favoriteId']),
})

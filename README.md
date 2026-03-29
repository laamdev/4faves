# 4faves 🎬

A curated collection of Letterboxd's 4faves celebrity picks, where
renowned filmmakers, actors, and critics share their all-time favorite movies.
Inspired by this concept, users can also create and share their own personal
4faves lists, making it a growing community of film enthusiasts and
their most cherished movies.

## ✨ Features

- **Celebrity Lists**: Browse through Letterboxd's collection of 4faves
  from famous filmmakers, actors, and critics
- **Personal Collections**: Create and share your own 4faves movie list
- **Movie Search**: Powered by TMDB API for comprehensive movie data
- **User Authentication**: Secure authentication with Convex Auth
- **Responsive Design**: Beautiful, modern UI that works across all devices
- **Social Features**: Like and share favorite lists from other users
- **Advanced Filtering**: Sort and filter lists by various criteria (role, name,
  publishing date)
- **Real-time Updates**: Instant updates using Next.js server actions
- **Beautiful Animations**: Smooth transitions and interactions using Framer
  Motion

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with
  [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL ([Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Convex Auth](https://www.convex.dev/auth)
- **UI/UX**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [Embla Carousel](https://www.embla-carousel.com/)
  - [Phosphor Icons](https://phosphoricons.com/)
- **Development**:
  - TypeScript
  - ESLint
  - Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- PostgreSQL database (or Neon account)
- TMDB API key
- Google OAuth

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/4faves.git
   cd 4faves
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Set up environment variables: Create a `.env.local` file with the following
   variables:

   ```env
   # Database
   DATABASE_URL=your_database_url

   # TMDB API
   TMDB_READ_TOKEN=your_tmdb_api_token
   ```

4. Initialize the database:

   ```bash
   bun run generate   # Generate migrations
   bun run push      # Push to database
   ```

5. Start the development server:
   ```bash
   bun run dev
   ```

Visit `http://localhost:3000` to see the application running.

## 📦 Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run generate` - Generate Drizzle migrations
- `bun run push` - Push migrations to database
- `bun run studio` - Open Drizzle Studio

## 🔑 Environment Variables

| Variable                   | Description                                      |
| -------------------------- | ------------------------------------------------ |
| `DATABASE_URL`             | PostgreSQL connection string (for migration)     |
| `NEXT_PUBLIC_CONVEX_URL`   | Convex deployment URL (dev and prod differ)      |
| `TMDB_READ_TOKEN`          | TMDB API read access token                      |

## 🔧 Troubleshooting

### No movie data in local dev after migration

Convex uses **two deployments**: development and production. The migration script writes to whichever deployment URL is in `NEXT_PUBLIC_CONVEX_URL` when you run it. Your local app also reads that same variable.

- If you ran the migration **before** or **without** `npx convex dev`, `.env.local` might have pointed at **production**. Later, `npx convex dev` can overwrite `.env.local` with the **development** URL, so the app talks to the dev deployment (which has no data).
- **Fix:** Use the deployment that has the data.
  1. Open the [Convex dashboard](https://dashboard.convex.dev/) and check **Settings** or **Data** for each deployment (dev vs prod) to see which one has the migrated data.
  2. Copy that deployment’s URL (e.g. `https://exuberant-impala-741.eu-west-1.convex.cloud`).
  3. Set `NEXT_PUBLIC_CONVEX_URL` in `.env.local` to that exact URL.
  4. Restart `pnpm dev` (and keep `npx convex dev` running if you use it).

Alternatively, run the migration **after** starting `npx convex dev` so `.env.local` already has the dev URL; then the migration will write to the same deployment your local app uses.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie database
- [Letterboxd](https://letterboxd.com/) for the inspiration
- All the amazing open-source libraries that made this project possible

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
- **User Authentication**: Secure authentication with Clerk + Convex Auth
- **Responsive Design**: Beautiful, modern UI that works across all devices
- **Social Features**: Like and share favorite lists from other users
- **Advanced Filtering**: Sort and filter lists by various criteria (role, name,
  publishing date)
- **Real-time Updates**: Powered by Convex's reactive queries
- **Beautiful Animations**: Smooth transitions and interactions using Framer
  Motion

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with
  [shadcn/ui](https://ui.shadcn.com/)
- **Backend**: [Convex](https://www.convex.dev/) (database, real-time queries,
  server functions)
- **Authentication**: [Clerk](https://clerk.com/) + [Convex Auth](https://www.convex.dev/auth)
- **Email**: [Resend](https://resend.com/) via `@convex-dev/resend`
- **File Storage**: Cloudflare R2 via `@convex-dev/r2`
- **UI/UX**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [Embla Carousel](https://www.embla-carousel.com/)
  - [Phosphor Icons](https://phosphoricons.com/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics) + [Speed Insights](https://vercel.com/docs/speed-insights)
- **Development**:
  - TypeScript
  - ESLint
  - Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- [Convex](https://www.convex.dev/) account
- TMDB API key
- [Clerk](https://clerk.com/) account

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/4faves.git
   cd 4faves
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables: Create a `.env.local` file with the following
   variables:

   ```env
   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

   # TMDB API
   TMDB_READ_TOKEN=your_tmdb_api_token
   ```

4. Start the Convex dev server (in a separate terminal):

   ```bash
   npx convex dev
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

Visit `http://localhost:3000` to see the application running.

## 📦 Scripts

- `pnpm dev` - Start Next.js development server (with Turbopack)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm convex:dev` - Start Convex dev server
- `pnpm convex:deploy` - Deploy Convex functions to production

## 🔑 Environment Variables

| Variable                 | Description                                 |
| ------------------------ | ------------------------------------------- |
| `NEXT_PUBLIC_CONVEX_URL` | Convex deployment URL (dev and prod differ) |
| `TMDB_READ_TOKEN`        | TMDB API read access token                  |

## 🔧 Troubleshooting

### No movie data in local dev after migration

Convex uses **two deployments**: development and production. The migration script writes to whichever deployment URL is in `NEXT_PUBLIC_CONVEX_URL` when you run it. Your local app also reads that same variable.

- If you ran the migration **before** or **without** `npx convex dev`, `.env.local` might have pointed at **production**. Later, `npx convex dev` can overwrite `.env.local` with the **development** URL, so the app talks to the dev deployment (which has no data).
- **Fix:** Use the deployment that has the data.
  1. Open the [Convex dashboard](https://dashboard.convex.dev/) and check **Settings** or **Data** for each deployment (dev vs prod) to see which one has the migrated data.
  2. Copy that deployment's URL (e.g. `https://exuberant-impala-741.eu-west-1.convex.cloud`).
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

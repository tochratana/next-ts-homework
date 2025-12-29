# Next.js Blog Application

A modern blog application built with Next.js 16, React 19, and shadcn UI components.

## Features

- 🚀 React 19's `use()` hook for data fetching
- 🌓 Dark/light mode toggle with next-themes
- 🎨 Modern UI with shadcn components
- 📱 Fully responsive design
- 💬 Blog posts with comments
- ⚡ Built with Next.js 16 and TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Routes

- **Blog Listing**: `/dashboard/blog` - View all blog posts in a grid layout
- **Blog Detail**: `/dashboard/blog/[id]` - View individual post with comments

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | API base URL for fetching posts and comments | `https://jsonplaceholder.typicode.com` |

## Tech Stack

- **Framework**: Next.js 16
- **React**: 19.2.3
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Theme**: next-themes
- **TypeScript**: 5+
- **Icons**: lucide-react

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── blog/
│   │       ├── page.tsx          # Blog listing
│   │       └── [slug]/
│   │           └── page.tsx      # Blog detail
│   ├── layout.tsx                # Root layout with ThemeProvider
│   └── globals.css               # Global styles
├── components/
│   ├── ui/                       # shadcn components
│   ├── blog-card.tsx             # Blog post card
│   ├── comment-card.tsx          # Comment card
│   └── theme-provider.tsx        # Theme provider wrapper
└── lib/
    ├── data/
    │   └── data.ts               # Data fetching functions
    ├── types/
    │   └── blog.ts               # TypeScript types
    └── utils.ts                  # Utility functions
```

## Features in Detail

### React 19 `use()` Hook

This app demonstrates React 19's new `use()` hook for handling promises:

```typescript
function BlogList() {
  const posts = use(fetchPosts());
  // ...
}
```

### Dark Mode

Toggle between light and dark themes using the sun/moon button in the top right. Theme preference is persisted in localStorage.

### Responsive Design

- Mobile: Single column layout
- Tablet: 2 column grid
- Desktop: 3 column grid

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT

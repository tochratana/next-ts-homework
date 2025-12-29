# Environment Variables Setup

This project uses environment variables for configuration.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the JSONPlaceholder API | No | `https://jsonplaceholder.typicode.com` |

## Setup Instructions

1. Copy the example configuration:
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com" > .env.local
   ```

2. The `.env.local` file is gitignored and will not be committed to version control

3. Restart your development server after making changes to environment variables

## Notes

- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- The API base URL can be changed to point to a different backend if needed
- The application will use the default value if the environment variable is not set

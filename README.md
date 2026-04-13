# Bookipi Quiz Maker — Frontend

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```

## Run Locally

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Backend

The frontend connects to the backend at `http://localhost:4000` by default (configured in `frontend/src/entities/quiz/api/client.ts`).

Start the backend first — see `backend/README.md` for instructions.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest unit tests |
| `npm run lint` | ESLint + FSD architecture linter |
| `npm run storybook` | Start Storybook on port 6006 |

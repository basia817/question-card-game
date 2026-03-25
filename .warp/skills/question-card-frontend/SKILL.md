---
name: question-card-frontend
description: Guide for building the React frontend of the Question Card Game app. Use this skill when working on anything in the `client/` directory — creating components (CategorySelector, Navbar, Card, CardGrid, ResetButton), setting up routing, managing game state, integrating with the API service, or configuring Tailwind CSS.
---

# Question Card Game — Frontend

The frontend is a React 18 + Vite app in `client/`. The placeholder `App.jsx` needs to be replaced with the full game UI. See `references/frontend-tasks.md` for the complete task list.

## Key conventions

- All `fetch` calls must go through `src/services/api.js` — never call `fetch` directly from a component.
- Module format is ESM (`import`/`export`) throughout `client/`.
- The Vite dev server proxies `/api/*` to `http://localhost:3001`, so API calls use relative paths.
- State (`category`, `questions`, `flippedCards`, `loading`, `error`) lives in `GamePage`; `flippedCards` is a `Set<number>`.
- Category query param format: `/game?category=couples`.

## Components summary

| Component | Location | Responsibility |
|-----------|----------|----------------|
| `CategorySelector` | `src/components/` | Pick couples / friends / family |
| `Navbar` | `src/components/` | Title + back-to-home link |
| `Card` | `src/components/` | Flip animation, ARIA labels, keyboard nav |
| `CardGrid` | `src/components/` | Responsive grid of Cards |
| `ResetButton` | `src/components/` | Clear flipped state |
| `HomePage` | `src/pages/` | Route `/` |
| `GamePage` | `src/pages/` | Route `/game`, owns all state |

## Detailed task reference

Read `references/frontend-tasks.md` for dependency install commands, routing setup, per-component prop contracts, full state table, and non-functional requirements.
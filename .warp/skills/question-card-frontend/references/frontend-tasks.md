# Frontend Tasks

## Current State

`client/src/App.jsx` is the default Vite template — a placeholder with a counter button. The only real frontend work done is `src/services/api.js`, which already implements `fetchQuestions(category)`. Everything else needs to be built.

## Dependencies to Install

```bash
npm install react-router-dom     # client-side routing
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p          # generates tailwind.config.js and postcss.config.js
```

Update `tailwind.config.js` to include `./src/**/*.{js,jsx}` in the `content` array, then add the Tailwind directives to `src/index.css`.

## Routing Setup

Install `react-router-dom` and wrap `<App />` in `<BrowserRouter>` inside `src/main.jsx`. Define two routes in `App.jsx`:

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `HomePage` | Category selection screen |
| `/game` | `GamePage` | Card grid screen |

Pass the selected category as a query parameter: `/game?category=couples`.

## Components to Build

### `CategorySelector`
- Renders three buttons: **Couples**, **Friends**, **Family**
- Highlights the currently selected category
- On selection, updates `category` state in the parent

### `Navbar`
- Displays the app title
- Includes a link/button to return to `/` (category selector)

### `Card`
- Receives `{ id, text, isFlipped }` props
- Renders a front face (decorative / face-down) and a back face (question text)
- CSS flip animation triggered when `isFlipped` is `true`
- Must be keyboard-navigable (`tabIndex`, `onKeyDown` handler for Enter/Space)
- Add `aria-label` describing the card state (e.g. "Question card, press to reveal")

### `CardGrid`
- Receives the `questions` array and `flippedCards` Set
- Renders a responsive CSS grid of `<Card>` components
- Passes a `onFlip(id)` callback down to each card

### `ResetButton`
- Clears `flippedCards` (unflips all cards) or navigates back to `/`

## State Management

All state lives in `GamePage` (or a context if shared across pages):

| Key | Type | Initial Value |
|-----|------|---------------|
| `category` | `string` | read from URL query param |
| `questions` | `array` | `[]` |
| `flippedCards` | `Set<number>` | `new Set()` |
| `loading` | `boolean` | `true` |
| `error` | `string \| null` | `null` |

On mount, `GamePage` calls `fetchQuestions(category)` from `src/services/api.js` and populates `questions`. Show a loading indicator while fetching and an error message if the request fails.

## API Integration

All backend calls must go through `src/services/api.js`. Do not call `fetch` directly from components. If new endpoints are needed (e.g. POST to add a question), add a new exported function to `api.js`.

## Non-Functional Requirements

- **Mobile-first:** Design for small screens first; use Tailwind's responsive prefixes (`sm:`, `md:`) to expand for larger screens.
- **Accessibility:** All interactive elements must be reachable by keyboard. Cards need ARIA labels. Use semantic HTML (`<button>`, `<main>`, `<nav>`).
- **Performance:** Questions should render in under 500 ms. Avoid unnecessary re-renders by memoising callbacks with `useCallback` where appropriate.

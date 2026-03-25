# Testing Tasks

## Current State

Neither `client/` nor `server/` has a test framework installed or any test files. Both packages need testing infrastructure set up from scratch.

---

## Server Tests (Unit + Integration)

### Setup

Install Jest and Supertest in `server/`:

```bash
npm install -D jest supertest
```

Add to `server/package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch"
},
"jest": {
  "testEnvironment": "node"
}
```

### What to test

#### Service layer (`server/services/questionsService.js`)

Unit-test the service in isolation by mocking `server/data/db.js` with `jest.mock`.

| Test case | Assertion |
|-----------|-----------|
| `getQuestions()` with no category | Returns all questions |
| `getQuestions('couples')` | Returns only `couples` questions |
| `getQuestions()` | Result is shuffled (different order across calls — test randomness is present, not exact order) |
| `getQuestions()` with 25 seeded questions | Returns at most 20 |
| `createQuestion(category, text)` | Calls `db.insert` and returns the new object |
| `deleteQuestion(id)` | Calls `db.remove` with the correct id |

#### API routes (integration, `server/routes/questions.js`)

Use Supertest to send real HTTP requests against the Express app. Export the `app` object from `server/index.js` without calling `.listen()` so tests can import it directly.

| Test case | Expected status | Expected body |
|-----------|-----------------|---------------|
| `GET /api/questions` | `200` | Array of all questions |
| `GET /api/questions?category=friends` | `200` | Array filtered to `friends` |
| `GET /api/questions?category=invalid` | `200` | Empty array |
| `POST /api/questions` valid body | `201` | New question object with `id` |
| `POST /api/questions` missing `text` | `400` | Error message |
| `POST /api/questions` invalid `category` | `400` | Error message |
| `DELETE /api/questions/:id` valid id | `204` | Empty body |

---

## Client Tests (Unit + Component)

### Setup

Vitest is the natural choice for a Vite project. Install it along with React Testing Library:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

Update `vite.config.js` to add a `test` block:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
  // ...existing server proxy config
})
```

Create `src/setupTests.js`:

```js
import '@testing-library/jest-dom'
```

Add to `client/package.json`:

```json
"scripts": {
  "test": "vitest",
  "test:run": "vitest run"
}
```

### What to test

#### `src/services/api.js`

Mock the global `fetch` with `vi.stubGlobal` and verify:
- `fetchQuestions()` calls `GET /api/questions`
- `fetchQuestions('family')` calls `GET /api/questions?category=family`
- Throws an error when the response is not `ok`

#### `Card` component

| Test case | Assertion |
|-----------|-----------|
| Renders face-down by default | Back-face text is not visible; front face is present |
| Flips on click | Question text becomes visible after click |
| Flips on Enter / Space keydown | Keyboard accessibility works |
| Has correct `aria-label` | Accessible name reflects flipped state |

#### `CategorySelector` component

- Renders buttons for all three categories
- Clicking a button calls the `onSelect` callback with the correct category string
- The selected category button receives a distinct style/class

#### `CardGrid` component

- Renders the correct number of `Card` components for the given questions array
- Passes `isFlipped` correctly based on the `flippedCards` Set

#### `GamePage`

Mock `src/services/api.js` with `vi.mock`. Verify:
- Shows a loading state while the fetch is in progress
- Renders cards after the fetch resolves
- Shows an error message when the fetch rejects

---

## End-to-End Tests (Optional / Future)

Once both the frontend and backend are working, consider adding E2E tests with **Playwright**:

```bash
npm init playwright@latest   # run from repo root
```

Key user flows to cover:
1. Landing on `/`, selecting a category, and clicking "Start Game" navigates to `/game`
2. The card grid renders with face-down cards
3. Clicking a card flips it and reveals the question text
4. The Reset button unflips all cards

---

## Running All Tests

```bash
# Server
cd server && npm test

# Client
cd client && npm run test:run
```

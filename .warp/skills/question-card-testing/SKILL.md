---
name: question-card-testing
description: Guide for setting up and writing tests for the Question Card Game app. Use this skill when adding tests to either `client/` or `server/` — installing test frameworks, writing unit/component/integration tests, or setting up end-to-end tests with Playwright. Neither package currently has a test framework installed.
---

# Question Card Game — Testing

No test framework is installed in either package yet. Setup is required before writing any tests.

## Toolchain

| Package | Framework | Why |
|---------|-----------|-----|
| `server/` | Jest + Supertest | CommonJS-native, no config needed |
| `client/` | Vitest + React Testing Library | Built into Vite ecosystem |
| E2E (optional) | Playwright | Full browser, both routes |

## Quick setup commands

```bash
# server/
npm install -D jest supertest

# client/
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

## Critical notes

- For Supertest integration tests, export `app` from `server/index.js` **without** calling `.listen()`. The test file imports the app and Supertest binds a port itself.
- For Vitest, add a `test` block to `vite.config.js` (`environment: 'jsdom'`, `globals: true`, `setupFiles: './src/setupTests.js'`).
- Mock `src/services/api.js` with `vi.mock` in `GamePage` tests — do not let tests hit the real server.
- Mock `server/data/db.js` with `jest.mock` in service-layer unit tests.

## Detailed task reference

Read `references/testing-tasks.md` for the full package.json changes, vite.config.js snippet, per-component test case tables, and E2E flow list.
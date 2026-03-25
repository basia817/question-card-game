---
name: question-card-backend
description: Guide for completing and improving the Node.js/Express backend of the Question Card Game app. Use this skill when working on anything in the `server/` directory — adding shuffle/limit logic, input validation, error middleware, environment variables, or migrating from the in-memory store to PostgreSQL.
---

# Question Card Game — Backend

The Express server is in `server/` and is mostly functional. Module format is CommonJS (`require`/`module.exports`). The architecture is strictly layered: `routes` -> `controllers` -> `services` -> `data/db.js`. Do not skip layers.

## What still needs to be done

1. **Shuffle + cap** results in `services/questionsService.js` (max 20 per response)
2. **Validate** POST body in `controllers/questionsController.js` (category enum, non-empty text -> 400 on failure)
3. **Error middleware** at the bottom of `index.js`; controllers call `next(err)` on failure
4. **Move hardcoded values** (port `3001`, CORS origin `http://localhost:5173`) to a `.env` file via `dotenv`
5. **PostgreSQL migration** when ready — only `server/data/db.js` changes; service/controller layers stay the same

## Data layer boundary

`server/data/db.js` exposes exactly three functions: `getAll()`, `insert({ category, text })`, `remove(id)`. This interface must be preserved when swapping to PostgreSQL so that the service layer requires no changes.

## Detailed task reference

Read `references/backend-tasks.md` for exact code snippets (error handler, .env setup), the full PostgreSQL migration steps, and the complete API endpoint table.
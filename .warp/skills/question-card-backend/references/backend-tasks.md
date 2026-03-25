# Backend Tasks

## Current State

The Express server is functional with a working layered architecture (route → controller → service → data). The three endpoints (GET, POST, DELETE `/api/questions`) are implemented and connected to an in-memory JSON store in `server/data/db.js`. The following items are missing or incomplete.

## Short-Term: Complete the In-Memory MVP

### 1. Shuffle and limit results

`server/services/questionsService.js` currently returns questions in insertion order with no cap. Per the spec, `getQuestions` should:
- Shuffle the filtered array before returning (Fisher-Yates or `sort(() => Math.random() - 0.5)`)
- Cap the response at **20 questions**

### 2. Input validation

The POST `/api/questions` handler accepts any body. Add validation in the controller before calling the service:
- `category` must be one of `couples`, `friends`, `family`
- `text` must be a non-empty string
- Return `400` with a descriptive message if either check fails

### 3. Error handling middleware

Add a centralised Express error handler at the bottom of `server/index.js`:

```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});
```

Controllers should call `next(err)` instead of letting unhandled exceptions crash the process.

### 4. Environment variables

The server currently hardcodes port `3001` and the allowed CORS origin `http://localhost:5173`. Move these to a `.env` file (ignored by git) and read them with `process.env`. Install `dotenv` and call `require('dotenv').config()` at the top of `index.js`.

```bash
npm install dotenv
```

`.env` example:
```
PORT=3001
CLIENT_ORIGIN=http://localhost:5173
```

## Medium-Term: PostgreSQL Migration

The data layer is intentionally isolated in `server/data/db.js`. Only this file needs to change when upgrading to PostgreSQL — the service and controller layers must not be modified.

### Steps

1. **Provision a PostgreSQL database** and note the connection string.
2. **Install the driver:**
   ```bash
   npm install pg
   ```
3. **Create the schema:**
   ```sql
   CREATE TABLE questions (
     id         SERIAL PRIMARY KEY,
     category   VARCHAR(50) NOT NULL CHECK (category IN ('couples', 'friends', 'family')),
     text       TEXT        NOT NULL,
     created_at TIMESTAMP   DEFAULT NOW()
   );
   ```
4. **Seed the database** with the sample data from `SPEC.md`.
5. **Rewrite `server/data/db.js`** to use `pg.Pool` and expose the same three functions (`getAll`, `insert`, `remove`) as async functions. Update the service layer to `await` them.
6. Store the connection string in `.env` as `DATABASE_URL` and never commit it.

## API Reference (as implemented)

| Method | Path | Success | Body / Params |
|--------|------|---------|---------------|
| GET | `/api/questions` | `200` array | — |
| GET | `/api/questions?category=<cat>` | `200` array | query: `couples \| friends \| family` |
| POST | `/api/questions` | `201` object | `{ category, text }` |
| DELETE | `/api/questions/:id` | `204` empty | path param: numeric id |

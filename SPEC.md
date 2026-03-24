# Question Card Game App — Specification

## Overview
A web-based card game where users select a category and are presented with a grid of face-down question cards. Clicking a card flips it to reveal a question. Designed for social settings (couples, friends, family).

---

## Tech Stack

| Layer      | Technology                  |
|------------|-----------------------------|
| Frontend   | React (Vite or CRA)         |
| Backend    | Node.js + Express           |
| Database   | PostgreSQL (or JSON flat file for MVP) |
| Styling    | TailwindCSS (recommended)   |
| API Format | REST / JSON                 |

---

## Frontend

### Pages

#### `/` — Home
- Display category selector (Couples, Friends, Family)
- "Start Game" button to navigate to `/game?category=<selected>`

#### `/game` — Game
- Fetch questions for selected category from API
- Render a grid of face-down cards
- On click: flip card to reveal the question
- Option to reset / pick new category

### Components

| Component          | Description                                              |
|--------------------|----------------------------------------------------------|
| `CategorySelector` | Buttons or dropdown to choose a category                |
| `CardGrid`         | Responsive grid layout containing all cards             |
| `Card`             | Individual card with flip animation (front/back)        |
| `Navbar`           | App title and navigation                                 |
| `ResetButton`      | Resets the game state (unflips cards or fetches new set)|

### State Management
Managed via React `useState` / `useReducer` (or Zustand/Redux if complexity grows):

| State Key       | Type       | Description                              |
|-----------------|------------|------------------------------------------|
| `category`      | `string`   | Currently selected category              |
| `questions`     | `array`    | List of question objects from API        |
| `flippedCards`  | `Set<id>`  | IDs of cards that have been flipped      |
| `loading`       | `boolean`  | Whether questions are being fetched      |
| `error`         | `string`   | Error message if fetch fails             |

### API Service (`/src/services/api.js`)
```js
GET /api/questions?category=couples
```
Returns array of question objects for the selected category.

---

## Backend

### Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Port:** `3001` (default)

### API Endpoints

| Method | Endpoint                       | Description                          |
|--------|--------------------------------|--------------------------------------|
| GET    | `/api/questions`               | Get all questions                    |
| GET    | `/api/questions?category=:cat` | Get questions filtered by category   |
| POST   | `/api/questions`               | Add a new question (admin use)       |
| DELETE | `/api/questions/:id`           | Delete a question by ID (admin use)  |

### Folder Structure
```
server/
├── index.js              # Entry point
├── routes/
│   └── questions.js      # Question routes
├── controllers/
│   └── questionsController.js
├── services/
│   └── questionsService.js
└── data/
    └── db.js             # DB connection or JSON loader
```

### Business Logic (Service Layer)
- Filter questions by category
- Shuffle questions before returning (optional)
- Limit response count (e.g. max 20 cards per game)

---

## Database

### Option A: PostgreSQL

#### Table: `questions`

| Column       | Type         | Constraints              |
|--------------|--------------|--------------------------|
| `id`         | SERIAL       | PRIMARY KEY              |
| `category`   | VARCHAR(50)  | NOT NULL                 |
| `text`       | TEXT         | NOT NULL                 |
| `created_at` | TIMESTAMP    | DEFAULT NOW()            |

#### Valid Categories
- `couples`
- `friends`
- `family`

#### Sample Seed Data
```sql
INSERT INTO questions (category, text) VALUES
  ('couples', 'What is your favorite memory of us?'),
  ('friends', 'What is something you have never told me?'),
  ('family',  'What family tradition means the most to you?');
```

### Option B: JSON Flat File (MVP / No DB)
```json
[
  { "id": 1, "category": "couples", "text": "What is your favorite memory of us?" },
  { "id": 2, "category": "friends", "text": "What is something you have never told me?" },
  { "id": 3, "category": "family",  "text": "What family tradition means the most to you?" }
]
```

---

## User Flow

1. User lands on Home page
2. Selects a category (Couples / Friends / Family)
3. Clicks "Start Game"
4. Frontend sends `GET /api/questions?category=<selected>`
5. Backend queries DB and returns shuffled questions (max 20)
6. Cards render face-down in a grid
7. User clicks a card → it flips to reveal the question
8. User can reset the game or go back to select a new category

---

## Non-Functional Requirements

- **Responsive:** Mobile-first design, works on phones and tablets
- **Performance:** Questions load in < 500ms
- **Accessibility:** Cards keyboard-navigable, ARIA labels on interactive elements
- **Scalability:** DB-backed design allows easy addition of new questions/categories

---

## Future Enhancements

- Timer mode (answer before time runs out)
- Multiplayer / score tracking
- Admin dashboard to add/edit questions
- Animations and sound effects on card flip
- User accounts and saved game history

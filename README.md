# Team Tic-Tac-Toe - Final Presentation

## Team Members
- Backend: [Andrew]
- Frontend: [Aslan]
- Git Manager/PM: [Demian]

---

## Project Overview

Full-stack tic-tac-toe game with:
- Player authentication
- Stats tracking
- Leaderboard
- Persistent data

---

## Tech Stack

### Backend
- Node.js + Express
- SQLite (native)
- JWT authentication
- bcrypt password hashing

### Frontend
- React 19
- React Router
- Context API
- Vite

### Tools
- Git/GitHub
- REST Client
- npm

---

## Demo

### 1. Registration (1 min)
[Show registering new user]

### 2. Login (30 sec)
[Show login flow]

### 3. Game Play (1 min)
[Play a game, show stats update]

### 4. Leaderboard (30 sec)
[Show leaderboard]

### 5. Persistence (30 sec)
[Refresh page, still logged in]

---

## Features Implemented

### Authentication ✅
- User registration with password hashing
- Login with JWT tokens
- Protected routes
- Token persistence
- Logout functionality

### Player Management ✅
- Create players
- Track statistics
- Leaderboard with win rates
- Lookup by ID or name

### Game Logic ✅
- Full tic-tac-toe game
- Win detection
- Draw detection
- Stats update after games

---

## Technical Highlights

### Security
- Passwords hashed with bcrypt (10 rounds)
- JWT tokens for stateless auth
- Protected API endpoints
- CORS configured

### Data Persistence
- SQLite database
- localStorage for tokens
- Stats survive server restart

### User Experience
- Loading states
- Error handling
- Responsive design
- Form validation

---

## Challenges & Solutions

### Challenge 1: CORS
**Problem:** Frontend couldn't connect to backend
**Solution:** Configured CORS middleware with correct origin

### Challenge 2: Password Security
**Problem:** Storing passwords safely
**Solution:** Used bcrypt with salt rounds

### Challenge 3: State Management
**Problem:** Auth state across components
**Solution:** React Context API

---

## Bonus Features Implemented

[If applicable]
- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3

---

## Future Enhancements

- Real-time multiplayer with WebSockets
- Profile pictures
- Friend system
- Tournament mode
- Mobile app

---

## Lessons Learned

### Backend Developer
- JWT authentication flow
- Password hashing best practices
- SQLite schema design
- Protected routes

### Frontend Developer
- React Router
- Context API for global state
- Token management
- Form validation

### Git Manager
- Merge conflict resolution
- Feature branch workflow
- Team coordination
- Integration testing

---

## Thank You!

Questions?
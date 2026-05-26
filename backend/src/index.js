const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Database
const mockGames = [
  { id: '1', title: 'Super Mario Bros', system: 'NES', year: 1985, featured: true },
  { id: '2', title: 'The Legend of Zelda', system: 'NES', year: 1986, featured: true },
  { id: '3', title: 'Super Mario World', system: 'SNES', year: 1990, featured: true },
  { id: '4', title: 'Final Fantasy VI', system: 'SNES', year: 1994, featured: false },
  { id: '5', title: 'Sonic the Hedgehog', system: 'Genesis', year: 1991, featured: true },
  { id: '6', title: 'Mortal Kombat', system: 'Genesis', year: 1993, featured: false },
  { id: '7', title: 'Super Mario 64', system: 'N64', year: 1996, featured: true },
  { id: '8', title: 'The Legend of Zelda: Ocarina of Time', system: 'N64', year: 1998, featured: true },
  { id: '9', title: 'Pokemon Red', system: 'GameBoy', year: 1996, featured: true },
  { id: '10', title: 'Final Fantasy VII', system: 'PS1', year: 1997, featured: true },
];

const mockUsers = {
  'demo@example.com': {
    id: 'user1',
    email: 'demo@example.com',
    password: 'demo123',
    username: 'Gamer',
  },
};

const mockSaves = {};

// Middleware: JWT Authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  // Mock token validation
  try {
    req.user = { id: 'user1', email: 'demo@example.com' };
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { email, password, username } = req.body;

  if (mockUsers[email]) {
    return res.status(400).json({ message: 'User already exists' });
  }

  mockUsers[email] = { id: 'user' + Date.now(), email, password, username };

  res.json({
    user: { id: mockUsers[email].id, email, username },
    token: 'mock-jwt-token',
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = mockUsers[email];

  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    user: { id: user.id, email: user.email, username: user.username },
    token: 'mock-jwt-token',
  });
});

// Game Routes
app.get('/api/games', (req, res) => {
  const { system, search } = req.query;
  let games = mockGames;

  if (system) {
    games = games.filter(g => g.system === system);
  }

  if (search) {
    games = games.filter(g =>
      g.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({ games });
});

app.get('/api/games/featured', (req, res) => {
  const featured = mockGames.filter(g => g.featured);
  res.json({ games: featured });
});

app.get('/api/games/:id', (req, res) => {
  const game = mockGames.find(g => g.id === req.params.id);
  if (!game) return res.status(404).json({ message: 'Game not found' });
  res.json({ game });
});

// Save Routes
app.get('/api/saves/:gameId', authenticateToken, (req, res) => {
  const saves = mockSaves[req.params.gameId] || [];
  res.json({ saves });
});

app.post('/api/saves', authenticateToken, (req, res) => {
  const { gameId, data } = req.body;
  if (!mockSaves[gameId]) mockSaves[gameId] = [];

  const save = {
    id: 'save' + Date.now(),
    gameId,
    data,
    timestamp: new Date(),
  };

  mockSaves[gameId].push(save);
  res.json({ save });
});

// Profile Routes
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      username: 'Gamer',
      playtime: 156,
      gamesPlayed: 42,
    },
  });
});

app.put('/api/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Profile updated', user: req.body });
});

app.get('/api/profile/progress', authenticateToken, (req, res) => {
  res.json({
    progress: {
      level: 5,
      xp: 2500,
      achievements: 18,
      playtime: 156,
    },
  });
});

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎮 Cloud Gaming Emulator Backend running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

module.exports = app;

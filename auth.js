const jwt = require('jsonwebtoken'); // Used to create and verify JWT tokens
const bcrypt = require('bcrypt'); // Used to hash and compare passwords securely
const db = require('./db'); // database connection

const JWT_SECRET = 'your_jwt_secret'; // Secret key for signing tokens (normally stored securely)


function registerUser(req, res) {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(sql, [username, email, hashedPassword], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Registration error', error: err });
    }
    res.json({ message: 'User registered successfully' });
  });
}


function loginUser(req, res) {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
}


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}


function getUserStats(req, res) {
  const userId = req.user.id;

  const sql = 'SELECT wins, losses FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching stats', error: err });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
}


function getRanking(req, res) {
  const sql = 'SELECT id, username, wins FROM users ORDER BY wins DESC LIMIT 10';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching ranking', error: err });
    }

    res.json(results);
  });
}

function updatePreferences(req, res) {
  const { preferred_game, skill_level, region } = req.body;
  const userId = req.user.id;

  const sql = 'REPLACE INTO matchmaking_preferences (user_id, preferred_game, skill_level, region) VALUES (?, ?, ?, ?)';
  db.query(sql, [userId, preferred_game, skill_level, region], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating preferences', error: err });
    }

    res.json({ message: 'Preferences updated successfully' });
  });
}


function getPreferences(req, res) {
  const userId = req.user.id;

  const sql = 'SELECT * FROM matchmaking_preferences WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching preferences', error: err });
    }

    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: 'Preferences not found' });
    }
  });
}

module.exports = {
  registerUser,
  loginUser,
  authenticateToken,
  getUserStats,
  getRanking,
  updatePreferences,
  getPreferences
};

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { registerUser, loginUser, authenticateToken, getUserStats, getRanking, updatePreferences, getPreferences } = require('./auth');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());


app.post('/auth/register', registerUser);
app.post('/auth/login', loginUser);

app.get('/me', authenticateToken, (req, res) => {
  const userId = req.user.id;
  res.json({ message: "Protected route access granted", userId: userId });
});

app.get('/stats', authenticateToken, getUserStats);
app.get('/ranking', getRanking);
app.post('/preferences', authenticateToken, updatePreferences);
app.get('/preferences', authenticateToken, getPreferences);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

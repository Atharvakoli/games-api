const express = require('express');
const cors = require('cors');
const { getAllGames, getGameById } = require('./controllers');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Creating CI/CD hw_2');
});

app.get('/games', async (req, res) => {
  let games = getAllGames();
  res.status(200).json({ games });
});

app.get('/games/details/:id', async (req, res) => {
  let game = getGameById(parseInt(req.params.id));
  res.status(200).json({ game });
});

module.exports = { app };

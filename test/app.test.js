let request = require('supertest');
let http = require('http');
const { getAllGames } = require('../controllers');
let { app } = require('../index');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe('Functions tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should be able to resturn list of games', () => {
    let mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];

    getAllGames.mockReturnValue(mockGames);

    let games = getAllGames();
    expect(games.length).toBe(3);
    expect(games).toEqual(mockGames);
  });
});

describe('API Endpoint tests', () => {
  it('GET /games should be able to return list of games', async () => {
    let res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      games: [
        {
          gameId: 1,
          title: 'The Legend of Zelda: Breath of the Wild',
          genre: 'Adventure',
          platform: 'Nintendo Switch',
        },
        {
          gameId: 2,
          title: 'Red Dead Redemption 2',
          genre: 'Action',
          platform: 'PlayStation 4',
        },
        {
          gameId: 3,
          title: 'The Witcher 3: Wild Hunt',
          genre: 'RPG',
          platform: 'PC',
        },
      ],
    });
    expect(res.body.games.length).toBe(3);
  });

  it('GET /games/details/:id should be able to return details of specified id', async () => {
    let res = await request(server).get('/games/details/3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      game: {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    });
  });
});

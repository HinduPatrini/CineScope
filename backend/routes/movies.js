// backend/routes/movies.js
const express = require('express');
const router = express.Router();

// Mock data – replace with real DB calls later
const mockMovies = [
  { imdbID: 'tt0111161', Title: 'The Shawshank Redemption', Year: '1994', Poster: '', imdbRating: '9.3' },
  { imdbID: 'tt0068646', Title: 'The Godfather', Year: '1972', Poster: '', imdbRating: '9.2' },
];

// GET /api/movies/trending
router.get('/trending', (req, res) => {
  res.json({ results: mockMovies });
});

// GET /api/movies/popular
router.get('/popular', (req, res) => {
  res.json({ results: mockMovies });
});

// GET /api/movies/top-rated
router.get('/top-rated', (req, res) => {
  res.json({ results: mockMovies });
});

// GET /api/movies/search?q=...&year=...&page=1
router.get('/search', (req, res) => {
  const { q } = req.query;
  const filtered = mockMovies.filter(m => m.Title.toLowerCase().includes((q || '').toLowerCase()));
  res.json({ results: filtered });
});

// GET /api/movies/genres
router.get('/genres', (req, res) => {
  res.json({
    genres: [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 16, name: 'Animation' },
      // add more as needed
    ]
  });
});

// GET /api/movies/:id
router.get('/:id', (req, res) => {
  const movie = mockMovies.find(m => m.imdbID === req.params.id);
  if (movie) return res.json({ movie });
  res.status(404).json({ message: 'Movie not found' });
});

// GET /api/movies/:id/cast
router.get('/:id/cast', (req, res) => {
  res.json({ cast: [] }); // placeholder
});

// GET /api/movies/:id/trailer
router.get('/:id/trailer', (req, res) => {
  res.json({ trailer: null }); // placeholder
});

// GET /api/movies/:id/similar
router.get('/:id/similar', (req, res) => {
  res.json({ results: [] }); // placeholder
});

module.exports = router;

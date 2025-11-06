// const express = require('express');
// const cors = require('cors');
// const flagsRouter = require('./routes/flags');

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/flags', flagsRouter);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors');
const path = require('path');
const flagsRouter = require('./routes/flags');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/flags', flagsRouter);

// Serve React frontend
const buildPath = path.join(__dirname, '../../ui/build'); // adjust path if needed
app.use(express.static(buildPath));

// Catch-all for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/flags', flagsRouter);

// Serve React frontend
const buildPath = path.join(__dirname, '../../ui/build');
app.use(express.static(buildPath));

// Serve index.html for all other routes (React handles routing)
app.use((req, res, next) => {
   if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(buildPath, 'index.html'));
  } else {
    res.status(404).send('Not Found');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


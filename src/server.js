const express = require('express');
const cors = require('cors');
const flagsRouter = require('./routes/flags');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/flags', flagsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

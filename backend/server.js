const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

 connectDB();
 
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
  const_dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build',
  'index.html')));
} else {
  app.get('/', (req, res) => res.send('Server is ready'));
}

  app.use(notFound);
  app.use(errorHandler);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}))

  app.listen(port, () => console.log(`Server started on port ${port}`));


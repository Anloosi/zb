const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const {notFound, errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000
const userRoutes = require('./routes/userRoutes');

 connectDB();
 
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

  app.get('/', (req, res) => res.send('Server is ready'));
  app.use(notFound);
  app.use(errorHandler);

  app.listen(port, () => console.log(`Server started on port ${port}`));


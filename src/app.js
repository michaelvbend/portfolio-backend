import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';

const app = express();

app.use(morgan('dev'));

app.use('/api', routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

const port = 3000;

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

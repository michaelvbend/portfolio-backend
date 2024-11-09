import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';
import mongoose from 'mongoose';

const app = express();

app.use(morgan('dev'));

app.use('/api', routes);

const port = 3000;

const uri =
  'mongodb+srv://mvanderbend:AXTw6viBVDMoyhKc@cluster0.tweuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

function startServer() {
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

async function startApp() {
  await connectToDatabase();
  startServer();
}

startApp();

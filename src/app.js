import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { corsOptions, MAX_BODY_SIZE, port } from './config/server.config.js';
import cors from 'cors';

const app = express();

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: MAX_BODY_SIZE }));

app.use('/api', routes);

const uri =
  'mongodb+srv://mvanderbend:AXTw6viBVDMoyhKc@cluster0.tweuo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const mongoDbUri = process.env.MONGODB_URI || uri;
async function connectToDatabase() {
  try {
    await mongoose.connect(mongoDbUri);
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

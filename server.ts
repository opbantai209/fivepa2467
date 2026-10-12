import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { projectRouter } from './server/routes/projects';
import { offerRouter } from './server/routes/offers';
import { workstreamRouter } from './server/routes/workstreams';
import { userRouter } from './server/routes/users';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json());

  // Mount Modular Backend API Routers
  app.use('/api/projects', projectRouter);
  app.use('/api/offers', offerRouter);
  app.use('/api/workstreams', workstreamRouter);
  app.use('/api/users', userRouter);

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`PeoplePerHour Clone running at http://localhost:${port}`);
  });
}

startServer();

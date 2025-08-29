import express from 'express';
import cors from 'cors';
import { registerRoutes } from './routes.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize routes
async function startServer() {
  const server = await registerRoutes(app);
  
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer().catch(console.error);

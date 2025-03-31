import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { routeNotFound } from './middleware/routeNotFound';
// import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1/auth', authRoutes);

// Handle 404
app.use(routeNotFound);

// Error handling
app.use(errorHandler);

export default app; 
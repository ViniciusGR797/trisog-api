import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, swaggerSpecJson, swaggerStyle } from './swagger/swaggerConfig';
// import bookingRoutes from './routes/bookingRoute';
import destinationRoutes from './routes/destinationRoute';
// import experienceRoutes from './routes/experienceRoute';
// import favoriteRoutes from './routes/favoriteRoute';
// import reviewRoutes from './routes/reviewRoute';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: '*',
}));

// app.use('/bookings', bookingRoutes);
app.use('/destinations', destinationRoutes);
// app.use('/experiences', experienceRoutes);
// app.use('/favorites', favoriteRoutes);
// app.use('/reviews', reviewRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerStyle));
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecJson, swaggerStyle));

export default app;
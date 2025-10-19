import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';
import { initializeFirebase } from './config/firebase.js';

dotenv.config();
initializeFirebase(); 

const app = express();

// 1. Configuración de CORS (Requisito #3)
app.use(cors({ origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' }));

// 2. Middleware para parsear JSON (Requisito #3)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// 3. Rutas de la Aplicación (Requisito #4)
app.use('/auth', authRoutes); 
app.use('/api', productsRoutes);

// 4. Manejo de Ruta Desconocida (404) (Requisito #3: Captura cualquier ruta que no sea manejada)
app.use((req, res, next) => {
    res.status(404).json({ message: 'Error 404: El recurso solicitado no se encuentra.' });
});

// 5. Exporta la aplicación para Vercel (Requisito #8)
export default app;
import { Router } from 'express';
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js'; 

const router = Router();

// Rutas Públicas (Lectura)
router.get('/products', getAllProducts);           // GET /api/products
router.get('/products/:id', getProductById);       // GET /api/products/:id

// Rutas Protegidas (Escritura/Modificación) - Requisito #7
router.post('/products/create', protectRoute, createProduct); // POST /api/products/create
router.put('/products/:id', protectRoute, updateProduct);     // PUT /api/products/:id
router.delete('/products/:id', protectRoute, deleteProduct);  // DELETE /api/products/:id

export default router;
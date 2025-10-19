import { Router } from 'express';
import { loginUser } from '../controllers/auth.controller.js';

const router = Router();

// POST /auth/login recibe credenciales y devuelve el Bearer token (Requisito #7)
router.post('/login', loginUser);

export default router;
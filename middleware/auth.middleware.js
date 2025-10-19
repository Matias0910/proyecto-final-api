import jwt from 'jsonwebtoken';

export const protectRoute = (req, res, next) => {
    // 1. Obtener el token del encabezado Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // Requisito: Código 401 si no hay token
        return res.status(401).json({ message: 'Acceso denegado. Se requiere un Bearer Token.' });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificar el token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Adjuntar la identidad del usuario a la petición
        req.user = decoded; 
        next();
    } catch (error) {
        // Requisito: Código 401 si el token es inválido/expirado
        return res.status(401).json({ message: 'Token inválido o expirado.', error: error.message });
    }
};
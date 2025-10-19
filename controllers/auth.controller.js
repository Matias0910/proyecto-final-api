import jwt from 'jsonwebtoken';
import { getDb } from '../config/firebase.js';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        // Requisito: Manejo de errores de petición con código 400
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios.' });
    }

    try {
        const db = getDb();
        // Buscar el usuario por email
        const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();

        if (userSnapshot.empty) {
            // Requisito: Manejo de errores de autenticación con código 401
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        // SIMULACIÓN DE CONTRASEÑA (En producción real usar bcrypt y no guardar la password en claro en Firestore)
        if (userData.password !== password) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: userDoc.id, email: userData.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Expira en 1 día
        );

        // Requisito: Devolver Bearer Token
        return res.status(200).json({ token: token, type: 'Bearer' });

    } catch (error) {
        console.error('Error durante el login:', error);
        return res.status(500).json({ message: 'Error en el servidor al intentar iniciar sesión.' });
    }
};
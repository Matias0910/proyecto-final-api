// /config/firebase.js - MODIFICADO

import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();
let db;

export const initializeFirebase = () => {
    try {
        if (admin.apps.length === 0) {
            
            // ⚠️ CÓDIGO CORREGIDO: Usamos la clave directamente.
            const privateKey = process.env.FIREBASE_PRIVATE_KEY; 

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey, // Aquí pasa la clave como está en Vercel
                }),
            });

            db = admin.firestore();
        }
    } catch (error) {
        console.error('Error al inicializar Firebase Admin SDK:', error);
    }
};

// ... el resto del archivo sigue igual

export const getDb = () => {
    if (!db) {
        throw new Error("Firestore no está inicializado.");
    }
    return db;
};
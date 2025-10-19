import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();
let db;

export const initializeFirebase = () => {
    try {
        if (admin.apps.length === 0) {
            // Reemplazar saltos de línea para que funcione con Vercel/dotenv
            const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');

            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: privateKey,
                }),
            });

            db = admin.firestore();
        }
    } catch (error) {
        console.error('Error al inicializar Firebase Admin SDK:', error);
    }
};

export const getDb = () => {
    if (!db) {
        throw new Error("Firestore no está inicializado.");
    }
    return db;
};
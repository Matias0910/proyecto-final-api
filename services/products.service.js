import { getDb } from '../config/firebase.js';
import { Product } from '../models/product.model.js';

const PRODUCTS_COLLECTION = 'products';

// ------------------- CREATE -------------------
export const create = async (productData) => {
    const newProduct = new Product(
        productData.name, 
        parseFloat(productData.price), 
        parseInt(productData.stock), 
        productData.description
    );

    if (!newProduct.isValid()) {
        throw new Error("Datos de producto (name, price, stock) inválidos.");
    }
    
    const db = getDb();
    const docRef = await db.collection(PRODUCTS_COLLECTION).add(newProduct.toFirestore());
    return { id: docRef.id, ...newProduct.toFirestore() };
};

// ------------------- READ (ALL) -------------------
export const findAll = async () => {
    const db = getDb();
    const snapshot = await db.collection(PRODUCTS_COLLECTION).get();
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

// ------------------- READ (ONE) -------------------
export const findById = async (id) => {
    const db = getDb();
    const doc = await db.collection(PRODUCTS_COLLECTION).doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

// ------------------- UPDATE -------------------
export const update = async (id, updateData) => {
    const db = getDb();
    const docRef = db.collection(PRODUCTS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return null;

    const dataToUpdate = { ...updateData, updatedAt: new Date() };
    await docRef.update(dataToUpdate);
    
    const updatedDoc = await docRef.get();
    return { id: updatedDoc.id, ...updatedDoc.data() };
};

// ------------------- DELETE -------------------
export const remove = async (id) => {
    const db = getDb();
    const docRef = db.collection(PRODUCTS_COLLECTION).doc(id);
    const doc = await docRef.get();

    if (!doc.exists) return false;
    await docRef.delete();
    return true;
};
import * as productService from '../services/products.service.js';

// GET /api/products
export const getAllProducts = async (req, res) => {
    try {
        const products = await productService.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la lista de productos.', error: error.message });
    }
};

// GET /api/products/:id
export const getProductById = async (req, res) => {
    try {
        const product = await productService.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado.' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el producto.', error: error.message });
    }
};

// POST /api/products/create (Recibe el cuerpo (body) de la petición)
export const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.create(req.body);
        res.status(201).json({ message: 'Producto creado exitosamente.', product: newProduct });
    } catch (error) {
        if (error.message.includes('inválidos')) {
            // Requisito: Código 400 para errores de petición
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Error al crear el producto.', error: error.message });
    }
};

// PUT /api/products/:id
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.update(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar.' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente.', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto.', error: error.message });
    }
};

// DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
    try {
        const wasDeleted = await productService.remove(req.params.id);
        if (!wasDeleted) {
            return res.status(404).json({ message: 'Producto no encontrado para eliminar.' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto.', error: error.message });
    }
};
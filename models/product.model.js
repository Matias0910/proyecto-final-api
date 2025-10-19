export class Product {
    constructor(name, price, stock, description) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.description = description;
    }

    // Método de validación simple
    isValid() {
        return this.name && typeof this.price === 'number' && this.price > 0 && typeof this.stock === 'number' && this.stock >= 0;
    }

    toFirestore() {
        return {
            name: this.name,
            price: this.price,
            stock: this.stock,
            description: this.description,
            createdAt: new Date(),
            updatedAt: new Date()
        };
    }
}
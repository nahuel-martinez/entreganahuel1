const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateId(products);
        products.push(product);
        this.saveProducts(products);
        return product.id;
    }

    getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    getProductById(id) {
        const products = this.getProducts();
        return products.find(product => product.id === id);
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            const updatedProduct = { ...products[index], ...updatedFields };
            products[index] = updatedProduct;
            this.saveProducts(products);
            return true;
        }

        return false;
    }

    deleteProduct(id) {
        const products = this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            this.saveProducts(products);
            return true;
        }

        return false;
    }

    saveProducts(products) {
        const data = JSON.stringify(products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    generateId(products) {
        if (products.length === 0) {
            return 1;
        }
        const maxId = Math.max(...products.map(product => product.id));
        return maxId + 1;
    }
}

const manager = new ProductManager('products.json');



module.exports = {ProductManager}
/*

const ProductManager = require('./ProductManager');

const productManager = new ProductManager('products.json');

const product1 = {
    title: 'Producto prueba 1',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'sin imagen',
    code: 'ABC123',
    stock: 25
};

const product2 = {
    title: 'Producto prueba 2',
    description: 'Descripción del producto 2',
    price: 15,
    thumbnail: 'ruta/imagen2.jpg',
    code: 'XYZ789',
    stock: 20
};

// Llamo a getProducts antes de cargar un producto y me da vacío
const products = productManager.getProducts();
console.log('Todos los productos:', products);

// Agregar productos
const productId1 = productManager.addProduct(product1);
const productId2 = productManager.addProduct(product2);

console.log('ID del producto 1:', productId1);
console.log('ID del producto 2:', productId2);

// Obtener todos los productos
const allProducts = productManager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productById = productManager.getProductById(productId1);
console.log('Producto por ID:', productById);

// Actualizar un producto
const updatedFields = { price: 12, stock: 60 };
const isUpdated = productManager.updateProduct(productId1, updatedFields);
console.log('Producto actualizado:', isUpdated);

// Eliminar un producto
const isDeleted = productManager.deleteProduct(productId2);
console.log('Producto eliminado:', isDeleted);

// Obtener todos los productos
const allProducts1 = productManager.getProducts();
console.log('Todos los productos:', allProducts1);

*/

//14601
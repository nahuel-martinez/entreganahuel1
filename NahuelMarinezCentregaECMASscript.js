
//Nahuel Martinez Cortes entrega de desafio 

class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Complete todos los campos");
            return;
        }


        if (this.products.some((product) => product.code === code)) {
            console.error(`El producto con el código ${code} ya existe`);
            return;
        }


        const newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        this.nextId++;

        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado");
        }
    }
}

const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción 1", 10.99, "imagen1.jpg", "001", 100);

manager.addProduct("Producto 2", "Descripción 2", 19.99, "imagen2.jpg", "002", 50);

manager.addProduct("Producto 3", "Descripción 3", 20.05, "imagen3.jpg", "003", 25);

console.log(manager.getProducts());

console.log(manager.getProductById(1));

console.log(manager.getProductById(4));

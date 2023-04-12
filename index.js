// Realizar una clase "ProductManager" que gestione un conjunto de productos.

class ProductManager {
    constructor() {
        this.products = []
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        let product = this.products.find(x => x.id === id)
        if (product == null) {
            console.log('Not Found')
            return 'Not Found'
        }
        else {
            return product
        }
    }

    addProduct({ title, description, price, thumbnail, id, stock }) {
        if (id == null) {
            if (this.products.length === 0) {
                id = 1
            }
            else {
                let lastProduct = this.products[this.products.length - 1]
                id = lastProduct.id + 1
            }
            let product = { title, description, price, thumbnail, id, stock }
            this.products.push(product)
        }
        else {
            let product = this.products.find(x => x.id === id)
            if (product != null){
                console.log('El id esta repetido.')
            }
            else{
                let product = { title, description, price, thumbnail, id, stock }
                this.products.push(product)
            }
        }
    }
}


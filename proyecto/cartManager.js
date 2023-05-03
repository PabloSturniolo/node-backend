// Realizar una clase "ProductManager" que gestione un conjunto de productos.

import fs from 'fs'

const { json } = require('stream/consumers')
class CartManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }

    async init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            await fs.promises.writeFile(path, JSON.stringify(this.products))
                .then(res => console.log('file created'))
                .catch(err => console.log(err))
        }
        else {
            await fs.promises.readFile(path, 'utf-8')
                .then(res => this.products = JSON.parse(res))
                .catch(err => console.log(err))
        }
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

    async addProduct({ title, description, price, thumbnail, id, stock }) {
        stock = stock ?? 0
        let code
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
            code = product.id
        }
        else {
            let product = this.products.find(x => x.id === id)
            if (product != null) {
                console.log('El id esta repetido.')
            }
            else {
                let product = { title, description, price, thumbnail, id, stock }
                this.products.push(product)
                code = product.id
            }
        }
        let productsJson = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile(this.path, productsJson)
            .then(res => console.log('products save'))
            .catch(err => console.log('addProduct: error'))
        return code
    }

    async updateProduct(id, data){
        let product = this.products.find(x => x.id === id)
        if (product == null) {
            return 'Not found'
        }
        else{
            product.title = data.title
            product.description = data.description
            product.price = data.price
            product.thumbnail = data.thumbnail
            product.stock = data.stock
            let productsJson = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, productsJson)
                .then(res => console.log('updateProduct: done'))
                .catch(err => console.log('updateProduct: error'))
        }
    }

    async deleteProduct(id){
        let index = this.products.findIndex(x => x.id === id)
        if (index == -1) {
            return 'Not found'
        }
        else{
            this.products.splice(index, 1)
            console.log(this.products)
            let productsJson = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, productsJson)
                .then(res => console.log('deleteProduct: done'))
                .catch(err => console.log('deleteProduct: error'))
        }
    }
}

async function manager() {
    let cartManager = new CartManager('data/data.json')
    console.log(prueba.getProducts())
    await console.log(prueba.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', id: 'abc123', stock: 25 }))
    console.log(prueba.getProducts())
    // console.log(prueba.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', id: 'abc123', stock: 25 }))
    console.log(prueba.getProductById('abc123'))
    await console.log(prueba.updateProduct('abc123',{ title: 'producto prueba', description: 'Este es un producto prueba', price: 300, thumbnail: 'Sin imagen', id: 'abc123', stock: 25 }))
    console.log(prueba.getProducts())
    await console.log(prueba.deleteProduct('abc123'))
}
manager()

export default cartManager
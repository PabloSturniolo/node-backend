// Realizar una clase "ProductManager" que gestione un conjunto de productos.

import fs from 'fs'

class ProductManager {
    constructor(path) {
        this.products = []
        this.path = path
        this.init(path)
    }

    async init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            fs.writeFileSync(path, JSON.stringify(this.products))
            console.log('file created')
        }
        else {
            this.products = JSON.parse(fs.readFileSync(path, 'utf-8'))
            console.log('data recovered')
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
        try{
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
            console.log('products save')
            return code
        }
        catch(error) {
            console.log(`addProduct: ${error}`)
        }
    }

    async updateProduct(id, data){
        let product = this.products.find(x => x.id === id)
        if (product == null) {
            return 'Not found'
        }
        else{
            try{
                for (let prop in data) {
                    //console.log(prop)
                    product[prop] = data[prop]
                }

                let productsJson = JSON.stringify(this.products, null, 2)
                await fs.promises.writeFile(this.path, productsJson)
                console.log('updateProduct: done')
            }
            catch(error) {
                console.log(`updateProduct: ${error}`)
            }
        }
    }

    async deleteProduct(id){
        let index = this.products.findIndex(x => x.id === id)
        if (index == -1) {
            return 'Not found'
        }
        else{
            try{
                this.products.splice(index, 1)
                console.log(this.products)
                let productsJson = JSON.stringify(this.products, null, 2)
                await fs.promises.writeFile(this.path, productsJson)
                console.log('deleteProduct: done')
            }
            catch(error) {
                console.log(`deleteProduct: ${error}`)
            }
        }
    }
}

let productManager = new ProductManager('data/products.json')

async function manager() {
    console.log("llamo a los productos")
    console.log(productManager.getProducts())
    console.log("agrego un producto")
    let code
    code = await productManager.addProduct({ title: 'producto prueba1', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba2', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba3', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba4', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba5', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba6', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba7', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba8', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba9', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("agrego un producto")
    code = await productManager.addProduct({ title: 'producto prueba10', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', stock: 25 })
    console.log(code)
    console.log("llamo a los productos")
    console.log(productManager.getProducts())
}
//manager()
export default productManager
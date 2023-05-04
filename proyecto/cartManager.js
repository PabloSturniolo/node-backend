// Realizar una clase "CartManager" que gestione un conjunto de productos.

import fs from 'fs'

class CartManager {
    constructor(path) {
        this.carts = []
        this.path = path
        this.init(path)
    }

    async init(path) {
        let file = fs.existsSync(path)
        if (!file) {
            await fs.promises.writeFile(path, JSON.stringify(this.carts))
                .then(res => console.log('file created'))
                .catch(err => console.log(err))
        }
        else {
            await fs.promises.readFile(path, 'utf-8')
                .then(res => this.carts = JSON.parse(res))
                .catch(err => console.log(err))
        }
    }

    getCarts() {
        try {
            if (this.carts.length > 0) {
                return this.carts
            }
            else {
                console.log("Not found")
                return "Not found"
            }
        }
        catch (error) {
            console.log(`getCarts: ${error}`)
            return 'getCarts: error'
        }
    }

    getCartById(id) {
        try{
            let cart = this.carts.find(x => x.id === id)
            if (cart == null) {
                console.log('Not Found')
                return 'Not Found'
            }
            else {
                return cart
            }
        }
        catch(error){
            console.log(`getCartById: ${error}`)
            return 'getCartById: error'
        }
    }

    async addCart(products) {
        try {
            let id
            if (this.carts.length === 0) {
                id = 1
            }
            else {
                let lastCarts = this.carts[this.carts.length - 1]
                id = lastCarts.id + 1
            }
            let cart = { id, products }
            this.carts.push(cart)

            let cartsJson = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, cartsJson)
            console.log('carts save')
            return id
        }
        catch (error) {
            console.log(`addCart: ${error}`)
            return 'addCart: error'
        }
    }
}

let cartManager = new CartManager('data/carts.json')
async function manager() {
    console.log("llamo a los carritos")
    console.log(cartManager.getCarts())
    console.log("agrego un carrito")
    let code
    code = await cartManager.addCart({ idProducto: 1, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 2, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 3, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 4, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 5, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 6, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 7, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 8, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 9, quantity: 3 })
    console.log(code)
    console.log("agrego un carrito")
    code = await cartManager.addCart({ idProducto: 10, quantity: 3 })
    console.log(code)
    console.log("llamo a los carritos")
    console.log(cartManager.getCarts())
}
//manager()

export default cartManager
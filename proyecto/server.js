import express, { response } from 'express'
import productManager from './productManager.js'
import cartManager from './cartManager.js'

let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: ' + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({ extended: true }))

let index_route = '/'
let index_function = (req, res) => {
    let quantityProduct = productManager.getProducts().length
    let carts = cartManager.getCarts();
    let quantityCart = (typeof carts === 'string') ? 0 : carts.length;
    console.log(cartManager.getCarts().length)
    return res.send(`there are ${quantityProduct} products and ${quantityCart} carts`)
}
server.get(index_route, index_function)

let one_route = '/products/:id'
let one_function = (req, res) => {
    let parameters = req.params
    let id = Number(parameters.id)
    let one = productManager.getProductById(id)
    if (typeof one != 'string') {
        return res.send({
            success: true,
            response: one
        })
    }
    else {
        return res.send({
            success: false,
            response: '{}'
        })
    }
}
server.get(one_route, one_function)

let query_route = '/products'
let query_function = (req, res) => {
    let limit = req.query.limit
    let products
    if(limit)
    {
        products = productManager.getProducts().slice(0, limit)
    }
    else{
        products = productManager.getProducts()
    }
    if (products.length > 0) {
        return res.send({
            success: true,
            response: products
        })
    }
    else {
        return res.send({
            success: false,
            response: 'not found'
        })
    }
}
server.get(query_route, query_function)

let one_route_cart = '/carts/:id'
let one_function_cart = (req, res) => {
    let parameters = req.params
    let id = Number(parameters.id)
    let one = cartManager.getCartById(id)
    if (typeof one != 'string') {
        return res.send({
            success: true,
            response: one
        })
    }
    else {
        return res.send({
            success: false,
            response: '{}'
        })
    }
}
server.get(one_route_cart, one_function_cart)

let query_route_cart = '/carts'
let query_function_cart = (req, res) => {
    let carts = cartManager.getCarts()
    if (carts.length > 0) {
        return res.send({
            success: true,
            response: carts
        })
    }
    else {
        return res.send({
            success: false,
            response: 'not found'
        })
    }
}
server.get(query_route_cart, query_function_cart)
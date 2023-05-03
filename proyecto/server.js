import express from 'express'
import productManager from './productManager'
import cartManager from './cartManager'


let server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: ' + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:tr}))

let index_route = '/'
let index_function = (req, res) => {
    let quantityProduct = productManager.getProducts().lenght
    let quantityCart = cartManager.getProducts().lenght
    return res.send(`there are ${quantityProduct} products and ${quantityCart} carts`)
}
server.get(index_route, index_function)

let one_route = '/products/:id'
let one_function = (req, res) => {
    let parameters = req.params
    let id = parameters.id
    let one = productManager.getProductById(id)
    return res.send('prueba')
}
server.get(one_route, one_function)
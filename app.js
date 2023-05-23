import express from "express";
import ProductManager from './productManager.js';

const app = express()

app.get('/', (req, res)=>{
    res.send('<h1> Hola Mundo! </h1>')
})

app.listen(8080, ()=> console.log('server up'))


app.get('/products', (req,res)=>{
    const products = tejaManager.getProducts()

    res.json({products})
});

const tejaManager = new ProductManager("./products.json");
tejaManager.getProducts()

let teja1= {
    title: "teja espanola",
    description: "teja recta",
    price: 500,
    thumbnail: "espanola.jpg",
    stock: 200
}
let teja2= {
    title: "teja francesa",
    description: "teja curva",
    price: 500,
    thumbnail: "francesa.jpg",
    stock: 300
}

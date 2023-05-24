import express from "express";
import ProductManager from './productManager.js';

const app = express()

app.get('/', (req, res)=>{
    res.send('<h1> Hola Mundo! </h1>')
})

app.get('/products', (req, res)=>{
    const products = tejaManager.getProducts()
    res.json({products})
});

const tejaManager = new ProductManager("./products.json");

app.listen(8080, ()=> console.log('server up'))
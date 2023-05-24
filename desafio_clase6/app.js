import express from "express";
import ProductManager from './productManager.js';

const app = express()

const tejaManager = new ProductManager('./products.json')

class Teja {
    constructor (title,description, price, thumbnail, stock) {
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.stock = stock
    }
}


let teja1= new Teja ("teja española", "Teja curva", 350, "espanola.jpg",500)
let teja2= new Teja ("teja francesa", "Teja recta", 500, "francesa.jpg",1500)
let teja3= new Teja ("teja italiana", "Teja recta corta", 250, "tana.jpg",25000)
let teja4= new Teja ("teja plastica recta", "Teja plastica recta", 350, "plastica1.jpg",5500)
let teja5= new Teja ("teja plastica curva", "Teja plastica curva", 350, "plastica2.jpg",5000)
let teja6= new Teja ("teja metal corta", "Teja metalica corta", 650, "metal corta.jpg",300)
let teja7= new Teja ("teja metal larga", "Teja metalica larga", 600, "metal larga.jpg",350)
let teja8= new Teja ("teja ecologica", "Teja ecologica", 800, "eco.jpg",150)
let teja9= new Teja ("teja española esmaltada", "Teja curva esmaltada", 550, "espanola esmaltada.jpg",500)
let teja10= new Teja ("teja francesa esmaltada", "Teja recta esmaltada", 850, "francesa esmaltada.jpg",1500)
const tejas = [teja1,teja2,teja3, teja4,teja5,teja6,teja7,teja8,teja9,teja10]


for (const i in tejas) {
    tejaManager.addProduct(tejas[i])
}



app.get('/', (req, res)=>{
    res.send('<h1> Hola Mundo! </h1>')
})

app.get('/products',(req,res)=>{
    const limit = req.query.limit
    const products = tejaManager.getProducts()
    if (limit > products.length) {
        return res.status(402).json({error: "Invalid limit "})
    }
    return res.status(200).json(products.slice(0,limit))
})

app.get('/product/:pid',(req,res)=> {
    const pid = parseInt(req.params.pid)
    const product = tejaManager.getProductByID(pid)
    if (product) {
        res.json(product)
    } else {
        res.status(402).send('ERROR - producto invalido')
    }
})




app.listen(8080, ()=> console.log('server up'))
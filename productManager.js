import fs from "fs";


class Teja {
    constructor (title,description, price, thumbnail, stock) {
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.stock = stock
    }
}


class ProductManager {
    #products
    #idCounter
    #path


    constructor(path){
        this.#path=path
        if (fs.existsSync('./products.json')){
            this.loadProducts()
            this.#idCounter= this.#products.length-1
        } else {
            this.#products=[]
            this.#idCounter=1
        }
    }
    makeUniqueCode = (length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      };

    addProduct(item) {
        if (!item.title || !item.description || !item.price || !item.thumbnail || !item.stock) {
            console.error("Producto inválido, por favor chequear que contenga: Title, description, price, thumbnail, code y stock.")
        } else if (this.#products.find((product)=>product.id === item.id)){
            console.error("El producto ya existe.")
        } else {
            item.id=this.#idCounter
            item.code=this.makeUniqueCode(8)
            this.#products.push(item)
            this.saveProducts()
            this.#idCounter++
        }
    };

    getProducts() {
        this.loadProducts()
        console.table(this.#products)
        return this.#products
    }

    getProductByID(idToFind) {
        return this.#products.find((product)=>product.id===idToFind)
    }

    async saveProducts() {
        try {
          const productsData = JSON.stringify(this.#products,null,"\t");
          await fs.promises.writeFile(this.#path, productsData, 'utf-8');
          console.log('Products saved successfully.');
        } catch (err) {
          console.error('Error saving products:', err);
        }
      };
    
      async loadProducts() {
        try {
          const productsData = await fs.promises.readFile(this.#path);
          this.#products = [JSON.parse(productsData)];
          console.log('Products loaded successfully.');
        } catch (err) {
          console.error('Error loading products:', err);
        }
      };

    updateProduct(id,update){
        const productIndex =  this.#products.findIndex(product => product.id === id); //busco el indice del producto, si no lo encuentra, devuelve -1

        if (productIndex === -1) {
            console.error('El producto con el id proporcionado no existe.')
            return;
        }

        for (const key in update) {
            if (this.#products[productIndex].hasOwnProperty(key)) {
                this.#products[productIndex][key] = update[key]
            } else {
                console.error(`La propiedad ${key} no se encuentra dentro del producto con id ${id}`)
            }
        }
        this.saveProducts();
    };

    deleteProduct(id) {
        const productToDelete = this.#products.find((product) => product.id === id);
      
        if (!productToDelete) {
          console.error(`No existe un producto con el id: ${id}`);
        } else {
          this.#products = this.#products.filter((item) => item.id !== id);
          console.log(`El producto con el id: ${id} fue eliminado.`);
          this.saveProducts();
        }
      }

    
};

const tejaManager = new ProductManager('./products.json')

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

tejaManager.getProducts()






export default ProductManager;
const makeUniqueCode = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

import fs from "fs";

class ProductManager {
  #path
  #products
  #id
  constructor(path) {
      this.#path = path;
      this.#products = [];
      this.#id = 1;
  }

  loadProducts() {
      try{
          const productsData = fs.readFileSync(this.#path, "utf-8");
          this.#products = JSON.parse(productsData);
      } catch (err) {
          console.error(err);
      }
  }

  saveProducts() {
      try{
          const productsData = JSON.stringify(this.#products);
          fs.writeFileSync(this.#path, productsData, "utf-8");
      } catch(err) {
          console.error(err);
      }
  }

  addProduct(product){
      if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock){
          console.log("El producto no contiene las propiedades requeridas: Title, Description, Price, Thumbnail, Code o Stock.")
      }
      else if (this.#products.some((products)=>products.code===product.code)){
          console.log("Este elemento ya esta dentro." + product.title + product.code)
      }
      else {
          product.id = this.#id;
          this.#products.push(product)
          this.#id++;
          console.log("se agrego el elemento de titulo: "+product.title);
          console.log("El ID del producto es: ",product.id);
          this.saveProducts()
      }
  }

  getProducts() {
      this.loadProducts()
      return this.#products;
  }

  getProductById(id) {
      this.loadProducts()
      const productFoundById = this.#products.find(product=>product.id===id);
      if (!productFoundById) {
          return ("No hay producto con ese ID")
      } else {
          return productFoundById;
      }
  }

  updateProduct(id, updates) {
      const productIndex = this.#products.findIndex(product => product.id === id);
    
      if (productIndex === -1) {
        console.error(`Product with id ${id} not found.`);
        return;
      }
    
      for (const key in updates) {
        if (this.#products[productIndex].hasOwnProperty(key)) {
          this.#products[productIndex][key] = updates[key];
        } else {
          console.error(`Key "${key}" not found in product with id ${id}.`);
        }
      }
    
      this.saveProducts();
    }

  deleteProduct(id) {
      const productFoundById = this.#products.find(product=>product.id===id);
      if (!productFoundById){
          return ("El producto a eliminar no existe");
      } else {
          this.#products = this.#products.filter(product=>product.id !==id);
          //implemento logica para actualizar el file
          this.saveProducts();
      }

  }
};


//TESTEO

//instancio unos productos
const productTest1 = {title:"producto prueba",description:"este es un producto prueba", price:200, thumbnail:"sin imagen", code:makeUniqueCode(8), stock:25};
const productTest2 = {title:"producto prueba2",description:"este es un producto prueba2", price:250, thumbnail:"sin imagen2", code:makeUniqueCode(8), stock:10};
const productTest3 = {title:"producto prueba3",description:"este es un producto prueba3", price:300, thumbnail:"sin imagen3", code:makeUniqueCode(8), stock:15};

//INSTANCIO EL PRODUCTMANAGER y luego guardo en un json
const pruebaProductManager = new ProductManager("products.json")
pruebaProductManager.saveProducts()

//LO CHEQUEO ANTES DE AGREGARLE NADA
console.log("*******************Testeo el ProductManager Vacio***********************")
console.log(pruebaProductManager.getProducts())


// agrego al producto y luego chequeo 

console.log("*******************Testeo el ProductManager con producto 1***********************")
pruebaProductManager.addProduct(productTest1);
console.log(productTest1.code);
console.log(pruebaProductManager.getProducts());

console.log("*******************Chequeo llamar al producto por id***********************")
console.log(pruebaProductManager.getProductById(1))

console.log("*******************Chequeo llamar al producto por id pero que no exista o este dentro del array***********************")
console.log(pruebaProductManager.getProductById(5))

console.log("*******************Actualizo los productos con una o varias modificaciones***********************")
pruebaProductManager.updateProduct(1,{"title":"nuevoTitulo"})
console.log(pruebaProductManager.getProducts())
pruebaProductManager.updateProduct(1,{"title":"updatedTitle","description":"Updated Description"})
console.log(pruebaProductManager.getProducts())

console.log("*******************borro un producto ***********************")
pruebaProductManager.deleteProduct(1);
console.log(pruebaProductManager.getProducts());
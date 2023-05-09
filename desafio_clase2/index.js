class ProductManager {

  constructor(products) {
    this.products = []
    this.idCounter=1
  };

  getProducts() {
    console.log('--Mostrando productos: ')
    console.table(this.products);
  };

  addProduct (product) {
    console.log('--Intentando agregar producto: '+product.title)
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.error('PRODUCTO INVÁLIDO')
    } else if (this.products.find(element => element.code === product.code)) {
      console.error('¡¡¡el código del producto ya está repetido!!!')
    } else {
      product.id=this.idCounter;
      this.idCounter++;
      this.products.push(product);
      console.log('SUCCESS!! --Producto Agregado exitosamente!');
    }
  };

  getProductByID (idToFind) {
    console.log('--Intentando encontrar producto con id: '+idToFind)
    let productFound = this.products.find(productsIn => productsIn.id === idToFind)
    if (productFound) {
      console.log('SUCCESS!! --Producto encontrado: ')
      console.log(productFound);
    } else console.error('¡¡¡NO ID FOUND!!!')
};
};



function makeCode(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

let tejaManager = new ProductManager;

let tejaEspanola ={
  title:'Teja Española',
  description: 'teja curva',
  price: 84,
  thumbnail: 'española.jpg',
  code: makeCode(8),
  stock: 200
};

let tejaFrancesa = {
  title:'Teja Francesa',
  description: 'Teja plana',
  price: 85,
  thumbnail: 'francesa.jpg',
  code: makeCode(8),
  stock: 150
};

let tejaPlastica = {
  title:'Teja Plastica',
  description: 'Teja curva o plana - pero de plástico',
  price: 85,
  thumbnail: 'plastica.jpg',
  code: tejaEspanola.code,
  stock: 1500
}

console.log('***MOSTRAMOS EL ARRAY VACIO***')
tejaManager.getProducts();

console.log('***AGREGAMOS PRODUCTOS***')
tejaManager.addProduct(tejaFrancesa);
tejaManager.addProduct(tejaEspanola);
tejaManager.addProduct(tejaPlastica);

console.log('***MOSTRAMOS EL ARRAY, AHORA CON OBJETOS***')
tejaManager.getProducts();

console.log('***INTENTAMOS ENCONTRAR PRODUCTOS POR ID***')
console.log('***INTENTAMOS ENCONTRAR PRODUCTO CON ID 1***')
tejaManager.getProductByID(1)
console.log('***INTENTAMOS ENCONTRAR PRODUCTO CON ID 3***')
tejaManager.getProductByID(3)



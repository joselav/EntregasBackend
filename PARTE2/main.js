import {promises as fs} from 'fs';

class ProductManager {
    constructor(){
        this.path = './products.json';
    }

    async getId() {
        const productsD = await fs.readFile(this.path, 'utf-8');
        const data = JSON.parse(productsD);
        const maxId = data.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;
      }
}

class ProductoData extends ProductManager {
    constructor(){
        super();
    }

  async getProducts(){
    const product= JSON.parse(await fs.readFile(this.path, "utf-8"));
    console.log(product)
 }

  async getProductsById(id){
    const product= JSON.parse( await fs.readFile(this.path, "utf-8"));
    const idExists = product.products.filter((product) => product.id ===id);

   return idExists.length > 0 ? idExists : 'El id introducido no existe en nuestra base de datos';
  }

  async addProducts(title, description, price, thumbnail, code, stock) {
    const productsD = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(productsD);

    if(!title, !description || !price || !thumbnail || !code || !stock){  console.log("Es necesario completar todos los datos para agregar un producto."); return}
   
    const codeExists= data.products.some((product)=> product.code === code)
    if(codeExists){return console.log(`El código ${code} ya existe en nuestra base de datos`)}
    
    const newProducto = { id: await this.getId(), title, description, price, thumbnail, code, stock };
  data.products.push(newProducto); 
  await fs.writeFile(this.path, JSON.stringify(data));
    
  }

  async updateProduct(id, product){
    const productsD = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(productsD);
    const index = data.products.findIndex((prod) => prod.id === id);

    if(index != -1){
        const productUpdate= data.products[index];

        if (product.title) productUpdate.title = product.title;
        if (product.description) productUpdate.description = product.description;
        if (product.price) productUpdate.price = product.price;
        if (product.thumbnail) productUpdate.thumbnail = product.thumbnail;
        if (product.code) productUpdate.code = product.code;
        if (product.stock) productUpdate.stock = product.stock;

         
        await fs.writeFile(this.path, JSON.stringify(data))
    } else {console.log("Producto no encontrado")}
  }

   async deleteProducts(id){
    const productsD = await fs.readFile(this.path, "utf-8");
    const data = JSON.parse(productsD);
    const deleteProd = data.products.find((prods)=> prods.id ===id)

    if (deleteProd){ 
        console.log("Se ha eliminado exitosamente el objeto")
        data.products = data.products.filter((prod) => prod.id !== id);
        await fs.writeFile(this.path, JSON.stringify(data))
    } else {
        console.log("Producto no encontrado")
    }

   }

}

const results = async () =>{
    const productsNews = new ProductoData();

    //PRODUCTOS A AGREGAR
    await productsNews.addProducts("Taza Grogu", "Taza de porcelana con forma de Grogu, personaje de star wars", "25€", "https://i.pinimg.com/564x/6a/0b/63/6a0b63a327791eaa782f11a35ee169f3.jpg", "producto3", 5)
    await productsNews.addProducts("Taza Mandolarian","Taza de porcelana con forma de Mando, personaje de Star Wars",15,"https://i.pinimg.com/564x/d2/38/2a/d2382aba56d7d85b4a6027bce0a7ef29.jpg","producto33",30)

    //CAMBIAR EL NOMBRE DEL PRODUCTO CON ID 1 
   // await productsNews.updateProduct(1, {title:"Hola mundo"});

    //ELIMINAR PRODUCTO CON ID 2
   // await productsNews.deleteProducts(2);

    //LEER TODOS LOS PRODUCTOS
    await productsNews.getProducts();

    //BUSCAR ID 5 EN LOS PRODUCTOS
    const productoId = await productsNews.getProductsById(5);

    

    console.log(productoId);
}


results()
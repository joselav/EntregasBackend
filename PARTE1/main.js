class ProductManager {
    constructor(){
        this.products = []
        this.id = 1;
    }

    getProduct(){
        return this.products 
    }

    getProductById(id){
        const idExist = this.products.find((producto)=> producto.id === id);

        return idExist || "El ID es inexistente";
    }

    addProducts(title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log("Es necesario completar todos los datos para agregar un producto.")
        }

        const codeExist = this.products.some((producto)=> producto.code === code);
        
        if(codeExist){
           throw new Error(`El código ${code} ya existe en nuestra base de datos`)
        }

        const newProducto = { id: this.id, title, description, price, thumbnail, code, stock};
        this.products.push(newProducto);
        this.id++;

    }

}

const productoNuevo = new ProductManager();

productoNuevo.addProducts("Taza Darth Vader", "Taza de porcelana con forma de Darth Vader, personaje de Star Wars", "20€", "https://i.pinimg.com/564x/30/db/ee/30dbee15d4780b6afb976f11bf103811.jpg", "producto22", 20);
productoNuevo.addProducts("Taza Mandolarian", "Taza de porcelana con forma de Mando, personaje de Star Wars", "15€", "https://i.pinimg.com/564x/d2/38/2a/d2382aba56d7d85b4a6027bce0a7ef29.jpg", "producto33", 30);
productoNuevo.addProducts("Taza Grogu", "Taza de porcelana con forma de Grogu, personaje de star wars", "25€", "https://i.pinimg.com/564x/6a/0b/63/6a0b63a327791eaa782f11a35ee169f3.jpg", "producto1", 5)

////PRODUCTO CON MISMO CODE:


//productoNuevo.addProducts("Taza Stormtrooper", "Taza de porcelana con forma de Stormtrooper, personajes de star wars", "25€", "https://i.pinimg.com/564x/29/0b/24/290b24c6572a20373e5e68791b063a03.jpg", "producto1", 5)


const productos = productoNuevo.getProduct();

const productoId = productoNuevo.getProductById(3);

console.log(productos);
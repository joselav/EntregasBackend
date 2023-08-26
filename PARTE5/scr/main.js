import express from 'express';
import appRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
import path from 'path';
import {promises as fs} from 'fs'
//import viewRouter from './routes/views.routes.js';

import ProductoData from './ProductManager.js';

//handlebars
import handlebars from 'express-handlebars';
import {fileURLToPath} from 'url';
import {dirname} from 'path';

//socket
import { Server } from 'socket.io';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//
const PORT = 8080;
const app =express();


const appServer = app.listen(PORT, () => {
  console.log(`Server on localhost:${PORT}`)
})

//Socket
const io = new Server(appServer)

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'))

//Routes
app.use('/api/products', appRouter);
app.use('/api/cart', cartRouter)
//app.use('/', viewRouter);

const data = path.join(__dirname,'public', 'json', './products.json');

app.get('/', async (req, res)=> {
    const prod = await fs.readFile(data, 'utf-8');
    const prodData = JSON.parse(prod);
    const products = prodData.products;
    const prodActive = products.filter((prod)=> prod.status === true)
  
    res.render('home', {products: prodActive, styles:'estilos.css'})
  
  })

  io.on('connection', (socket) => {
    console.log("Cliente conectado");

    socket.on('nuevoProducto', async (prod) => {
      const productsD = await fs.readFile(data, "utf-8");
      const datos = JSON.parse(productsD);
      const maxId= datos.products.reduce((max, product)=> (product.id > max ? product.id : max), 0);
      
      const newProd = {
        id: maxId + 1 ,
        ...prod,
        status:true,
      }

      datos.products.push(newProd); 
      await fs.writeFile(data, JSON.stringify(datos));

      socket.emit('prod', newProd);
    });
});

  app.get('/realtimeproducts', async (req,res)=>{
    const prod = await fs.readFile(data, 'utf-8');
    const prodData = JSON.parse(prod);
    const products = prodData.products;

    const prodActive = products.filter((prod)=> prod.status === true)

  res.render('realTimeProducts', { products: prodActive, styles: 'estilos.css' });
  })

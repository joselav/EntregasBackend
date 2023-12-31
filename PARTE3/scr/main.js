import ProductoData from './ProductManager.js';
import express from 'express';

const PORT = 8080;
const app =express();
const productsNews = new ProductoData();

app.use(express.json());

app.get('/', (req, res)=> {
  res.send("Hola, buenas tardes")
})

app.get('/products', async (req,res)=> {
    const product = await productsNews.getProducts();
    

    if(product.success){ 
      const prod = product.message;
      const limit = req.query.limit ? parseInt(req.query.limit) : product.length;
      const productLimit = prod.slice(0,limit);
      res.status(200).send(productLimit)}
      else {res.status(400).send("Error al cargar datos")}
  })

app.get('/products/:pid', async (req, res)=> {
    const {pid} = req.params;
    const product = await productsNews.getProductsById(parseInt(pid));

    if(product.success){
      res.status(200).send(product.message)
    }else {
      res.status(400).send(product.message)
    }
});

app.post('/products', async (req, res)=> {
  const {title, description, price, thumbnail, code, stock} = req.body;
  const product= await productsNews.addProducts(title, description, price, thumbnail, code, stock);
  
  if (product.success){
    res.status(200).send(product.message)
  } else {
    res.status(400).send(product.message)
  }
});

app.put('/products/:pid', async (req, res)=> {
  const {pid} = req.params;
  const proData = req.body;
  const product = await productsNews.updateProduct(parseInt(pid), proData);

  if(product.success){
    res.status(200).send(product.message)
  } else {res.status(400).send(product.message)}
})

app.delete('/products/:pid', async (req, res)=> {
  const {pid} = req.params;
  const product = await productsNews.deleteProducts(parseInt(pid));

  if(product.success){
    res.status(200).send(product.message)
  }else {res.status(400).send(product.message)}
})


app.listen(PORT, () => {
  console.log(`Server on localhost:${PORT}`)
})

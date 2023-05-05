import { Router } from 'express';
import ProductManager from '../Controllers/ProductManager.js';
import http from 'http';
import {Server} from 'socket.io';

const productos = new ProductManager('../Data/Productos.json');
const routerSocketProd = Router();

export default function configureWebSocketServer(app) {
  const server = http.createServer(app);
  const io = new Server(server);

  io.on('connection', async (socket) => {
    console.log('Nuevo cliente conectado!');
  
    const prods = await productos.getProducts();
  
    socket.on('nuevoProducto', async (saveProd) => {
      // Agregamos el nuevo producto a la lista de productos
      await productos.addProduct(saveProd);
  
      // Enviamos la lista actualizada de productos a todos los clientes conectados
      prods.push(saveProd);
      io.sockets.emit('productos', prods);
    });
  
  });

  //vista home productos
  routerSocketProd.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const prods = await productos.getProducts(limit);
    res.render('home', { productos: prods });
  });

  //vista realtime
  routerSocketProd.get('/realTimeProducts', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const prods = await productos.getProducts(limit);
    res.render('realTimeProducts', { productos: prods });
  });

  return { server, io, router: routerSocketProd };
}

import express from 'express';
import handlebars from 'express-handlebars';
import  mongoose  from 'mongoose';
import configureWebSocketServer from './Routes/socketProd.js';
import routerCart from './Routes/Cart.js';
import routerProd from './Routes/Productos.js';
import __dirname from "./utils.js"

const app = express();
const PORT = 8080;
const MONGO = 'mongodb+srv://ramses:iddqdq12@eshop.hdewcog.mongodb.net/'
const conection = mongoose.connect(MONGO);

app.use(express.static(__dirname+'/public'));
const { server, io, router } = configureWebSocketServer(app);


app.engine('hbs', handlebars.engine({
  extname: '.hbs',
  defaultLayout: 'index.hbs',
  layoutsDir: './views/layouts',
  partialsDir:  'views'
}))
app.set('views', './views');
app.set('view engine', 'hbs');

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', router);
app.use('/api/cart', routerCart);
app.use('/api/productos', routerProd);

// Iniciamos el servidor
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

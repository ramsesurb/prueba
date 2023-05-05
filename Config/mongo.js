import mongoose from "mongoose"

const productoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});
  
const connectionStringUrl = "mongodb+srv://ramses:iddqdq12@eshop.hdewcog.mongodb.net/";

  ;

  try {
     mongoose.connect(connectionStringUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Base de datos conectada');}
  
  catch (error) {
    console.log('Error al conectar a la base de datos', error)
  }

  mongoose.connection.on('error', console.error.bind(console, 'Error de conexión: '));

  const productoModel = mongoose.model('Products', productoSchema,"Products");
 

  export default productoModel
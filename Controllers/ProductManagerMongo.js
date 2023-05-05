import { promises as fs } from 'fs';
import productoModel from '../Config/mongo.js';

class ProductManagerMongo {
  async getProducts(limit) {
    try {
      const content = await productoModel.find({})
      console.log(content)
    
      if (limit) {
        return content.slice(0, limit);
      }
      return content;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async addProduct(prod) {
    try {
      const saveCont = await this.getProducts();

      const codeExists = saveCont.some((product) => product.code === prod.code);
      if (codeExists) {
        console.log(`Ya existe un producto con el código ${prod.code}`);
        return  { error: `Ya existe un producto con el código ${prod.code}` };
      }

      if (!prod.titulo ||!prod.descripcion ||!prod.precio ||!prod.code ||!prod.thumbnail ||!prod.stock) 
      {
        console.log("Todos los campos son obligatorios");
      }

      const lastId = saveCont.length;
      const newProduct = {
        id: (lastId + 1),
        titulo: prod.titulo,
        descripcion: prod.descripcion,
        precio: prod.precio,
        code: prod.code,
        thumbnail: prod.thumbnail,
        stock: prod.stock,
        status: true
      };
      await saveCont.push(newProduct);
      console.log("producto nuevo", newProduct);
      await fs.writeFile(`./Data/Productos.json`, JSON.stringify(saveCont, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductById(id, newProduct) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
        return null;
      }
      const updatedProduct = { ...products[productIndex], ...newProduct };
      products[productIndex] = updatedProduct;
      await fs.writeFile(`../Data/Productos.json`, JSON.stringify(products, null, 2));
      console.log(`Producto con id ${id} actualizado:`, updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async getByid(id) {
    try {
      
      const getByid =await productoModel.findOne({id:id})
      console.log("producto buscado", getByid);
      return getByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      
      const deleteByid = await productoModel.findOneAndDelete({id:id})
      console.log("producto eliminado", eliminado);
  
      return deleteByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      let products = await this.getProducts();
      products.splice(0, products.length);

      await fs.writeFile(`./Data/Productos.json`, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}
export default ProductManagerMongo
const rute = new ProductManagerMongo("./Data/Productos.json");

const productos = await productoModel.find({precio: {$gt: 1000}});
console.log(productos);
const producto = await productoModel.findOne({ id: 1 });
console.log(producto);



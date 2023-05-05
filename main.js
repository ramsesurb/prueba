

const socket = io.connect();



//productos


function addItem() {
  
  const titulo = document.getElementById('titulo').value;
  const descripcion= document.getElementById('descripcion').value;
  const code = document.getElementById('code').value;
  const stock = document.getElementById('stock').value;
  const precio = document.getElementById('precio').value;
  const thumbnail = document.getElementById('thumbnail').value;


  const newItem = {
    titulo: titulo,
    descripcion:descripcion,
    precio: precio,
    code:code,
    thumbnail:thumbnail,
    stock:stock}


    socket.emit('nuevoProducto', newItem);
    fs.writeFile(`/api/productos.json`, JSON.stringify(deleteByid ,null, 2))
    return false;
}



socket.on('productos', function(productos) {
  renderProd(productos);
});

function renderProd(productos) {
  console.log(productos)
  const prodlist = productos.map((prod) => {
    return `
      <tr>
        <td>${prod.id}</td>
        <td>${prod.titulo}</td>
        <td>${prod.descripcion}</td>
        <td>${prod.precio}</td>
        <td>${prod.code}</td>
        <td>${prod.stock}</td>
        <td><img src="${prod.thumbnail}" width="50"></td>
      </tr>
    `;
  }).join('');

  document.getElementById('prodDisplay').innerHTML = prodlist;
}



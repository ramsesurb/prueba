
const socket = io();


const form = document.getElementById('productForm');


form.addEventListener('submit', (event) => {
  
  event.preventDefault();


  const titulo = form.elements.titulo.value;
  const precio = form.elements.precio.value;
  const descripcion = form.elements.descripcion.value;
  const code = form.elements.code.value;
  const stock = form.elements.stock.value;
  const thumbnail = form.elements.thumbnail.value;

  
  socket.emit('nuevoProducto', { titulo, precio, descripcion, code, stock, thumbnail });
});
socket.on('nuevoProducto', (producto) => {
    
    const tableBody = document.getElementById('prodDisplay');
  
    
    const newRow = tableBody.insertRow(-1);
    newRow.innerHTML = `
      <td>${producto.id}</td>
      <td>${producto.titulo}</td>
      <td>${producto.precio}</td>
      <td>${producto.stock}</td>
      <td><img src="${producto.thumbnail}" width="50"></td>
    `;
  });
  
  
  
  
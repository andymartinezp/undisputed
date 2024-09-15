function cargarCarrito() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var contenedorCarrito = document.getElementById('cart-items');
    var totalCarrito = 0;

    contenedorCarrito.innerHTML = ''; // Limpiar el contenido previo

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        document.getElementById('cart-total').textContent = "0.00";
        return;
    }

    carrito.forEach(function(producto, index) {
        var itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        var img = document.createElement('img');
        img.src = producto.foto || "path/to/default/image.jpg"; // Proporciona una imagen por defecto
        img.alt = producto.nombre || "Producto";
        img.style.width = "50px";

        var nombre = document.createElement('p');
        nombre.textContent = producto.nombre || "Nombre no disponible";

        var precio = document.createElement('p');
        var precioNum = parseFloat(producto.precio);
        
        if (!isNaN(precioNum)) {
            precio.textContent = 'Precio: $' + precioNum.toFixed(2);
            totalCarrito += precioNum;
        } else {
            precio.textContent = 'Precio no disponible';
        }

        var eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.onclick = function() {
            eliminarDelCarrito(index);
        };

        itemDiv.appendChild(img);
        itemDiv.appendChild(nombre);
        itemDiv.appendChild(precio);
        itemDiv.appendChild(eliminarBtn);

        contenedorCarrito.appendChild(itemDiv);
    });

    document.getElementById('cart-total').textContent = totalCarrito.toFixed(2);
}

function eliminarDelCarrito(index) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito(); // Actualizar la vista del carrito
}

// Simulación de producto para agregar al carrito
var productoEjemplo = {
    nombre: "Hoodie V1",
    precio: 40000,
    imagen: "https://acdn.mitiendanube.com/stores/001/197/072/products/hoodie-baib-tour-remix-2023-negro-adelante21-0926bf47a524381f2616929029346001-640-0.png"
};

// Simulación de agregar un producto al carrito


function actualizarVistaPreviaCarrito() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var contenedorCarrito = document.getElementById('cart-items');
    var totalCarrito = 0;

    contenedorCarrito.innerHTML = ''; // Limpiar contenido anterior

    carrito.forEach(function(producto, index) {
        totalCarrito += producto.precio;

        var itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        var img = document.createElement('img');
        img.src = producto.imagen;
        img.alt = producto.nombre;

        var nombre = document.createElement('p');
        nombre.textContent = producto.nombre;

        var precio = document.createElement('p');
        precio.textContent = '$' + producto.precio.toFixed(2);

        itemDiv.appendChild(img);
        itemDiv.appendChild(nombre);
        itemDiv.appendChild(precio);

        contenedorCarrito.appendChild(itemDiv);
    });

    document.getElementById('cart-total').textContent = totalCarrito.toFixed(2);
}

function checkout() {
    alert("Redirigiendo a la página del carrito...");
    // Aquí puedes redirigir a la página de carrito si es necesario
}

// Ejemplo de agregar el producto al carrito
agregarAlCarrito(productoEjemplo);

// Asegúrate de actualizar la vista previa del carrito al cargar la página
window.onload = function() {
    actualizarVistaPreviaCarrito();
};

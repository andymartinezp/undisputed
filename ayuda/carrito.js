// Simulación de producto para agregar al carrito
var productoEjemplo = {
    nombre: "Hoodie V1",
    precio: 40000,
    imagen: "https://acdn.mitiendanube.com/stores/001/197/072/products/hoodie-baib-tour-remix-2023-negro-adelante21-0926bf47a524381f2616929029346001-640-0.png"
};

function agregarAlCarrito(producto) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Redirigir a la página del carrito
    window.location.href = 'carrito.html';
}

// Ejemplo de cómo podrías llamar a esta función cuando el usuario hace clic en un botón
document.getElementById('boton-agregar-carrito').addEventListener('click', function() {
    var producto = {
        nombre: "Hoodie V1",
        precio: 40000,
        imagen: "https://acdn.mitiendanube.com/stores/001/197/072/products/hoodie-baib-tour-remix-2023-negro-adelante21-0926bf47a524381f2616929029346001-640-0.png"
    };
    agregarAlCarrito(producto);
});

// Actualiza la vista previa del carrito
function actualizarVistaPreviaCarrito() {
    var contenedorCarrito = document.getElementById('cart-items');
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    var totalCarrito = 0;

    contenedorCarrito.innerHTML = ''; // Limpiar contenido anterior

    carrito.forEach(function(producto, index) {
        totalCarrito += parseFloat(producto.precio.replace('$', '').replace(',', ''));

        var itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        var img = document.createElement('img');
        img.src = producto.foto;
        img.alt = producto.Nombre;

        var nombre = document.createElement('p');
        nombre.textContent = producto.Nombre;

        var precio = document.createElement('p');
        precio.textContent = '$' + parseFloat(producto.precio.replace('$', '').replace(',', '')).toFixed(2);

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

window.onload = function() {
    actualizarVistaPreviaCarrito();
};

function obtenerProductos() {
    return [
        {
            id: 1,
            nombre: "Hoodie",
            precio: 100,
            foto: "https://acdn.mitiendanube.com/stores/001/197/072/products/hoodie-baib-tour-remix-2023-negro-adelante21-0926bf47a524381f2616929029346001-640-0.png"
        },
        {
            id: 2,
            nombre: "Remera",
            precio: 50,
            foto: "https://tuareq.com/cdn/shop/files/prueba-tuareq2.png?v=1706281192&width=1000"
        }
    ];
}

function agregarAlCarrito(producto) {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    var productoExistente = carrito.find(item => item.id === producto.id);
    if (!productoExistente) {
        carrito.push(producto);
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function obtenerProductoPorId(id) {
    var productos = obtenerProductos();
    return productos.find(producto => producto.id === id);
}

function manejarAñadirAlCarrito(id) {
    var producto = obtenerProductoPorId(id);
    if (producto) {
        agregarAlCarrito(producto);
        window.location.href = 'carrito.html'; // Redirige al carrito después de agregar el producto
    } else {
        console.error("Producto no encontrado");
    }
}

// Exponer funciones para que puedan ser usadas en otros archivos
window.manejarAñadirAlCarrito = manejarAñadirAlCarrito;
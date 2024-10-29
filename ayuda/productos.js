// productos.js
function obtenerProductos() {
    return [
        {
            id: 1,
            nombre: "Hoodie",
            precio: 80,
            foto: "https://http2.mlstatic.com/D_NQ_NP_682348-MLA46725921582_072021-O.webp"
        },
        {
            id: 2,
            nombre: "Remera",
            precio: 40,
            foto: "https://blanks.com.ar/wp-content/uploads/2024/02/REMERA-LISA-BLANCA-DELANTERA-1.png"
        },
        {
            id: 3,
            nombre: "Baggy",
            precio: 60,
            foto: "https://oldtree.cl/wp-content/uploads/2023/10/old-tree-baggy-pant-lighblue.jpg"
        },
        {
            id: 4,
            nombre: "Gorra",
            precio: 15,
            foto: "https://http2.mlstatic.com/D_NQ_NP_956937-MLA70192125866_062023-O.webp"
        },
        {
            id: 5,
            nombre: "Boxy",
            precio: 25,
            foto: "https://acdn.mitiendanube.com/stores/001/264/817/products/mock-upss-nuevos-12-4c2faaf3e58a0ffb5316999105017629-640-0.png"
        },
        {
            id: 6,
            nombre: "Jeans",
            precio: 75,
            foto: "https://m.media-amazon.com/images/I/61Iam2zJ4OL._AC_UY1000_.jpg"
        }
    ];
}

function agregarAlCarrito(productoId) {
    var producto = obtenerProductoPorId(productoId);
    if (producto) {
        var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        var productoExistente = carrito.find(p => p.id === producto.id);
        if (!productoExistente) {
            carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                foto: producto.foto
            });
            localStorage.setItem('carrito', JSON.stringify(carrito));
            alert("Producto añadido al carrito");
        } else {
            alert("El producto ya está en el carrito");
        }
    } else {
        alert("Producto no encontrado");
    }
}

function obtenerProductoPorId(id) {
    var productos = obtenerProductos();
    return productos.find(producto => producto.id === id);
}

window.agregarAlCarrito = agregarAlCarrito;  // Hacer esta función global para que pueda ser llamada desde el HTML

// Datos de ejemplo de productos (puedes añadir más o cambiar)
var remeras = obtenerProductos();

function cargarRemeras() {
    var lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let index = 0; index < remeras.length; index++) {
        var elemento = document.createElement("li");
        var titulo = document.createElement("h1");
        var precio = document.createElement("p");
        var foto = document.createElement("img");
        var boton = document.createElement("button");

        titulo.textContent = remeras[index].nombre; // Usamos 'nombre' en lugar de 'Nombre'
        precio.textContent = "$" + remeras[index].precio; // Nos aseguramos de que el precio siempre sea un número
        foto.src = remeras[index].foto;
        foto.classList.add("foto");
        boton.textContent = "Comprar";
        boton.onclick = function() { manejarAñadirAlCarrito(remeras[index].id); }; // Usamos el id del producto
        boton.classList.add("boton");

        elemento.appendChild(titulo);
        elemento.appendChild(precio);
        elemento.appendChild(foto);
        elemento.appendChild(boton);
        lista.appendChild(elemento);
    }
}

// Esta función ahora maneja correctamente agregar al carrito usando los id
function manejarAñadirAlCarrito(id) {
    var producto = obtenerProductoPorId(id);
    if (producto) {
        agregarAlCarrito(producto); // Llamamos a la función que ya existe en productos.js
        alert("Producto agregado al carrito");
        window.location.href = 'carrito.html'; // Redirigir al carrito
    } else {
        console.error("Producto no encontrado");
    }
}

// Cargar remeras al inicio
window.onload = function() {
    cargarRemeras();
};

window.onload = function() {
           
    cargarProductos(); 
    
}; 

function cargarProductos() {
var productos = [
    {
        "Nombre": "Hoodie",
        "Precio": 100,
        "foto": "https://acdn.mitiendanube.com/stores/001/197/072/products/hoodie-baib-tour-remix-2023-negro-adelante21-0926bf47a524381f2616929029346001-640-0.png"
    },
    {
        "Nombre": "Remera",
        "Precio": 50,
        "foto": "https://tuareq.com/cdn/shop/files/prueba-tuareq2.png?v=1706281192&width=1000"
    },
    {
        "Nombre": "Baggy",
        "Precio": 70,
        "foto": "https://www.paris.cl/dw/image/v2/BCHW_PRD/on/demandware.static/-/Sites-paris-marketplace/default/dw712aa8f4/images/imagenes-productos/800/MKCI/MKCI98ZD1X-0001-001.jpg"
    },
    {
        "Nombre": "Gorra",
        "Precio": 20,
        "foto": "https://img.freepik.com/fotos-premium/foto-gorra-negra-aislada-sobre-fondo-blanco-maqueta-plantilla-gorra-beisbol_131346-745.jpg"
    },
    {
        "Nombre": "BOXY",
        "Precio": 30,
        "foto": "https://acdn.mitiendanube.com/stores/001/264/817/products/mock-upss-nuevos-12-4c2faaf3e58a0ffb5316999105017629-640-0.png"
    },
    {
        "Nombre": "Jeans",
        "Precio": 90,
        "foto": "https://codigodenim.com/uploads/photo/image/40569/A18411_TQBnhcxx.JPG"
    }
];

mostrarProductos(productos);
localStorage.setItem('productos', JSON.stringify(productos));
}

function mostrarProductos(productos) {
var contenedor = document.getElementById('productos-shop');
contenedor.innerHTML = ''; 

productos.forEach(function(producto) {
    var productoDiv = document.createElement('div');
    productoDiv.className = 'product';

    var img = document.createElement('img');
    img.src = producto.foto;
    img.alt = producto.Nombre;

    var nombre = document.createElement('h3');
    nombre.textContent = producto.Nombre;

    var precio = document.createElement('p');
    precio.textContent = "$" + producto.Precio;

    var talleLabel = document.createElement('label');
    talleLabel.textContent = "Talle:";

    var talleSelect = document.createElement('select');
    talleSelect.id = `talle-${producto.Nombre}`;
    talleSelect.className = 'talle-select';
    var opcionesTalle = ["", "XS", "S", "M", "L", "XL", "XXL"];
    opcionesTalle.forEach(function(talle) {
        var option = document.createElement('option');
        option.value = talle;
        option.textContent = talle;
        talleSelect.appendChild(option);
    });

    var addToCartBtn = document.createElement('button');
    addToCartBtn.textContent = 'Añadir al carrito';
    addToCartBtn.className = 'add-to-cart';
    addToCartBtn.onclick = function() {
        agregarAlCarrito(producto);
    };

    productoDiv.appendChild(img);
    productoDiv.appendChild(nombre);
    productoDiv.appendChild(precio);
    productoDiv.appendChild(talleLabel);
    productoDiv.appendChild(talleSelect);
    productoDiv.appendChild(addToCartBtn);

    contenedor.appendChild(productoDiv);
});
}

function agregarAlCarrito(producto) {
var talleSelect = document.getElementById(`talle-${producto.Nombre}`);
var talleSeleccionado = talleSelect.value;

if (talleSeleccionado === "") {
    alert("Por favor, seleccione un talle antes de agregar el producto al carrito.");
    return;
}

producto.talle = talleSeleccionado; // Añadimos el talle seleccionado al producto

var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
var productoExistente = carrito.find(item => item.Nombre === producto.Nombre && item.talle === producto.talle);

if (!productoExistente) {
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("Producto añadido al carrito exitosamente");
    window.location.href = 'carrito.html'; 
} else {
    alert("Este producto ya está en el carrito con el mismo talle.");
}
}

function toggleFilterOptions() {
var filterOptions = document.getElementById('filter-options');
filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
}

function toggleSortOptions() {
var sortOptions = document.getElementById('sort-options');
sortOptions.style.display = sortOptions.style.display === 'block' ? 'none' : 'block';
}

function ordenarPor(criterio) {
var productos = JSON.parse(localStorage.getItem('productos'));
if (criterio === 'mayorMenor') {
    productos.sort((a, b) => b.Precio - a.Precio);
} else if (criterio === 'menorMayor') {
    productos.sort((a, b) => a.Precio - b.Precio);
}
mostrarProductos(productos);
}
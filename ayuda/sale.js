
        window.onload = function() {
            
                cargarProductosEnOferta();
        };

function agregarAlCarrito(producto) {
    var talleSelect = document.getElementById(`talle-${producto.Nombre}`);
    var talleSeleccionado = talleSelect.value;

    if (talleSeleccionado === "") {
        alert("Por favor, seleccione un talle antes de agregar el producto al carrito.");
        return;
    }

    producto.talle = talleSeleccionado;

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));

    window.location.href = 'carrito.html';
}

function toggleFilterOptions() {
    var filterOptions = document.getElementById('filter-options');
    filterOptions.style.display = filterOptions.style.display === 'block' ? 'none' : 'block';
}

function toggleSortOptions() {
    var sortOptions = document.getElementById('sort-options');
    sortOptions.style.display = sortOptions.style.display === 'block' ? 'none' : 'block';
}

function cargarProductosEnOferta() {
    var contenedor = document.getElementById('productos-sale');
    contenedor.innerHTML = ''; 

    var productosEnOferta = [
        {
            "Nombre": "Hoodie en Oferta",
            "Precio": "$80",
            "PrecioOriginal": "$100",
            "foto": "https://http2.mlstatic.com/D_NQ_NP_682348-MLA46725921582_072021-O.webp"
        },
        {
            "Nombre": "Remera en Oferta",
            "Precio": "$40",
            "PrecioOriginal": "$50",
            "foto": "https://blanks.com.ar/wp-content/uploads/2024/02/REMERA-LISA-BLANCA-DELANTERA-1.png"
        },
        {
            "Nombre": "Baggy en Oferta",
            "Precio": "$60",
            "PrecioOriginal": "$70",
            "foto": "https://oldtree.cl/wp-content/uploads/2023/10/old-tree-baggy-pant-lighblue.jpg"
        },
        {
            "Nombre": "Gorra en Oferta",
            "Precio": "$15",
            "PrecioOriginal": "$20",
            "foto": "https://http2.mlstatic.com/D_NQ_NP_956937-MLA70192125866_062023-O.webp"
        },
        {
            "Nombre": "Boxy en Oferta",
            "Precio": "$25",
            "PrecioOriginal": "$30",
            "foto": "https://acdn.mitiendanube.com/stores/001/177/291/products/boxyclassicblanca-espalda-16afc9b372cb4899c417138285399209-640-0.png"
        },
        {
            "Nombre": "Jeans en Oferta",
            "Precio": "$75",
            "PrecioOriginal": "$90",
            "foto": "https://m.media-amazon.com/images/I/61Iam2zJ4OL._AC_UY1000_.jpg"
        }
    ];

    productosEnOferta.forEach(function(producto) {
        var productoDiv = document.createElement('div');
        productoDiv.className = 'product';

        var img = document.createElement('img');
        img.src = producto.foto;
        img.alt = producto.Nombre;

        var nombre = document.createElement('h3');
        nombre.textContent = producto.Nombre;

        var precioOriginal = document.createElement('span');
        precioOriginal.className = 'precio-original';
        precioOriginal.textContent = producto.PrecioOriginal;

        var precio = document.createElement('span');
        precio.className = 'precio';
        precio.textContent = producto.Precio;

        var precioContainer = document.createElement('p');
        precioContainer.appendChild(precio);
        precioContainer.appendChild(precioOriginal);

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
        productoDiv.appendChild(precioContainer);
        productoDiv.appendChild(talleLabel);
        productoDiv.appendChild(talleSelect);
        productoDiv.appendChild(addToCartBtn);

        contenedor.appendChild(productoDiv);
    });
}
var remeras = [
    {
        "Nombre":"Remera oversize",
        "Precio":"$100",
        "foto":"https://admin.deloscojones.com.ar/Content/UploadDirectory/Products/794/image_8f575d19-e7b5-4c2b-856c-6dfa90f8dc02.jpg",
        "stock": 10
    },{
        "Nombre":"Remera boxy fit",
        "Precio":"$100",
        "foto":"https://acdn.mitiendanube.com/stores/001/015/914/products/img_1171-8df9293a52077e791616966108200570-1024-1024-8e2ff5a19e797ae67e169722059437571-5948d2530be44da3ff16972206460761-640-0.jpg",
        "stock": 5
    }
];

function cargarRemeras() {
    var lista = document.getElementById("lista");
    lista.innerHTML = "";
    for (let index = 0; index < remeras.length; index++) {
        var elemento = document.createElement("li");
        var titulo = document.createElement("h1");
        var precio = document.createElement("p");
        var foto = document.createElement("img");
        var boton = document.createElement("button");

        titulo.textContent = remeras[index].Nombre;
        precio.textContent = remeras[index].Precio;
        foto.src = remeras[index].foto;
        foto.classList.add("foto");
        boton.textContent = "Comprar";
        boton.onclick = function() { comprar(index); };
        boton.classList.add("boton");

        elemento.appendChild(titulo);
        elemento.appendChild(precio);
        elemento.appendChild(foto);
        elemento.appendChild(boton);
        lista.appendChild(elemento);
    }
}

function comprar(index) {
    var usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert("Por favor, inicie sesión para realizar una compra.");
        return;
    }

    var compras = JSON.parse(localStorage.getItem('compras')) || [];
    var nuevaCompra = {
        "usuario": usuarioLogueado.mail,
        "producto": remeras[index],
        "estado": "Pendiente",
        "fecha": new Date().toLocaleString()
    };
    compras.push(nuevaCompra);
    localStorage.setItem('compras', JSON.stringify(compras));

    alert("Compra realizada exitosamente");
}

window.onload = function() {
    cargarRemeras();
};

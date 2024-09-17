var usuarioActual = JSON.parse(localStorage.getItem('usuarioLogueado')) || null;
var compras = JSON.parse(localStorage.getItem('compras')) || [];

function verificarAutenticacion() {
    if (!usuarioActual) {
        alert("Por favor, inicie sesión para subir un outfit.");
        window.location.href = 'iniciarSesion.html'; // Redirigir a la página de inicio de sesión
        return false;
    }
    return true;
}

function verificarCompras() {
    var usuarioCompras = compras.filter(compra => compra.mail === usuarioActual.mail);
    if (usuarioCompras.length === 0) {
        alert("Debe realizar al menos una compra para subir un outfit.");
        return false;
    }
    return true;
}

function subirOutfit() {
    if (!verificarAutenticacion() || !verificarCompras()) {
        return false;
    }

    var descripcion = document.getElementById("descripcion").value;
    var imagen = document.getElementById("imagen").value;

    var outfits = JSON.parse(localStorage.getItem('outfits')) || [];
    var nuevoOutfit = {
        "descripcion": descripcion,
        "imagen": imagen,
        "likes": 0,
        "usuario": usuarioActual.mail
    };

    outfits.push(nuevoOutfit);
    localStorage.setItem('outfits', JSON.stringify(outfits));

    alert("Outfit subido exitosamente");
    document.getElementById("formOutfit").reset();
    cargarOutfits(); 
    return false; 
}

function cargarOutfits() {
    var outfits = JSON.parse(localStorage.getItem('outfits')) || [];
    var contenedor = document.getElementById("outfitsSubidos");
    contenedor.innerHTML = "";

    if (outfits.length === 0) {
        contenedor.textContent = "No hay outfits subidos.";
        return;
    }

    outfits.forEach((outfit, index) => {
        var elemento = document.createElement("div");
        var descripcion = document.createElement("p");
        var imagen = document.createElement("img");
        var likes = document.createElement("p");
        var botonLike = document.createElement("button");

        descripcion.textContent = outfit.descripcion;
        imagen.src = outfit.imagen;
        imagen.alt = "Imagen del outfit";
        imagen.style.width = "200px"; 
        likes.textContent = "Likes: " + outfit.likes;
        botonLike.textContent = "Like";
        botonLike.onclick = function() {
            agregarLike(index);
        };

        elemento.appendChild(descripcion);
        elemento.appendChild(imagen);
        elemento.appendChild(likes);
        elemento.appendChild(botonLike);
        contenedor.appendChild(elemento);
    });
}

function agregarLike(index) {
    var outfits = JSON.parse(localStorage.getItem('outfits')) || [];
    outfits[index].likes += 1;
    localStorage.setItem('outfits', JSON.stringify(outfits));
    cargarOutfits();
}

window.onload = function() {
    cargarOutfits();
};

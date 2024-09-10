// Verificar autenticación del usuario y compras
function verificarAutenticacion() {
    var usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert("Debe iniciar sesión para acceder a esta página");
        window.location.href = 'iniciarSesion.html';
        return false;
    }
    var compras = JSON.parse(localStorage.getItem('compras')) || [];
    var usuarioCompras = compras.filter(compra => compra.mail === usuarioLogueado.mail);
    if (usuarioCompras.length === 0) {
        alert("Debe realizar al menos una compra para subir un outfit.");
        return false;
    }
    return true;
}

function subirOutfit(event) {
    event.preventDefault();

    if (!verificarAutenticacion()) {
        return;
    }

    var descripcion = document.getElementById("outfitDescripcion").value;
    var imagenInput = document.getElementById("outfitImagen");
    var imagenArchivo = imagenInput.files[0];

    if (!descripcion || !imagenArchivo) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    var lector = new FileReader();
    lector.onloadend = function() {
        var outfit = {
            descripcion: descripcion,
            imagen: lector.result,
            likes: 0
        };

        var outfits = JSON.parse(localStorage.getItem('outfits')) || [];
        outfits.push(outfit);
        localStorage.setItem('outfits', JSON.stringify(outfits));

        alert("Outfit subido exitosamente");
        cargarOutfits();
    };
    lector.readAsDataURL(imagenArchivo);
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
        botonLike.textContent = "Me gusta";
        botonLike.onclick = function() {
            outfit.likes++;
            localStorage.setItem('outfits', JSON.stringify(outfits));
            cargarOutfits();
        };

        elemento.appendChild(descripcion);
        elemento.appendChild(imagen);
        elemento.appendChild(likes);
        elemento.appendChild(botonLike);
        contenedor.appendChild(elemento);
    });
}

window.onload = function() {
    cargarOutfits();
};

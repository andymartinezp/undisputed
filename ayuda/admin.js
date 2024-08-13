var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
    {
        "mail": "Herna@gmail.com",
        "contraseña": "123",
        "rol": 1
    },
    {
        "mail": "Maxi@gmail.com",
        "contraseña": "123",
        "rol": 2
    }
];

function agregarUsuario() {
    var nuevoMail = document.getElementById("nuevoMail").value;
    var nuevaContraseña = document.getElementById("nuevaContraseña").value;
    var nuevoRol = document.getElementById("nuevoRol").value;

    var nuevoUsuario = {
        "mail": nuevoMail,
        "contraseña": nuevaContraseña,
        "rol": parseInt(nuevoRol)
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
    alert("Usuario añadido exitosamente");
    cargarUsuarios(); 
}

function cargarUsuarios() {
    var editarMail = document.getElementById("editarMail");
    editarMail.innerHTML = ""; 

    usuarios.forEach((usuario, index) => {
        var option = document.createElement("option");
        option.value = index; 
        option.textContent = usuario.mail;
        editarMail.appendChild(option);
    });
}

function editarUsuario() {
    var usuarioIndex = document.getElementById("editarMail").value;
    var nuevaContraseña = document.getElementById("editarNuevaContraseña").value;
    var nuevoRol = document.getElementById("editarNuevoRol").value;

    if (usuarioIndex !== "") {
        if (nuevaContraseña) {
            usuarios[usuarioIndex].contraseña = nuevaContraseña;
        }
        if (nuevoRol) {
            usuarios[usuarioIndex].rol = parseInt(nuevoRol);
        }

        localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
        alert("Usuario editado exitosamente");
        cargarUsuarios(); 
    } else {
        alert("Seleccione un usuario para editar");
    }
}

function eliminarUsuario() {
    var usuarioIndex = document.getElementById("editarMail").value;

    if (usuarioIndex !== "") {
        usuarios.splice(usuarioIndex, 1); 
        localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
        alert("Usuario eliminado exitosamente");
        cargarUsuarios(); 
    } else {
        alert("Seleccione un usuario para eliminar");
    }
}

function verificarAutenticacionAdmin() {
    var usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado || usuarioLogueado.rol !== 1) {
        alert("Acceso denegado");
        window.location.href = 'iniciarSesion.html';
    }
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
        var botonSeleccionar = document.createElement("button");

        descripcion.textContent = outfit.descripcion;
        imagen.src = outfit.imagen;
        imagen.alt = "Imagen del outfit";
        imagen.style.width = "200px"; 
        likes.textContent = "Likes: " + outfit.likes;
        botonSeleccionar.textContent = "Seleccionar como ganador";
        botonSeleccionar.onclick = function() {
            seleccionarGanador(index);
        };

        elemento.appendChild(descripcion);
        elemento.appendChild(imagen);
        elemento.appendChild(likes);
        elemento.appendChild(botonSeleccionar);
        contenedor.appendChild(elemento);
    });
}

function seleccionarGanador(index) {
    var outfits = JSON.parse(localStorage.getItem('outfits')) || [];
    var ganador = outfits[index];

    alert("El ganador es: " + ganador.descripcion);

}

function renovarDinamica() {
    if (confirm("¿Estás seguro de que quieres renovar la dinámica? Esto eliminará todos los outfits actuales.")) {
        localStorage.removeItem('outfits');
        cargarOutfits();
        alert("La dinámica ha sido renovada.");
    }
}

window.onload = function() {
    verificarAutenticacionAdmin();
    cargarUsuarios(); 
    cargarProductos();
    cargarOutfits(); 
};

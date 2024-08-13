window.onload = function() {
    var usuarioLogueado = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuarioLogueado) {
        alert("Por favor, inicie sesión para ver sus compras.");
        window.location.href = 'iniciarSesion.html';
        return;
    }

    cargarCompras(usuarioLogueado.mail);
};

function cargarCompras(usuario) {
    var compras = JSON.parse(localStorage.getItem('compras')) || [];
    var listaCompras = document.getElementById("listaCompras");
    listaCompras.innerHTML = ""; 

    var comprasUsuario = compras.filter(compra => compra.usuario === usuario);

    if (comprasUsuario.length === 0) {
        listaCompras.textContent = "No hay compras registradas.";
        return;
    }

    comprasUsuario.forEach(compra => {
        var elemento = document.createElement("li");
        var titulo = document.createElement("h1");
        var estado = document.createElement("p");
        var fecha = document.createElement("p");

        titulo.textContent = compra.producto.Nombre;
        estado.textContent = "Estado: " + compra.estado;
        fecha.textContent = "Fecha: " + compra.fecha;

        elemento.appendChild(titulo);
        elemento.appendChild(estado);
        elemento.appendChild(fecha);
        listaCompras.appendChild(elemento);
    });
}

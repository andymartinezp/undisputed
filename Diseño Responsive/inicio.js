var usuarios = [
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

function ingresar() {
    var mail = document.getElementById("mail").value;
    var contraseña = document.getElementById("contraseña").value;

    for (let usuario of usuarios) {
        if (usuario.mail === mail && usuario.contraseña === contraseña) {
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
            
            if (usuario.rol === 1) {
                window.location.href = 'admin.html';
            } else if (usuario.rol === 2) {
                window.location.href = 'index.html';
            }
            return; 
        }
    }
    alert("Email o contraseña incorrectos");
}

const BIN_ID = '670ee730ad19ca34f8b928d3'; 
const API_KEY = '$2a$10$zaTWFqunWHdxu.77OT5PiOP9OPqM.3KSWEM0APN1ADkZw5mkzwJXK'; 

async function obtenerUsuarios() {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': API_KEY
        }
    });
    
    if (!response.ok) {
        throw new Error('Error al obtener usuarios');
    }

    const data = await response.json();
    console.log(data.record)
    return data.record; 
}

async function ingresar() {
    var mail = document.getElementById("mail").value;
    var contraseña = document.getElementById("contraseña").value;

    try {
        const usuarios = await obtenerUsuarios();

        for (let index = 0; index < usuarios.length; index++) {
            if (usuarios[index].email == mail && usuarios[index].password == contraseña) {
            //    localStorage.setItem('usuarioLogueado', JSON.stringify(usuarios[index]));
                
                if (usuarios[index].role == "admin") {
                    window.location.href = 'admin.html';
                } else if (usuarios[index].role == "user") {
                    window.location.href = 'index.html';
                }
                return; 
            }
        }
        alert("Email o contraseña incorrectos");
    } catch (error) {
        alert(error.message);
    }
}

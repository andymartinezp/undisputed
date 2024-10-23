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
            return data.record; 
        } 

        async function registrarUsuario() {
            const email = document.getElementById('registroEmail').value;
            const password = document.getElementById('registroPassword').value;

            try {
                const usuarios = await obtenerUsuarios();
                console.log(usuarios);

                // Usamos un bucle for para verificar si el usuario ya existe
                let usuarioExistente = false;
                for (const usuario of usuarios.record) {
                    if (usuario.email === email) {
                        usuarioExistente = true;
                        break; // Salimos del bucle si encontramos el usuario
                    }
                }

                if (usuarioExistente) {
                    alert("El email ya está registrado");
                    return; // Salimos de la función si el usuario ya existe
                }

                const nuevoUsuario = {
                    email: email,
                    password: password,
                    role: 'user' // Cambia esto según sea necesario
                };

                // Guardar el nuevo usuario en la API
                await guardarUsuario(nuevoUsuario);

                alert("Registro exitoso. Puedes iniciar sesión ahora.");
                window.location.href = 'iniciarSesion.html';
            } catch (error) {
                console.error(error);
                alert('Ha ocurrido un error. Intenta de nuevo más tarde.');
            }
        }

        async function guardarUsuario(usuario) {
            const usuariosExistentes = await obtenerUsuarios();
            
         
            // Agregar el nuevo usuario a la lista
            const todosLosUsuarios = [...usuariosExistentes.record, usuario];
        
            const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': API_KEY
                },
                body: JSON.stringify({ record: todosLosUsuarios }) // Asegúrate de que el cuerpo tenga el formato correcto
            });
        
            if (!response.ok) {
                throw new Error('Error al guardar el nuevo usuario');
            }
        }

        async function ingresar() {
            const mail = document.getElementById("mail").value;
            const contraseña = document.getElementById("contraseña").value;

            try {
                const usuarios = await obtenerUsuarios();
                console.log(usuarios.record)
                let usuarioValido = false;
                for (const usuario of usuarios.record) {
                    if (usuario.email === mail && usuario.password === contraseña) {
                        usuarioValido = true;

                        if (usuario.role === "admin") {
                            window.location.href = 'admin.html';
                        } else if (usuario.role === "user") {
                            window.location.href = 'index.html';
                        }
                        return; 
                    }
                }

                if (!usuarioValido) {
                    alert("Email o contraseña incorrectos");
                }
            } catch (error) {
                alert(error.message);
            }
        }
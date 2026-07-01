const formRegistro = document.getElementById('form-registro');
const mensajeRegistro = document.getElementById('mensaje-registro');

if (formRegistro) {
  formRegistro.addEventListener('submit', (event) => {
    event.preventDefault();

    const datos = Object.fromEntries(new FormData(event.target));
    
    // Captura los datos listos para enviarse al backend
    console.log('Intento de Registro:', { 
      nombre: datos.nombre, 
      email: datos.email, 
      password: datos.password 
    });

    if (datos.nombre && datos.email && datos.password) {
      formRegistro.reset();
      if (mensajeRegistro) {
        mensajeRegistro.textContent = '¡Registro completado con éxito!';
        mensajeRegistro.style.color = 'green';
        mensajeRegistro.style.display = 'block';
      }
    }
  });
}
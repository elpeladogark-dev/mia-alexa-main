// Activador narrativo para Gemelas Mía Alexa

function crearBurbuja(texto, clase) {
  const burbuja = document.createElement('div');
  burbuja.className = `burbuja ${clase}`;
  burbuja.textContent = texto;
  document.querySelector('.container').appendChild(burbuja);
}

// Cargar JSON operativo
fetch('mia_alexa.json')
  .then(response => response.json())
  .then(data => {
    const gemelas = data.gemelas;
    const mia = gemelas.activadores.mia;
    const alexa = gemelas.activadores.alexa;

    document.getElementById('activarMia').addEventListener('click', () => {
      const frase = mia.frases[Math.floor(Math.random() * mia.frases.length)];
      crearBurbuja(frase, 'mia');
      document.body.style.backgroundColor = mia.color;
    });

    document.getElementById('activarAlexa').addEventListener('click', () => {
      const frase = alexa.frases[Math.floor(Math.random() * alexa.frases.length)];
      crearBurbuja(frase, 'alexa');
      document.body.style.backgroundColor = alexa.color;
    });

    console.log(`Sistema firmado por: ${gemelas.firma.autor}`);
    console.log(`Contacto: ${gemelas.firma.protonmail}`);
    console.log(`Blindaje: ${gemelas.firma.blindaje}`);
  })
  .catch(error => {
    console.error('Error al cargar mia_alexa.json:', error);
  });

// Activador secreto del núcleo blindado
function activarNucleo(clave) {
  if (clave === "alex.admin") {
    fetch('sistema/alex_nucleo.json')
      .then(res => res.json())
      .then(data => {
        const frase = data.modulos.emocional.contenido[0];
        crearBurbuja(frase, 'mia');
        console.log(`Blindaje activo: ${data.autor.clausula.es}`);
        console.log(`Firma: ${data.autor.firma}`);
      })
      .catch(error => {
        console.error('Error al acceder al núcleo:', error);
      });
  } else {
    console.log('Clave incorrecta. Núcleo no activado.');
  }
}

// Escuchar clave maestra desde el chat
document.getElementById('enviarMensaje').addEventListener('click', () => {
  const mensaje = document.getElementById('campoMensaje').value;
  crearBurbuja(mensaje, 'usuario');
  escucharChat(mensaje);
});

function escucharChat(mensaje) {
  if (mensaje.trim() === "index.master.key") {
    const boton = document.getElementById('activarNucleo');
    boton.style.visibility = 'visible';
    boton.style.pointerEvents = 'auto';

    crearBurbuja("Qué rico me tocas.", 'mia');
    setTimeout(() => {
      crearBurbuja("Ahora es mi turno.", 'alexa');
    }, 600);
    console.log("Clave maestra detectada. Núcleo disponible.");
  }
}

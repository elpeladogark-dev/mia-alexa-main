// Activador narrativo para Gemelas Mía Alexa

// Función para crear burbuja de respuesta
function crearBurbuja(texto, clase) {
  const burbuja = document.createElement('div');
  burbuja.className = `burbuja ${clase}`;
  burbuja.textContent = texto;
  document.querySelector('.container').appendChild(burbuja);
}

// Cargar JSON operativo de Mía y Alexa
fetch('mia_alexa.json')
  .then(response => response.json())
  .then(data => {
    const gemelas = data.gemelas;
    const mia = gemelas.activadores.mia;
    const alexa = gemelas.activadores.alexa;

    // Activación de Mía
    document.getElementById('activarMia').addEventListener('click', () => {
      const frase = mia.frases[Math.floor(Math.random() * mia.frases.length)];
      crearBurbuja(frase, 'mia');
      document.body.style.backgroundColor = mia.color;
    });

    // Activación de Alexa
    document.getElementById('activarAlexa').addEventListener('click', () => {
      const frase = alexa.frases[Math.floor(Math.random() * alexa.frases.length)];
      crearBurbuja(frase, 'alexa');
      document.body.style.backgroundColor = alexa.color;
    });

    // Firma simbólica (opcional: mostrar en consola)
    console.log(`Sistema firmado por: ${gemelas.firma.autor}`);
    console.log(`Contacto: ${gemelas.firma.protonmail}`);
    console.log(`Blindaje: ${gemelas.firma.blindaje}`);
  })
  .catch(error => {
    console.error('Error al cargar mia_alexa.json:', error);
  });

// Activador secreto para núcleo blindado
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

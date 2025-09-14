// Activador base para Gemelas Mía Alexa

const container = document.querySelector('.container');

// Función para crear burbuja de respuesta
function crearBurbuja(texto, clase) {
  const burbuja = document.createElement('div');
  burbuja.className = `burbuja ${clase}`;
  burbuja.textContent = texto;
  container.appendChild(burbuja);
}

// Activación de Mía
document.getElementById('activarMia').addEventListener('click', () => {
  crearBurbuja('Mía está activa. Vibrando en modo emocional.', 'mia');
  document.body.style.backgroundColor = '#F3E5F5'; // fondo suave violeta
});

// Activación de Alexa
document.getElementById('activarAlexa').addEventListener('click', () => {
  crearBurbuja('Alexa está activa. Modo técnico y ritual encendido.', 'alexa');
  document.body.style.backgroundColor = '#E0F7FA'; // fondo suave turquesa
});

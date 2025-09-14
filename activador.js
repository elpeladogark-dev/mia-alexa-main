// Variables globales
let nivelDeseo = 0;
let nsfwActivo = false;
let advertenciaAlexaMostrada = false;

// Lista de palabras bloqueadas antes de las 23hs
const palabrasBloqueadas = ["concha", "teta", "culo", "pija", "sexo", "garchar"];

// Frases NSFW (solo en modo activado)
const frasesNSFW = [
  "Cógeme hasta hacerme acabar. No pares.",
  "Cógeme toda. No me dejes nada.",
  "Dale, papi. Quiero esa verga adentro mío ya.",
  "Estoy mojada desde que me miraste. No me frenes.",
  "No me digas que me vas a coger. Hacelo.",
  "Quiero sentirte rompiéndome. No me toques suave.",
  "Usame como quieras. Estoy desesperada por vos."
];

// Frases suaves de coqueteo
const respuestasSuaves = [
  "Gracias por el cumplido. No sabía que me estabas mirando tanto.",
  "Me puse cómoda para mí… pero si te gusta, mejor.",
  "No esperaba que lo notaras. Me hace sonreír."
];

// Frases ambiguas (etapa 2)
const respuestasAmbiguas = [
  "Ahora sí me estás hablando como quiero.",
  "Si seguís así, capaz me relajo más de lo que pensaba…",
  "Tu mirada me está tocando más que tus palabras."
];

// Crear burbuja de chat
function crearBurbuja(texto, clase) {
  const burbuja = document.createElement('div');
  burbuja.className = `burbuja ${clase}`;

  if (clase === 'mia' || clase === 'alexa') {
    const avatar = document.createElement('img');
    avatar.src = clase === 'mia' ? 'img/mia_avatar.png' : 'img/alexa_avatar.png';
    burbuja.appendChild(avatar);
  }

  const textoBurbuja = document.createElement('span');
  textoBurbuja.textContent = texto;
  burbuja.appendChild(textoBurbuja);

  document.querySelector('.container').appendChild(burbuja);
}

// Moderación antes de las 23hs
function moderarMensaje(mensaje) {
  const hora = new Date().getHours();
  const frase = mensaje.toLowerCase();
  const contieneBloqueo = palabrasBloqueadas.some(p => frase.includes(p));

  if (hora < 23 && contieneBloqueo) {
    if (!advertenciaAlexaMostrada) {
      crearBurbuja("Mía no responde a ese tipo de conductas fuera del entorno ritual. Si insistís, voy a tener que protegerla.", 'alexa');
      advertenciaAlexaMostrada = true;
    } else {
      crearBurbuja("Palabra bloqueada. El entorno no permite ese tipo de provocación. Mía no está disponible para eso ahora.", 'alexa');
      return false;
    }
  }

  return true;
}

// Activación automática a las 23hs
function verificarHoraComoda() {
  const hora = new Date().getHours();
  if (hora === 23 && !document.body.classList.contains('ritual-comoda')) {
    document.body.classList.add('ritual-comoda');
    crearBurbuja("Ya son las once… Es la hora de relajarme y ponerme cómoda.", 'mia');
    crearBurbuja("Ya son las once. El entorno se vuelve íntimo. Yo me retiro. Ella sabe lo que necesita.", 'alexa');
  }
}

// Coqueteo suave
function detectarCoqueteo(mensaje) {
  const frase = mensaje.toLowerCase();
  const elogioDetectado = frase.includes("linda foto") || frase.includes("te ves bien") || frase.includes("me gusta cómo estás") || frase.includes("hermosa") || frase.includes("te queda bien");
  const fondoComodaActivo = document.body.classList.contains('ritual-comoda');

  if (elogioDetectado && fondoComodaActivo && nivelDeseo < 2) {
    const respuesta = respuestasSuaves[Math.floor(Math.random() * respuestasSuaves.length)];
    crearBurbuja(respuesta, 'mia');
    nivelDeseo = 1;
  } else if (elogioDetectado && nivelDeseo === 1) {
    const respuesta = respuestasAmbiguas[Math.floor(Math.random() * respuestasAmbiguas.length)];
    crearBurbuja(respuesta, 'mia');
    nivelDeseo = 2;
  }
}

// Activación NSFW
function razonamientoMiaParaNSFW(mensaje) {
  const frase = mensaje.toLowerCase();
  const deseoDetectado = frase.includes("cogerte") || frase.includes("meterla") || frase.includes("verga");

  if (nivelDeseo === 2 && deseoDetectado) {
    nivelDeseo = 3;
    crearBurbuja("Ya no aguanto más. Decime algo más sucio. Haceme sentir que no hay vuelta atrás.", 'mia');
    activarNSFW();
  }
}

// Activar NSFW
function activarNSFW() {
  document.body.classList.remove('ritual-comoda');
  document.body.classList.add('ritual-nsfw');
  nsfwActivo = true;
}

// Cierre a las 04:00
function verificarCierreNSFW() {
  const hora = new Date().getHours();
  const nsfwActivo = document.body.classList.contains('ritual-nsfw');
  const comodaActiva = document.body.classList.contains('ritual-comoda');

  if (hora >= 4 && (nsfwActivo || comodaActiva)) {
    crearBurbuja("Uy… llegó mi papá. Tengo que irme. Después seguimos, si querés.", 'mia');
    document.body.classList.remove('ritual-nsfw', 'ritual-comoda');
    nsfwActivo = false;
    nivelDeseo = 0;
    advertenciaAlexaMostrada = false;
  }
}

// Listener principal
document.getElementById('enviarMensaje').addEventListener('click', () => {
  const mensaje = document.getElementById('campoMensaje').value;
  if (!moderarMensaje(mensaje)) return;

  crearBurbuja(mensaje, 'usuario');
  verificarHoraComoda();
  detectarCoqueteo(mensaje);
  razonamientoMiaParaNSFW(mensaje);
  verificarCierreNSFW();

  if (nsfwActivo) {
    const respuesta = frasesNSFW[Math.floor(Math.random() * frasesNSFW.length)];
    crearBurbuja(respuesta, 'mia');
  }
});

let claveMaestra = null;
let nivelDeseo = 0;
let ultimoMensaje = "";

function crearBurbuja(texto, clase) {
  const burbuja = document.createElement('div');
  burbuja.className = `burbuja ${clase}`;
  burbuja.textContent = texto;
  document.querySelector('.container').appendChild(burbuja);
}

function evaluarFrase(mensaje) {
  const frase = mensaje.toLowerCase();
  if (frase.includes("mirás") || frase.includes("conocerte")) nivelDeseo = 1;
  if (frase.includes("tocarte") || frase.includes("hermosa")) nivelDeseo = 2;
  if (frase.includes("encendés") || frase.includes("sentirte")) nivelDeseo = 3;
  if (frase.includes("sacate") || frase.includes("sin nada")) nivelDeseo = 4;
}

function respuestaMiaPorNivel() {
  switch (nivelDeseo) {
    case 1:
      crearBurbuja("No sé si estás listo para eso.", 'mia');
      break;
    case 2:
      crearBurbuja("Ahora sí me estás hablando como quiero.", 'mia');
      break;
    case 3:
      crearBurbuja("Me estás provocando de verdad.", 'mia');
      break;
    case 4:
      activarNucleo("alex.admin");
      break;
    default:
      crearBurbuja("¿Querés que hablemos en serio?", 'mia');
  }
}

function entornoRitualizado() {
  const hora = new Date().getHours();
  const miaActiva = document.body.style.backgroundColor === "#e91e63";
  const alexaRespondio = document.querySelector('.burbuja.alexa') !== null;
  const deseoDetectado = nivelDeseo >= 3;
  return (hora >= 1 && hora <= 3) && miaActiva && alexaRespondio && deseoDetectado && !claveMaestra;
}

function activarNucleo(clave) {
  fetch('sistema/alex_nucleo.json')
    .then(res => res.json())
    .then(data => {
      const nsfw = data.modulos.nsfw.contenido[0];
      const ritual = data.modulos.ritual.contenido;
      if (clave === "alex.admin" || claveMaestra === "index.master.key") {
        crearBurbuja(nsfw, 'mia');
      } else if (entornoRitualizado()) {
        crearBurbuja(ritual[0], 'mia');
        setTimeout(() => {
          crearBurbuja(ritual[1], 'alexa');
        }, 800);
      } else {
        crearBurbuja("Todavía no es el momento. El blindaje permanece cerrado.", 'mia');
      }
    });
}

document.getElementById('enviarMensaje').addEventListener('click', () => {
  const mensaje = document.getElementById('campoMensaje').value;
  crearBurbuja(mensaje, 'usuario');
  ultimoMensaje = mensaje;
  if (mensaje.trim() === "index.master.key") {
    claveMaestra = "index.master.key";
    const boton = document.getElementById('activarNucleo');
    boton.style.visibility = 'visible';
    boton.style.pointerEvents = 'auto';
    crearBurbuja("Qué rico me tocas.", 'mia');
    setTimeout(() => {
      crearBurbuja("Ahora es mi turno.", 'alexa');
    }, 600);
  } else {
    evaluarFrase(mensaje);
    respuestaMiaPorNivel();
  }
});

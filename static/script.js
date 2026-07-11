// =========================
// SOBRE Y MÚSICA
// =========================

const contenedorSobre = document.getElementById("contenedorSobre");
const sobre = document.querySelector(".sobre-css");
const instruccion = document.getElementById("instruccion");
const portada = document.getElementById("portada");

const musica = document.getElementById("musica");
const botonMusica = document.getElementById("botonMusica");

let abierto = false;
let musicaSonando = false;


// ABRIR SOBRE

contenedorSobre.addEventListener("click", function () {

    if (abierto === true) {
        return;
    }

    abierto = true;

    sobre.classList.add("abierto");

    instruccion.textContent = "Abriendo invitación...";


    musica.play()
        .then(function () {

            musicaSonando = true;

            botonMusica.textContent = "❚❚";

            botonMusica.classList.add("reproduciendo");

        })
        .catch(function () {

            musicaSonando = false;

            botonMusica.textContent = "♫";

        });


    setTimeout(function () {

        instruccion.textContent =
            "Desliza para ver la invitación";

    }, 1200);


    setTimeout(function () {

        portada.scrollIntoView({
            behavior: "smooth"
        });

    }, 2200);

});


// BOTÓN DE MÚSICA

botonMusica.addEventListener("click", function () {

    if (musicaSonando === true) {

        musica.pause();

        musicaSonando = false;

        botonMusica.textContent = "♫";

        botonMusica.classList.remove("reproduciendo");

    } else {

        musica.play()
            .then(function () {

                musicaSonando = true;

                botonMusica.textContent = "❚❚";

                botonMusica.classList.add("reproduciendo");

            })
            .catch(function () {

                alert("No se pudo reproducir la música.");

            });

    }

});


// =========================
// CUENTA REGRESIVA
// =========================

const fechaFiesta = new Date("2026-08-15T16:00:00");

const dias = document.getElementById("dias");
const horas = document.getElementById("horas");
const minutos = document.getElementById("minutos");
const segundos = document.getElementById("segundos");


function actualizarContador() {

    const ahora = new Date();

    const diferencia = fechaFiesta - ahora;


    if (diferencia <= 0) {

        dias.textContent = "00";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";

        return;
    }


    const diasRestantes = Math.floor(
        diferencia / (1000 * 60 * 60 * 24)
    );

    const horasRestantes = Math.floor(
        (diferencia / (1000 * 60 * 60)) % 24
    );

    const minutosRestantes = Math.floor(
        (diferencia / (1000 * 60)) % 60
    );

    const segundosRestantes = Math.floor(
        (diferencia / 1000) % 60
    );


    dias.textContent =
        String(diasRestantes).padStart(2, "0");

    horas.textContent =
        String(horasRestantes).padStart(2, "0");

    minutos.textContent =
        String(minutosRestantes).padStart(2, "0");

    segundos.textContent =
        String(segundosRestantes).padStart(2, "0");

}


actualizarContador();

setInterval(actualizarContador, 1000);


// =========================
// GALERÍA
// =========================

const diapositivas =
    document.querySelectorAll(".diapositiva");

const puntos =
    document.querySelectorAll(".punto");

const flechaAnterior =
    document.getElementById("flechaAnterior");

const flechaSiguiente =
    document.getElementById("flechaSiguiente");

const carrusel =
    document.getElementById("carrusel");


let indiceActual = 0;

let cambioAutomatico;


function mostrarFoto(indice) {

    diapositivas.forEach(function (diapositiva) {

        diapositiva.classList.remove("activa");

    });


    puntos.forEach(function (punto) {

        punto.classList.remove("activo");

    });


    diapositivas[indice].classList.add("activa");

    puntos[indice].classList.add("activo");

    indiceActual = indice;

}


function siguienteFoto() {

    let nuevoIndice = indiceActual + 1;


    if (nuevoIndice >= diapositivas.length) {

        nuevoIndice = 0;

    }


    mostrarFoto(nuevoIndice);

}


function fotoAnterior() {

    let nuevoIndice = indiceActual - 1;


    if (nuevoIndice < 0) {

        nuevoIndice = diapositivas.length - 1;

    }


    mostrarFoto(nuevoIndice);

}


function iniciarCambioAutomatico() {

    cambioAutomatico = setInterval(function () {

        siguienteFoto();

    }, 4000);

}


function reiniciarCambioAutomatico() {

    clearInterval(cambioAutomatico);

    iniciarCambioAutomatico();

}


flechaSiguiente.addEventListener("click", function () {

    siguienteFoto();

    reiniciarCambioAutomatico();

});


flechaAnterior.addEventListener("click", function () {

    fotoAnterior();

    reiniciarCambioAutomatico();

});


puntos.forEach(function (punto) {

    punto.addEventListener("click", function () {

        const indice =
            Number(punto.dataset.indice);

        mostrarFoto(indice);

        reiniciarCambioAutomatico();

    });

});


// DESLIZAR CON EL DEDO

let inicioToque = 0;

let finalToque = 0;


carrusel.addEventListener(
    "touchstart",
    function (evento) {

        inicioToque =
            evento.changedTouches[0].clientX;

    }
);


carrusel.addEventListener(
    "touchend",
    function (evento) {

        finalToque =
            evento.changedTouches[0].clientX;

        const movimiento =
            inicioToque - finalToque;


        if (movimiento > 50) {

            siguienteFoto();

            reiniciarCambioAutomatico();

        }


        if (movimiento < -50) {

            fotoAnterior();

            reiniciarCambioAutomatico();

        }

    }
);


mostrarFoto(0);

iniciarCambioAutomatico();
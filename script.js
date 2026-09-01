/* =========================================
              FEMNOVA - SCRIPT
========================================= */


/* =========================================
              CARRUSEL
========================================= */

const slides = document.querySelectorAll(".slide");
const btnAnterior = document.querySelector(".anterior");
const btnSiguiente = document.querySelector(".siguiente");

let indice = 0;


/* =========================================
          MOSTRAR SLIDE
========================================= */

function mostrarSlide(i) {

    slides.forEach(function (slide) {
        slide.classList.remove("activo");
    });

    if (slides.length > 0) {
        slides[i].classList.add("activo");
    }
}


/* =========================================
              SIGUIENTE
========================================= */

function siguiente() {

    if (slides.length === 0) {
        return;
    }

    indice++;

    if (indice >= slides.length) {
        indice = 0;
    }

    mostrarSlide(indice);
}


/* =========================================
              ANTERIOR
========================================= */

function anterior() {

    if (slides.length === 0) {
        return;
    }

    indice--;

    if (indice < 0) {
        indice = slides.length - 1;
    }

    mostrarSlide(indice);
}


/* =========================================
          BOTONES DEL CARRUSEL
========================================= */

if (
    btnSiguiente &&
    btnAnterior &&
    slides.length > 0
) {

    btnSiguiente.addEventListener(
        "click",
        siguiente
    );

    btnAnterior.addEventListener(
        "click",
        anterior
    );

    setInterval(
        siguiente,
        3000
    );
}



/* =========================================
              CHATBOY
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =====================================
             ELEMENTOS DE CHATBOY
        ===================================== */

        const abrirChatboy =
            document.getElementById(
                "abrirChatboy"
            );

        const cerrarChatboy =
            document.getElementById(
                "cerrarChatboy"
            );

        const chatboyOverlay =
            document.getElementById(
                "chatboyOverlay"
            );

        const campoChatboy =
            document.getElementById(
                "mensajeChatboy"
            );

        const botonEnviarChatboy =
            document.getElementById(
                "enviarChatboy"
            );

        const mensajesChatboy =
            document.getElementById(
                "chatboyMensajes"
            );



        /* =====================================
                  ABRIR CHATBOY
        ===================================== */

        function abrirChat() {

            if (!chatboyOverlay) {
                return;
            }

            chatboyOverlay.classList.add(
                "activo"
            );

            chatboyOverlay.style.display =
                "flex";


            /*
                Poner el cursor automáticamente
                en el campo de escritura.
            */

            if (campoChatboy) {

                setTimeout(
                    function () {

                        campoChatboy.focus();

                    },
                    100
                );

            }

        }



        /* =====================================
                  CERRAR CHATBOY
        ===================================== */

        function cerrarChat() {

            if (!chatboyOverlay) {
                return;
            }

            chatboyOverlay.classList.remove(
                "activo"
            );

            chatboyOverlay.style.display =
                "none";

        }



        /* =====================================
                  BOTÓN ABRIR
        ===================================== */

        if (abrirChatboy) {

            abrirChatboy.addEventListener(
                "click",
                abrirChat
            );

        }



        /* =====================================
                  BOTÓN CERRAR
        ===================================== */

        if (cerrarChatboy) {

            cerrarChatboy.addEventListener(
                "click",
                cerrarChat
            );

        }



        /* =====================================
             CERRAR AL PULSAR AFUERA
        ===================================== */

        if (chatboyOverlay) {

            chatboyOverlay.addEventListener(
                "click",
                function (evento) {

                    if (
                        evento.target ===
                        chatboyOverlay
                    ) {

                        cerrarChat();

                    }

                }
            );

        }



        /* =====================================
                    TECLA ESC
        ===================================== */

        document.addEventListener(
            "keydown",
            function (evento) {

                if (
                    evento.key === "Escape"
                ) {

                    cerrarChat();

                }

            }
        );



        /* =====================================
                AGREGAR MENSAJE
        ===================================== */

        function agregarMensaje(
            texto,
            tipo
        ) {

            if (!mensajesChatboy) {
                return;
            }


            const mensaje =
                document.createElement(
                    "div"
                );


            mensaje.className =
                "mensaje-chatboy";


            /*
                Mensaje de la usuaria
            */

            if (
                tipo === "usuario"
            ) {

                mensaje.classList.add(
                    "mensaje-usuario"
                );

            }


            /*
                Mensaje de Chatboy
            */

            else {

                mensaje.classList.add(
                    "mensaje-recibido"
                );

            }


            mensaje.textContent =
                texto;


            mensajesChatboy.appendChild(
                mensaje
            );


            /*
                Bajar automáticamente
                hasta el último mensaje.
            */

            mensajesChatboy.scrollTop =
                mensajesChatboy.scrollHeight;

        }



        /* =====================================
             GENERAR RESPUESTA CHATBOY
        ===================================== */

        function generarRespuestaChatboy(
            texto
        ) {


            /*
                Convertir todo a minúsculas
                y quitar tildes.
            */

            const mensaje =
                texto
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(
                        /[\u0300-\u036f]/g,
                        ""
                    );



            /* =================================
                       SALUDOS
            ================================= */

            if (
                mensaje.includes("hola") ||
                mensaje.includes("buenas") ||
                mensaje.includes("hey")
            ) {

                return "Hola 💜 Me alegra que estés aquí. ¿Cómo te sientes hoy?";

            }



            /* =================================
                    ¿CÓMO ESTÁS?
            ================================= */

            if (
                mensaje.includes(
                    "como estas"
                ) ||
                mensaje.includes(
                    "cómo estás"
                )
            ) {

                return "Estoy aquí contigo y lista para escucharte ✨. ¿Cómo estás tú?";

            }



            /* =================================
                       TRISTEZA
            ================================= */

            if (
                mensaje.includes("triste") ||
                mensaje.includes("tristeza") ||
                mensaje.includes("llorar")
            ) {

                return "Siento que estés pasando por un momento así 💜. Si quieres, puedes contarme qué ocurrió. No tienes que explicarlo todo de una vez.";

            }



            /* =================================
                       ANSIEDAD
            ================================= */

            if (
                mensaje.includes("ansiedad") ||
                mensaje.includes("ansiosa") ||
                mensaje.includes("ansioso")
            ) {

                return "Gracias por contármelo 💜. Podemos ir paso a paso. ¿Qué es lo que más te preocupa en este momento?";

            }



            /* =================================
                         ESTRÉS
            ================================= */

            if (
                mensaje.includes("estres") ||
                mensaje.includes("estresada") ||
                mensaje.includes("estresado")
            ) {

                return "Parece que estás llevando muchas cosas encima 💜. ¿Qué es lo que más te está presionando ahora?";

            }



            /* =================================
                         SOLEDAD
            ================================= */

            if (
                mensaje.includes("sola") ||
                mensaje.includes("solo") ||
                mensaje.includes("soledad")
            ) {

                return "Sentirse sola puede ser difícil 💜. Gracias por confiarme esto. ¿Quieres contarme un poco más?";

            }



            /* =================================
                        CANSANCIO
            ================================= */

            if (
                mensaje.includes("cansada") ||
                mensaje.includes("cansado") ||
                mensaje.includes("agotada") ||
                mensaje.includes("agotado")
            ) {

                return "Parece que has estado llevando bastante peso 💜. ¿Ha sido algo de hoy o llevas varios días así?";

            }



            /* =================================
                       PREOCUPACIÓN
            ================================= */

            if (
                mensaje.includes(
                    "preocupada"
                ) ||
                mensaje.includes(
                    "preocupado"
                ) ||
                mensaje.includes(
                    "preocupacion"
                ) ||
                mensaje.includes("miedo") ||
                mensaje.includes("temor")
            ) {

                return "Gracias por confiarme lo que estás sintiendo 💜. Podemos hablarlo con calma. ¿Qué es lo que más te preocupa?";

            }



            /* =================================
                     NO SÉ QUÉ HACER
            ================================= */

            if (
                mensaje.includes("no se") ||
                mensaje.includes("que hago") ||
                mensaje.includes("no puedo")
            ) {

                return "No tienes que encontrar todas las respuestas ahora mismo ✨. Podemos ir paso a paso. Cuéntame qué ocurrió.";

            }



            /* =================================
                         IGUALDAD
            ================================= */

            if (
                mensaje.includes("igualdad") ||
                mensaje.includes("respeto") ||
                mensaje.includes("discriminacion")
            ) {

                return "En FEMNOVA creemos que todas las personas merecen respeto, igualdad y oportunidades. 💜";

            }



            /* =================================
                       ACOSO
            ================================= */

            if (
                mensaje.includes("acoso") ||
                mensaje.includes("bullying")
            ) {

                return "El acoso no está bien y no es culpa de quien lo recibe. 💜 Busca apoyo en una persona adulta de confianza.";

            }



            /* =================================
                         FEMNOVA
            ================================= */

            if (
                mensaje.includes("femnova") ||
                mensaje.includes("modulo") ||
                mensaje.includes("juego")
            ) {

                return "Puedes explorar los módulos y juegos de FEMNOVA para aprender de una forma interactiva. ✨";

            }



            /* =================================
                    RESPUESTA GENERAL
            ================================= */

            return "Gracias por contármelo 💜. Estoy aquí para escucharte. ¿Quieres contarme un poco más sobre lo que estás viviendo?";

        }



        /* =====================================
                  ENVIAR MENSAJE
        ===================================== */

        function enviarMensajeChatboy() {

            if (
                !campoChatboy ||
                !mensajesChatboy
            ) {

                return;

            }


            const texto =
                campoChatboy.value.trim();


            /*
                No enviar mensajes vacíos.
            */

            if (texto === "") {

                return;

            }


            /*
                Mostrar mensaje de la usuaria.
            */

            agregarMensaje(
                texto,
                "usuario"
            );


            /*
                Limpiar campo.
            */

            campoChatboy.value = "";


            /*
                Desactivar temporalmente
                el botón mientras responde.
            */

            if (botonEnviarChatboy) {

                botonEnviarChatboy.disabled =
                    true;

            }


            /*
                Simular respuesta de Chatboy.
            */

            setTimeout(
                function () {

                    const respuesta =
                        generarRespuestaChatboy(
                            texto
                        );


                    agregarMensaje(
                        respuesta,
                        "chatboy"
                    );


                    /*
                        Volver a activar
                        el botón.
                    */

                    if (
                        botonEnviarChatboy
                    ) {

                        botonEnviarChatboy.disabled =
                            false;

                    }


                    /*
                        Volver al campo.
                    */

                    campoChatboy.focus();

                },
                700
            );

        }



        /* =====================================
                    BOTÓN ENVIAR
        ===================================== */

        if (
            botonEnviarChatboy
        ) {

            botonEnviarChatboy.addEventListener(
                "click",
                enviarMensajeChatboy
            );

        }



        /* =====================================
                       ENTER
        ===================================== */

        if (
            campoChatboy
        ) {

            campoChatboy.addEventListener(
                "keydown",
                function (evento) {

                    if (
                        evento.key ===
                            "Enter" &&
                        !evento.shiftKey
                    ) {

                        evento.preventDefault();

                        enviarMensajeChatboy();

                    }

                }
            );

        }

    }
);

/* =========================================================
        HISTORIA — TEXTO DE LOS ESPEJOS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    function iniciarCarruselTexto(id) {

        const contenedor =
            document.getElementById(id);

        if (!contenedor) {
            return;
        }

        const frases =
            contenedor.querySelectorAll(
                ".texto-frase"
            );

        if (frases.length <= 1) {
            return;
        }

        let actual = 0;

        setInterval(function () {

            frases[actual].classList.remove(
                "activa"
            );

            actual++;

            if (
                actual >= frases.length
            ) {
                actual = 0;
            }

            frases[actual].classList.add(
                "activa"
            );

        }, 3800);

    }


    iniciarCarruselTexto(
        "textoLumi"
    );

    iniciarCarruselTexto(
        "textoRivera"
    );

});


/* =========================================================
        ACCESO — INICIAR SESIÓN / CREAR CUENTA
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const vistaBienvenida =
        document.getElementById("vistaBienvenida");

    const vistaLogin =
        document.getElementById("vistaLogin");

    const vistaRegistro =
        document.getElementById("vistaRegistro");


    const btnMostrarLogin =
        document.getElementById("btnMostrarLogin");

    const btnMostrarRegistro =
        document.getElementById("btnMostrarRegistro");

    const btnIrRegistro =
        document.getElementById("btnIrRegistro");

    const btnIrLogin =
        document.getElementById("btnIrLogin");

    const btnVolverBienvenidaLogin =
        document.getElementById(
            "btnVolverBienvenidaLogin"
        );

    const btnVolverBienvenidaRegistro =
        document.getElementById(
            "btnVolverBienvenidaRegistro"
        );


    function mostrarVista(vista) {

        if (!vistaBienvenida ||
            !vistaLogin ||
            !vistaRegistro) {

            return;
        }


        vistaBienvenida.classList.add(
            "oculta"
        );

        vistaLogin.classList.add(
            "oculta"
        );

        vistaRegistro.classList.add(
            "oculta"
        );


        vista.classList.remove(
            "oculta"
        );

    }


    /* =====================================
          BOTONES DE NAVEGACIÓN
    ====================================== */

    if (btnMostrarLogin) {

        btnMostrarLogin.addEventListener(
            "click",
            function () {

                mostrarVista(
                    vistaLogin
                );

            }
        );

    }


    if (btnMostrarRegistro) {

        btnMostrarRegistro.addEventListener(
            "click",
            function () {

                mostrarVista(
                    vistaRegistro
                );

            }
        );

    }


    if (btnIrRegistro) {

        btnIrRegistro.addEventListener(
            "click",
            function () {

                mostrarVista(
                    vistaRegistro
                );

            }
        );

    }


    if (btnIrLogin) {

        btnIrLogin.addEventListener(
            "click",
            function () {

                mostrarVista(
                    vistaLogin
                );

            }
        );

    }


    if (btnVolverBienvenidaLogin) {

        btnVolverBienvenidaLogin.addEventListener(
            "click",
            function () {

                mostrarVista(
                    vistaBienvenida
                );

            }
        );

    }


    if (btnVolverBienvenidaRegistro) {

        btnVolverBienvenidaRegistro.addEventListener(
            "click",
            function () {

                mostrarVista(
                    vistaBienvenida
                );

            }
        );

    }


    /* =====================================
              CREAR CUENTA
    ====================================== */

    const formRegistro =
        document.getElementById(
            "formRegistro"
        );


    if (formRegistro) {

        formRegistro.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                const nombre =
                    document.getElementById(
                        "registroNombre"
                    ).value.trim();


                const correo =
                    document.getElementById(
                        "registroCorreo"
                    ).value.trim();


                const clave =
                    document.getElementById(
                        "registroClave"
                    ).value;


                const clave2 =
                    document.getElementById(
                        "registroClave2"
                    ).value;


                const mensaje =
                    document.getElementById(
                        "mensajeRegistro"
                    );


                if (clave !== clave2) {

                    mensaje.textContent =
                        "Las contraseñas no coinciden.";

                    return;
                }


                const usuario = {

                    nombre:
                        nombre,

                    correo:
                        correo,

                    clave:
                        clave

                };


                localStorage.setItem(
                    "usuarioFemnova",
                    JSON.stringify(usuario)
                );


                mensaje.textContent =
                    "Cuenta creada correctamente ✦";


                setTimeout(
                    function () {

                        mostrarVista(
                            vistaLogin
                        );

                        document.getElementById(
                            "loginCorreo"
                        ).value =
                            correo;

                    },
                    900
                );

            }
        );

    }


    /* =====================================
              INICIAR SESIÓN
    ====================================== */

    const formLogin =
        document.getElementById(
            "formLogin"
        );


    if (formLogin) {

        formLogin.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();


                const correo =
                    document.getElementById(
                        "loginCorreo"
                    ).value.trim();


                const clave =
                    document.getElementById(
                        "loginClave"
                    ).value;


                const mensaje =
                    document.getElementById(
                        "mensajeLogin"
                    );


                const datosGuardados =
                    localStorage.getItem(
                        "usuarioFemnova"
                    );


                if (!datosGuardados) {

                    mensaje.textContent =
                        "Primero debes crear una cuenta.";

                    return;

                }


                const usuario =
                    JSON.parse(
                        datosGuardados
                    );


                if (
                    correo === usuario.correo &&
                    clave === usuario.clave
                ) {


                    localStorage.setItem(
                        "sesionFemnova",
                        "activa"
                    );


                    mensaje.textContent =
                        "Bienvenida a FEMNOVA ✦";


                    setTimeout(
                        function () {

                            window.location.href =
                                "inicio.html";

                        },
                        900
                    );

                }

                else {

                    mensaje.textContent =
                        "El correo o la contraseña no coinciden.";

                }

            }
        );

    }

});
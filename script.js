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

function mostrarSlide(i) {

    slides.forEach(function (slide) {
        slide.classList.remove("activo");
    });

    if (slides.length > 0 && slides[i]) {
        slides[i].classList.add("activo");
    }
}

function siguiente() {

    if (slides.length === 0) return;

    indice++;

    if (indice >= slides.length) {
        indice = 0;
    }

    mostrarSlide(indice);
}

function anterior() {

    if (slides.length === 0) return;

    indice--;

    if (indice < 0) {
        indice = slides.length - 1;
    }

    mostrarSlide(indice);
}

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


/* =========================================================
        CHATBOY — RIVERA
        ACOMPAÑAMIENTO EMOCIONAL
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =========================================
              ELEMENTOS DE CHATBOY
        ========================================= */

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


        /*
            Memoria sencilla de la conversación.

            Rivera no reinicia completamente el contexto
            cada vez que recibe un mensaje.
        */

        const conversacion = [];

        let ultimoTema = "general";

        let ultimaPreguntaRivera = "";


        /* =========================================
                ABRIR CHATBOY
        ========================================= */

        function abrirChat() {

            if (!chatboyOverlay) {
                return;
            }

            chatboyOverlay.style.display =
                "flex";

            chatboyOverlay.classList.add(
                "activo"
            );

            setTimeout(
                function () {

                    if (campoChatboy) {
                        campoChatboy.focus();
                    }

                },
                100
            );
        }


        /* =========================================
                CERRAR CHATBOY
        ========================================= */

        function cerrarChat() {

            if (!chatboyOverlay) {
                return;
            }

            chatboyOverlay.style.display =
                "none";

            chatboyOverlay.classList.remove(
                "activo"
            );
        }


        /* =========================================
                BOTÓN ABRIR
        ========================================= */

        if (abrirChatboy) {

            abrirChatboy.addEventListener(
                "click",
                abrirChat
            );
        }


        /* =========================================
                BOTÓN CERRAR
        ========================================= */

        if (cerrarChatboy) {

            cerrarChatboy.addEventListener(
                "click",
                cerrarChat
            );
        }


        /* =========================================
                CERRAR AL HACER CLIC AFUERA
        ========================================= */

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


        /* =========================================
                TECLA ESC
        ========================================= */

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


        /* =========================================
                AGREGAR MENSAJE
        ========================================= */

        function agregarMensaje(
            texto,
            tipo
        ) {

            if (
                !mensajesChatboy ||
                !texto
            ) {

                return;
            }

            const mensaje =
                document.createElement(
                    "div"
                );

            mensaje.classList.add(
                "mensaje-chatboy"
            );


            if (
                tipo === "usuario"
            ) {

                mensaje.classList.add(
                    "mensaje-usuario"
                );

            }
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


            mensajesChatboy.scrollTop =
                mensajesChatboy.scrollHeight;


            mensaje.classList.add(
                "mensaje-nuevo"
            );


            setTimeout(
                function () {

                    mensaje.classList.remove(
                        "mensaje-nuevo"
                    );

                },
                650
            );
        }


        /* =========================================
                INDICADOR DE ESCRITURA
        ========================================= */

        function mostrarIndicador() {

            if (
                !mensajesChatboy
            ) {

                return null;
            }

            const anteriorIndicador =
                document.getElementById(
                    "indicadorRivera"
                );


            if (
                anteriorIndicador
            ) {

                anteriorIndicador.remove();
            }


            const indicador =
                document.createElement(
                    "div"
                );


            indicador.id =
                "indicadorRivera";


            indicador.classList.add(
                "indicador-escribiendo"
            );


            indicador.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;


            mensajesChatboy.appendChild(
                indicador
            );


            mensajesChatboy.scrollTop =
                mensajesChatboy.scrollHeight;


            return indicador;
        }


        /* =========================================
                NORMALIZAR TEXTO
        ========================================= */

        function normalizarTexto(
            texto
        ) {

            return texto

                .toLowerCase()

                .normalize("NFD")

                .replace(
                    /[\u0300-\u036f]/g,
                    ""
                )

                .replace(
                    /[¿?¡!.,;:()[\]{}"']/g,
                    " "
                )

                .replace(
                    /\s+/g,
                    " "
                )

                .trim();
        }


        /* =========================================
                DETECTAR NEGACIÓN
        ========================================= */

        function fraseEstaNegada(
            texto,
            frase
        ) {

            const t =
                normalizarTexto(
                    texto
                );


            const posicion =
                t.indexOf(frase);


            if (
                posicion === -1
            ) {

                return false;
            }


            const antes =
                t.substring(
                    Math.max(
                        0,
                        posicion - 25
                    ),
                    posicion
                );


            return (

                antes.includes(
                    "no "
                )

                ||

                antes.includes(
                    "nunca "
                )

                ||

                antes.includes(
                    "jamas "
                )

                ||

                antes.includes(
                    "ya no "
                )

            );
        }


        /* =========================================
                DETECTAR SITUACIÓN DE RIESGO
        ========================================= */

        function detectarSituacionRiesgo(
            texto
        ) {

            const mensaje =
                normalizarTexto(
                    texto
                );


            const expresiones = [

                "me quiero matar",

                "quiero matarme",

                "quiero morir",

                "me quiero morir",

                "quiero quitarme la vida",

                "quiero acabar con mi vida",

                "no quiero seguir viviendo",

                "quiero hacerme dano",

                "me quiero hacer dano",

                "quiero lastimarme",

                "quiero herirme",

                "voy a hacerme dano",

                "voy a matarme"

            ];


            for (
                const expresion
                of expresiones
            ) {

                if (
                    !mensaje.includes(
                        expresion
                    )
                ) {

                    continue;
                }


                if (
                    fraseEstaNegada(
                        mensaje,
                        expresion
                    )
                ) {

                    continue;
                }


                return true;
            }


            return false;
        }


        /* =========================================
                DETECTAR TEMA
        ========================================= */

        function detectarTema(
            texto
        ) {

            const mensaje =
                normalizarTexto(
                    texto
                );


            /* -------- FAMILIA -------- */

            if (

                mensaje.includes("mama") ||

                mensaje.includes("papa") ||

                mensaje.includes("familia") ||

                mensaje.includes("padres") ||

                mensaje.includes("hermano") ||

                mensaje.includes("hermana")

            ) {

                return "familia";
            }


            /* -------- AMISTADES -------- */

            if (

                mensaje.includes("amigo") ||

                mensaje.includes("amiga") ||

                mensaje.includes("amistad") ||

                mensaje.includes("amigos") ||

                mensaje.includes("amigas")

            ) {

                return "amistades";
            }


            /* -------- COLEGIO -------- */

            if (

                mensaje.includes("colegio") ||

                mensaje.includes("escuela") ||

                mensaje.includes("clase") ||

                mensaje.includes("profesor") ||

                mensaje.includes("profesora") ||

                mensaje.includes("acoso") ||

                mensaje.includes("bullying") ||

                mensaje.includes("se burlan") ||

                mensaje.includes("me molestan")

            ) {

                return "colegio";
            }


            /* -------- ANSIEDAD -------- */

            if (

                mensaje.includes("ansiedad") ||

                mensaje.includes("ansioso") ||

                mensaje.includes("ansiosa") ||

                mensaje.includes("nervioso") ||

                mensaje.includes("nerviosa") ||

                mensaje.includes("ataque de ansiedad")

            ) {

                return "ansiedad";
            }


            /* -------- TRISTEZA -------- */

            if (

                mensaje.includes("triste") ||

                mensaje.includes("tristeza") ||

                mensaje.includes("llorar") ||

                mensaje.includes("llorando")

            ) {

                return "tristeza";
            }


            /* -------- MIEDO -------- */

            if (

                mensaje.includes("miedo") ||

                mensaje.includes("asustado") ||

                mensaje.includes("asustada") ||

                mensaje.includes("temor")

            ) {

                return "miedo";
            }


            /* -------- ENOJO -------- */

            if (

                mensaje.includes("rabia") ||

                mensaje.includes("enojado") ||

                mensaje.includes("enojada") ||

                mensaje.includes("bravo") ||

                mensaje.includes("brava") ||

                mensaje.includes("molesto") ||

                mensaje.includes("molesta")

            ) {

                return "enojo";
            }


            /* -------- SOLEDAD -------- */

            if (

                mensaje.includes("solo") ||

                mensaje.includes("sola") ||

                mensaje.includes("soledad") ||

                mensaje.includes("nadie me")

            ) {

                return "soledad";
            }


            /* -------- ESTRÉS -------- */

            if (

                mensaje.includes("estres") ||

                mensaje.includes("presionado") ||

                mensaje.includes("presionada") ||

                mensaje.includes("no puedo con todo") ||

                mensaje.includes("demasiadas cosas")

            ) {

                return "estres";
            }


            /* -------- CULPA -------- */

            if (

                mensaje.includes("culpable") ||

                mensaje.includes("culpa mia") ||

                mensaje.includes("es mi culpa")

            ) {

                return "culpa";
            }


            /* -------- FRUSTRACIÓN -------- */

            if (

                mensaje.includes("frustrado") ||

                mensaje.includes("frustrada") ||

                mensaje.includes("nada me sale")

            ) {

                return "frustracion";
            }


            /* -------- AUTOESTIMA -------- */

            if (

                mensaje.includes("no valgo") ||

                mensaje.includes("no sirvo") ||

                mensaje.includes("soy un fracaso") ||

                mensaje.includes("no soy suficiente")

            ) {

                return "autoestima";
            }


            /* -------- DOLOR -------- */

            if (

                mensaje.includes("pecho") ||

                mensaje.includes("me duele") ||

                mensaje.includes("dolor")

            ) {

                return "dolor";
            }


            return "general";
        }


        /* =========================================
                RESPUESTA DE SEGURIDAD
        ========================================= */

        function respuestaSeguridad(
            texto
        ) {

            const mensaje =
                normalizarTexto(
                    texto
                );


            const hablaDeOtraPersona =

                mensaje.includes(
                    "mi amiga"
                )

                ||

                mensaje.includes(
                    "mi amigo"
                )

                ||

                mensaje.includes(
                    "mi hermana"
                )

                ||

                mensaje.includes(
                    "mi hermano"
                )

                ||

                mensaje.includes(
                    "una amiga"
                )

                ||

                mensaje.includes(
                    "un amigo"
                )

                ||

                mensaje.includes(
                    "alguien"
                );


            if (
                hablaDeOtraPersona
            ) {

                return "Eso que me cuentas es importante. No deberías tener que manejar una situación así tú sola o tú solo. Busca a un adulto de confianza y cuéntale lo que está pasando para que pueda acompañarte y ayudarte a buscar apoyo.";
            }


            return "Oye… gracias por confiarme algo tan importante. No quiero que pases por esto a solas. Busca ahora mismo a un adulto de confianza y cuéntale cómo te estás sintiendo. También puedes comunicarte con la Línea 106 de salud mental para recibir orientación y apoyo profesional. 💜";
        }


        /* =========================================
                RESPUESTAS CORTAS
                SEGÚN LA PREGUNTA ANTERIOR
        ========================================= */

        function respuestaCorta(
            mensaje
        ) {

            const esSi =

                mensaje === "si"

                ||

                mensaje === "sii"

                ||

                mensaje === "sip"

                ||

                mensaje === "claro";


            const esNo =

                mensaje === "no"

                ||

                mensaje === "nop";


            if (
                !esSi &&
                !esNo
            ) {

                return null;
            }


            /* -------- PREGUNTA DE FRECUENCIA -------- */

            if (
                ultimaPreguntaRivera ===
                "frecuencia"
            ) {

                if (esSi) {

                    if (
                        ultimoTema ===
                        "general"
                    ) {

                        ultimoTema =
                            "colegio";
                    }

                    ultimaPreguntaRivera =
                        "";

                    return "Ya veo… entonces no fue algo aislado. Eso sí merece que alguien de confianza sepa lo que está pasando.";
                }


                ultimaPreguntaRivera =
                    "";

                return "Bueno, al menos no está ocurriendo seguido. Aun así, entiendo que te haya afectado.";
            }


            /* -------- PREGUNTA DE HOY -------- */

            if (
                ultimaPreguntaRivera ===
                "hoy"
            ) {

                if (esSi) {

                    ultimaPreguntaRivera =
                        "";

                    return "Entiendo… entonces todavía lo tienes bastante reciente.";
                }


                ultimaPreguntaRivera =
                    "";

                return "Ya veo. Entonces llevas un poquito más de tiempo con eso encima.";
            }


            /* -------- PERSONA DE CONFIANZA -------- */

            if (
                ultimaPreguntaRivera ===
                "persona_confianza"
            ) {

                if (esSi) {

                    ultimaPreguntaRivera =
                        "";

                    return "Eso puede ser de mucha ayuda. Tener a alguien con quien hablar cambia bastante las cosas.";
                }


                ultimaPreguntaRivera =
                    "";

                return "Entiendo… entonces sería bueno pensar en una persona adulta con quien puedas sentirte segura o seguro.";
            }


            /* -------- QUIERE HABLAR -------- */

            if (
                ultimaPreguntaRivera ===
                "quiere_hablar"
            ) {

                if (esSi) {

                    ultimaPreguntaRivera =
                        "";

                    return "Perfecto. No tienes que ordenar todo antes de hablar; puedes empezar por lo primero que te salga.";
                }


                ultimaPreguntaRivera =
                    "";

                return "Está bien. No tienes que hablar de eso ahora mismo.";
            }


            /* -------- CÓMO TE SIENTES -------- */

            if (
                ultimaPreguntaRivera ===
                "como_te_sientes"
            ) {

                if (esSi) {

                    ultimaPreguntaRivera =
                        "";

                    return "Me alegra que me lo digas. Aunque sea poquito, ya estás poniendo en palabras cómo te sientes.";
                }


                ultimaPreguntaRivera =
                    "";

                return "Está bien. A veces uno ni siquiera sabe cómo explicarlo.";
            }


            /* -------- RESPUESTAS CORTAS GENERALES -------- */

            if (esSi) {

                const opciones = [

                    "Ya… entiendo.",

                    "Vale, te sigo.",

                    "Sí, tiene sentido.",

                    "Mmm, ya veo por dónde va.",

                    "Entiendo lo que me dices."

                ];


                return opciones[
                    Math.floor(
                        Math.random() *
                        opciones.length
                    )
                ];
            }


            const opcionesNo = [

                "Está bien, no pasa nada.",

                "Entiendo. No tienes que explicar eso ahora.",

                "Vale, lo dejamos ahí por el momento.",

                "Está bien, podemos hablar de otra cosa."

            ];


            return opcionesNo[
                Math.floor(
                    Math.random() *
                    opcionesNo.length
                )
            ];
        }


        /* =========================================
                GENERAR RESPUESTA DE RIVERA
        ========================================= */

        function generarRespuestaChatboy(
            texto
        ) {

            const mensaje =
                normalizarTexto(
                    texto
                );


            /* =====================================
                    SEGURIDAD — PRIORIDAD MÁXIMA
            ===================================== */

            if (
                detectarSituacionRiesgo(
                    texto
                )
            ) {

                ultimaPreguntaRivera =
                    "";

                return respuestaSeguridad(
                    texto
                );
            }


            /* =====================================
                    DETECTAR NUEVO TEMA
            ===================================== */

            const nuevoTema =
                detectarTema(
                    texto
                );


            if (
                nuevoTema !==
                "general"
            ) {

                ultimoTema =
                    nuevoTema;
            }


            /* =====================================
                    SALUDO
            ===================================== */

            if (

                mensaje === "hola"

                ||

                mensaje === "holaa"

                ||

                mensaje === "holaaa"

                ||

                mensaje === "hey"

                ||

                mensaje === "buenas"

            ) {

                ultimaPreguntaRivera =
                    "como_te_sientes";

                return "Holaa ✦ Qué bueno verte por aquí. ¿Cómo estás?";
            }


            /* =====================================
                    RESPUESTA CORTA
            ===================================== */

            const respuestaBreve =
                respuestaCorta(
                    mensaje
                );


            if (
                respuestaBreve
            ) {

                return respuestaBreve;
            }


            /* =====================================
                    ¿QUÉ HAGO?
            ===================================== */

            if (

                mensaje === "que hago"

                ||

                mensaje ===
                "y ahora que hago"

                ||

                mensaje ===
                "ahora que hago"

                ||

                mensaje.includes(
                    "no se que hacer"
                )

            ) {

                ultimaPreguntaRivera =
                    "";


                if (
                    ultimoTema ===
                    "colegio"
                ) {

                    return "Primero no tienes que enfrentarlo todo sola o solo. Busca a un adulto de confianza del colegio o de casa y cuéntale exactamente qué está pasando. También podemos pensar qué podrías decirle.";
                }


                if (
                    ultimoTema ===
                    "amistades"
                ) {

                    return "Yo empezaría por darte un poquito de espacio para pensar qué necesitas tú. No tienes que resolver toda la situación de golpe.";
                }


                if (
                    ultimoTema ===
                    "familia"
                ) {

                    return "Antes de intentar arreglarlo todo, creo que vale la pena darte un momento para tranquilizarte. Después puedes decidir con quién hablar y qué quieres decir.";
                }


                return "Depende mucho de lo que esté pasando, pero no tienes que resolverlo todo de una vez. Podemos pensar una opción a la vez.";
            }


            /* =====================================
                    MAL / NO ESTOY BIEN
            ===================================== */

            if (

                mensaje === "mal"

                ||

                mensaje ===
                "muy mal"

                ||

                mensaje ===
                "no estoy bien"

                ||

                mensaje.includes(
                    "estoy mal"
                )

                ||

                mensaje.includes(
                    "me siento mal"
                )

            ) {

                ultimaPreguntaRivera =
                    "";

                return "Mmm… entonces hoy no está siendo un día muy bueno para ti. ¿Pasó algo?";
            }


            /* =====================================
                    TRISTEZA
            ===================================== */

            if (
                ultimoTema ===
                "tristeza"
            ) {

                ultimaPreguntaRivera =
                    "";


                if (
                    conversacion.length >=
                    3
                ) {

                    return "Sí… ya entiendo un poquito mejor. No parece que haya sido cualquier cosa. ¿Qué fue lo que más te dolió de todo eso?";
                }


                return "Ay… lo siento. Hay cosas que de verdad pueden dejar el ánimo por el suelo. ¿Qué pasó?";
            }


            /* =====================================
                    ANSIEDAD
            ===================================== */

            if (
                ultimoTema ===
                "ansiedad"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Uf… cuando la ansiedad se mete en medio, hasta las cosas pequeñas pueden sentirse enormes. ¿Qué es lo que más te está preocupando ahora?";
            }


            /* =====================================
                    MIEDO
            ===================================== */

            if (
                ultimoTema ===
                "miedo"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Entiendo… tener miedo de algo puede sentirse bastante pesado. ¿Qué pasó para que te sintieras así?";
            }


            /* =====================================
                    ENOJO
            ===================================== */

            if (
                ultimoTema ===
                "enojo"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Uy… sí parece que eso te hizo enojar de verdad. ¿Fue por algo que te dijeron o por algo que hicieron?";
            }


            /* =====================================
                    SOLEDAD
            ===================================== */

            if (
                ultimoTema ===
                "soledad"
            ) {

                ultimaPreguntaRivera =
                    "persona_confianza";

                return "Debe sentirse pesado cuando parece que no tienes con quién hablar. ¿Hay alguien con quien sí te sientas un poquito segura o seguro?";
            }


            /* =====================================
                    FAMILIA
            ===================================== */

            if (
                ultimoTema ===
                "familia"
            ) {

                ultimaPreguntaRivera =
                    "hoy";

                return "Entiendo… con la familia las cosas suelen sentirse más fuertes. ¿Pasó hoy o ya venías sintiéndote así desde hace un tiempo?";
            }


            /* =====================================
                    AMISTADES
            ===================================== */

            if (
                ultimoTema ===
                "amistades"
            ) {

                ultimaPreguntaRivera =
                    "quiere_hablar";

                return "Uf… lo que pasa con los amigos puede doler bastante. ¿Has podido hablar con esa persona de lo que pasó?";
            }


            /* =====================================
                    COLEGIO
            ===================================== */

            if (
                ultimoTema ===
                "colegio"
            ) {

                ultimaPreguntaRivera =
                    "frecuencia";

                return "Eso no suena nada bien. Que se burlen de ti o te hagan sentir mal no está bien. ¿Te está pasando seguido o fue algo de hoy?";
            }


            /* =====================================
                    ESTRÉS
            ===================================== */

            if (
                ultimoTema ===
                "estres"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Parece que tienes demasiadas cosas encima al mismo tiempo. No hace falta resolverlas todas ahora. ¿Cuál es la que más te está pesando?";
            }


            /* =====================================
                    CULPA
            ===================================== */

            if (
                ultimoTema ===
                "culpa"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Entiendo… cuando algo sale mal es muy fácil pensar inmediatamente que todo fue culpa de uno. ¿Qué pasó exactamente?";
            }


            /* =====================================
                    FRUSTRACIÓN
            ===================================== */

            if (
                ultimoTema ===
                "frustracion"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Sí… eso desespera bastante cuando llevas intentando que algo salga bien. ¿Qué fue lo que salió diferente a lo que esperabas?";
            }


            /* =====================================
                    AUTOESTIMA
            ===================================== */

            if (
                ultimoTema ===
                "autoestima"
            ) {

                ultimaPreguntaRivera =
                    "";

                return "Ey… que estés pasando por un momento difícil no significa que valgas menos. Quiero entender qué fue lo que te hizo pensar eso de ti.";
            }


            /* =====================================
                    DOLOR FÍSICO
            ===================================== */

            if (
                ultimoTema ===
                "dolor"
            ) {

                ultimaPreguntaRivera =
                    "";


                if (

                    mensaje.includes(
                        "pecho"
                    )

                    ||

                    mensaje.includes(
                        "corazon"
                    )

                ) {

                    return "Si tienes dolor en el pecho, especialmente si es fuerte, repentino o te preocupa, avísale a un adulto de confianza para que pueda ayudarte. Y si esto también tiene que ver con cómo te estás sintiendo, puedes explicarme qué estaba pasando antes.";
                }


                return "Si el dolor es fuerte, empeora o te preocupa, avísale a un adulto de confianza para que puedan ayudarte. ¿Te empezó hoy o llevas un tiempo sintiéndolo?";
            }


            /* =====================================
                    PREGUNTAS DEL USUARIO
            ===================================== */

            if (
                mensaje.endsWith("?")
            ) {

                ultimaPreguntaRivera =
                    "";


                if (

                    mensaje.includes(
                        "como estas"
                    )

                    ||

                    mensaje.includes(
                        "como te sientes"
                    )

                ) {

                    return "Yo estoy bien ✦ Pero gracias por preguntar. Me importa saber cómo estás tú.";
                }


                return "Mmm… buena pregunta. Creo que lo importante aquí es lo que está pasando contigo. ¿Qué te hizo preguntarte eso?";
            }


            /* =====================================
                    RESPUESTAS GENERALES
            ===================================== */

            const respuestasGenerales = [

                "Ya veo… creo que entiendo mejor lo que quieres decir.",

                "Mmm… ahora tiene un poquito más de sentido.",

                "Entiendo. Eso que acabas de decir sí cambia un poco la situación.",

                "Sí, te sigo. Hay algo importante en lo que me acabas de contar.",

                "Ya… entiendo por qué eso te pudo afectar.",

                "Tiene sentido que lo veas así.",

                "Hmm… creo que ya voy entendiendo por dónde va todo.",

                "Vale, entiendo lo que me quieres decir."

            ];


            ultimaPreguntaRivera =
                "";


            return respuestasGenerales[
                Math.floor(
                    Math.random() *
                    respuestasGenerales.length
                )
            ];
        }


        /* =========================================
                ENVIAR MENSAJE
        ========================================= */

        function enviarMensajeChatboy() {

            if (
                !campoChatboy ||
                !mensajesChatboy
            ) {

                return;
            }


            const texto =
                campoChatboy.value.trim();


            if (
                texto === ""
            ) {

                return;
            }


            /*
                Guardar mensaje del usuario.
            */

            conversacion.push({

                tipo: "usuario",

                texto: texto

            });


            /*
                Mostrar mensaje del usuario.
            */

            agregarMensaje(
                texto,
                "usuario"
            );


            /*
                Limpiar caja.
            */

            campoChatboy.value =
                "";


            /*
                Desactivar botón.
            */

            if (
                botonEnviarChatboy
            ) {

                botonEnviarChatboy.disabled =
                    true;
            }


            /*
                Mostrar los tres puntos.
            */

            const indicador =
                mostrarIndicador();


            /*
                Rivera responde después
                de un pequeño tiempo.
            */

            setTimeout(
                function () {

                    if (
                        indicador
                    ) {

                        indicador.remove();
                    }


                    const respuesta =
                        generarRespuestaChatboy(
                            texto
                        );


                    conversacion.push({

                        tipo: "rivera",

                        texto: respuesta

                    });


                    agregarMensaje(
                        respuesta,
                        "chatboy"
                    );


                    if (
                        botonEnviarChatboy
                    ) {

                        botonEnviarChatboy.disabled =
                            false;
                    }


                    campoChatboy.focus();

                },
                1050
            );
        }


        /* =========================================
                BOTÓN ENVIAR
        ========================================= */

        if (
            botonEnviarChatboy
        ) {

            botonEnviarChatboy.addEventListener(
                "click",
                enviarMensajeChatboy
            );
        }


        /* =========================================
                ENTER PARA ENVIAR
        ========================================= */

        if (
            campoChatboy
        ) {

            campoChatboy.addEventListener(
                "keydown",
                function (evento) {

                    if (

                        evento.key ===
                        "Enter"

                        &&

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

document.addEventListener(
    "DOMContentLoaded",
    function () {

        function iniciarCarruselTexto(
            id
        ) {

            const contenedor =
                document.getElementById(
                    id
                );


            if (
                !contenedor
            ) {

                return;
            }


            const frases =
                contenedor.querySelectorAll(
                    ".texto-frase"
                );


            if (
                frases.length <= 1
            ) {

                return;
            }


            let actual = 0;


            setInterval(
                function () {

                    frases[
                        actual
                    ].classList.remove(
                        "activa"
                    );


                    actual++;


                    if (
                        actual >=
                        frases.length
                    ) {

                        actual = 0;
                    }


                    frases[
                        actual
                    ].classList.add(
                        "activa"
                    );

                },
                3800
            );
        }


        iniciarCarruselTexto(
            "textoLumi"
        );


        iniciarCarruselTexto(
            "textoRivera"
        );

    }
);


/* =========================================================
        ACCESO — INICIAR SESIÓN / CREAR CUENTA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const vistaBienvenida =
            document.getElementById(
                "vistaBienvenida"
            );

        const vistaLogin =
            document.getElementById(
                "vistaLogin"
            );

        const vistaRegistro =
            document.getElementById(
                "vistaRegistro"
            );


        const btnMostrarLogin =
            document.getElementById(
                "btnMostrarLogin"
            );

        const btnMostrarRegistro =
            document.getElementById(
                "btnMostrarRegistro"
            );

        const btnIrRegistro =
            document.getElementById(
                "btnIrRegistro"
            );

        const btnIrLogin =
            document.getElementById(
                "btnIrLogin"
            );


        const btnVolverBienvenidaLogin =
            document.getElementById(
                "btnVolverBienvenidaLogin"
            );

        const btnVolverBienvenidaRegistro =
            document.getElementById(
                "btnVolverBienvenidaRegistro"
            );


        /* =========================================
                MOSTRAR VISTA
        ========================================= */

        function mostrarVista(
            vista
        ) {

            if (
                !vista
            ) {

                return;
            }


            if (
                vistaBienvenida
            ) {

                vistaBienvenida.classList.add(
                    "oculta"
                );
            }


            if (
                vistaLogin
            ) {

                vistaLogin.classList.add(
                    "oculta"
                );
            }


            if (
                vistaRegistro
            ) {

                vistaRegistro.classList.add(
                    "oculta"
                );
            }


            vista.classList.remove(
                "oculta"
            );
        }


        /* =========================================
                BOTÓN INICIAR SESIÓN
        ========================================= */

        if (
            btnMostrarLogin
        ) {

            btnMostrarLogin.addEventListener(
                "click",
                function () {

                    mostrarVista(
                        vistaLogin
                    );

                }
            );
        }


        /* =========================================
                BOTÓN CREAR CUENTA
        ========================================= */

        if (
            btnMostrarRegistro
        ) {

            btnMostrarRegistro.addEventListener(
                "click",
                function () {

                    mostrarVista(
                        vistaRegistro
                    );

                }
            );
        }


        /* =========================================
                IR A REGISTRO
        ========================================= */

        if (
            btnIrRegistro
        ) {

            btnIrRegistro.addEventListener(
                "click",
                function () {

                    mostrarVista(
                        vistaRegistro
                    );

                }
            );
        }


        /* =========================================
                IR A LOGIN
        ========================================= */

        if (
            btnIrLogin
        ) {

            btnIrLogin.addEventListener(
                "click",
                function () {

                    mostrarVista(
                        vistaLogin
                    );

                }
            );
        }


        /* =========================================
                VOLVER DESDE LOGIN
        ========================================= */

        if (
            btnVolverBienvenidaLogin
        ) {

            btnVolverBienvenidaLogin.addEventListener(
                "click",
                function () {

                    mostrarVista(
                        vistaBienvenida
                    );

                }
            );
        }


        /* =========================================
                VOLVER DESDE REGISTRO
        ========================================= */

        if (
            btnVolverBienvenidaRegistro
        ) {

            btnVolverBienvenidaRegistro.addEventListener(
                "click",
                function () {

                    mostrarVista(
                        vistaBienvenida
                    );

                }
            );
        }


        /* =========================================
                CREAR CUENTA
        ========================================= */

        const formRegistro =
            document.getElementById(
                "formRegistro"
            );


        if (
            formRegistro
        ) {

            formRegistro.addEventListener(
                "submit",
                function (evento) {

                    evento.preventDefault();


                    const campoNombre =
                        document.getElementById(
                            "registroNombre"
                        );


                    const campoCorreo =
                        document.getElementById(
                            "registroCorreo"
                        );


                    const campoClave =
                        document.getElementById(
                            "registroClave"
                        );


                    const campoClave2 =
                        document.getElementById(
                            "registroClave2"
                        );


                    const mensaje =
                        document.getElementById(
                            "mensajeRegistro"
                        );


                    if (

                        !campoNombre ||

                        !campoCorreo ||

                        !campoClave ||

                        !campoClave2

                    ) {

                        return;
                    }


                    const nombre =
                        campoNombre.value.trim();


                    const correo =
                        campoCorreo.value.trim();


                    const clave =
                        campoClave.value;


                    const clave2 =
                        campoClave2.value;


                    if (
                        clave !==
                        clave2
                    ) {

                        if (
                            mensaje
                        ) {

                            mensaje.textContent =
                                "Las contraseñas no coinciden.";
                        }

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

                        JSON.stringify(
                            usuario
                        )

                    );


                    if (
                        mensaje
                    ) {

                        mensaje.textContent =
                            "Cuenta creada correctamente ✦";
                    }


                    setTimeout(
                        function () {

                            mostrarVista(
                                vistaLogin
                            );


                            const loginCorreo =
                                document.getElementById(
                                    "loginCorreo"
                                );


                            if (
                                loginCorreo
                            ) {

                                loginCorreo.value =
                                    correo;
                            }

                        },
                        900
                    );

                }
            );
        }


        /* =========================================
                INICIAR SESIÓN
        ========================================= */

        const formLogin =
            document.getElementById(
                "formLogin"
            );


        if (
            formLogin
        ) {

            formLogin.addEventListener(
                "submit",
                function (evento) {

                    evento.preventDefault();


                    const campoCorreo =
                        document.getElementById(
                            "loginCorreo"
                        );


                    const campoClave =
                        document.getElementById(
                            "loginClave"
                        );


                    const mensaje =
                        document.getElementById(
                            "mensajeLogin"
                        );


                    if (

                        !campoCorreo ||

                        !campoClave

                    ) {

                        return;
                    }


                    const correo =
                        campoCorreo.value.trim();


                    const clave =
                        campoClave.value;


                    const datosGuardados =
                        localStorage.getItem(
                            "usuarioFemnova"
                        );


                    if (
                        !datosGuardados
                    ) {

                        if (
                            mensaje
                        ) {

                            mensaje.textContent =
                                "Primero debes crear una cuenta.";
                        }

                        return;
                    }


                    let usuario;


                    try {

                        usuario =
                            JSON.parse(
                                datosGuardados
                            );

                    }
                    catch (
                        error
                    ) {

                        if (
                            mensaje
                        ) {

                            mensaje.textContent =
                                "No se pudieron leer los datos de la cuenta.";
                        }

                        return;
                    }


                    if (

                        correo ===
                        usuario.correo

                        &&

                        clave ===
                        usuario.clave

                    ) {

                        localStorage.setItem(
                            "sesionFemnova",
                            "activa"
                        );


                        localStorage.setItem(
                            "nombreFemnova",
                            usuario.nombre
                        );

                        localStorage.setItem(
                       "correoFemnova",
                       usuario.correo
                    );

                        if (
                            mensaje
                        ) {

                            mensaje.textContent =
                                "Bienvenida a FEMNOVA ✦";
                        }


                        setTimeout(
                            function () {

                                window.location.href =
                                    "inicio.html";

                            },
                            900
                        );

                    }
                    else {

                        if (
                            mensaje
                        ) {

                            mensaje.textContent =
                                "El correo o la contraseña no coinciden.";
                        }
                    }

                }
            );
        }

    }
);

/* =========================================================
   ✦ FEMNOVA — ANIMACIONES AL HACER SCROLL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const elementosAnimados = document.querySelectorAll(
        ".bloque-valor, " +
        ".modulos-introduccion, " +
        ".tarjeta-modulo, " +
        ".juegos-introduccion, " +
        ".tarjeta-juego"
    );

    const observador = new IntersectionObserver(
        function (entradas, observer) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("animar-visible");

                    observer.unobserve(entrada.target);
                }

            });

        },
        {
            threshold: 0.18
        }
    );


    elementosAnimados.forEach(function (elemento) {
        observador.observe(elemento);
    });

});

document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("chatboyOverlay");
    const personaje = document.getElementById("personajeVolador");

    if (!overlay || !personaje) return;

    const poses = [
        "img/personajes/chat1.png",
        "img/personajes/chat2.png",
        "img/personajes/chat3.png"
    ];

    let indice = 0;
    let intervalo;

    function iniciarPersonajeVolador() {

        clearInterval(intervalo);

        // Reiniciar animación
        const decoracion = document.querySelector(".rivera-decoracion");

        if (decoracion) {
            decoracion.style.animation = "none";
            void decoracion.offsetWidth;
            decoracion.style.animation =
                "chatboyVuelo 5.5s cubic-bezier(.45,.05,.55,.95) both";
        }

        indice = 0;
        personaje.src = poses[indice];

        intervalo = setInterval(function () {

            indice++;

            if (indice >= poses.length) {
                indice = 0;
            }

            personaje.src = poses[indice];

        }, 900);

        // Dejar de cambiar imágenes cuando termina el vuelo
        setTimeout(function () {
            clearInterval(intervalo);
        }, 5000);
    }

    const observarChat = new MutationObserver(function () {

        if (overlay.classList.contains("activo")) {
            iniciarPersonajeVolador();
        }

    });

    observarChat.observe(overlay, {
        attributes: true,
        attributeFilter: ["class"]
    });

});


document.addEventListener("DOMContentLoaded", function () {

    const personaje = document.querySelector(
        ".contenedor-modulos .tarjeta-modulo:first-child .personaje-modulo"
    );

    if (!personaje) return;

    function iniciarVuelo() {

        personaje.classList.remove("volando-modulo");

        void personaje.offsetWidth;

        personaje.classList.add("volando-modulo");

        setTimeout(() => {
            personaje.classList.remove("volando-modulo");
        }, 7000);
    }

    /* Primera entrada */
    setTimeout(iniciarVuelo, 1000);

    /* Al pasar el mouse */
    personaje.addEventListener("mouseenter", iniciarVuelo);

});
/* =====================================================
   CARRUSEL EQUIPO FEMNOVA
===================================================== */

const equipoFEMNOVA = [

    {
        nombre: "HEMILY Romero",

        rol: "LÍDER · DISEÑADORA DE PÁGINA WEB",

        imagen: "img/equipo/mily.jpeg",

        mensaje:
            "Mi liderazgo y creatividad me impulsan a convertir nuestras ideas en experiencias inovadoras diseñadas para que tu recorrido por nuestro software sea inolvidable ."
    },

    {
        nombre: "Yulieth Medellín",

        rol: "PROGRAMADORA",

        imagen: "img/equipo/yulieth.png",

        mensaje:
            "Mi lógica y creatividad hacen posible transformar nuestras ideas en código."
    },

    {
        nombre: "Juan José",

        rol: "DISEÑADOR",

        imagen: "img/equipo/juan-jose.png",

        mensaje:
            "Mi creatividad ayudan a construir la identidad visual de FEMNOVA."
    }

];


/* =========================================
   POSICIÓN INICIAL

   0 = Hemily
   1 = Yulieth
   2 = Juan José
========================================= */

let centroEquipo = 0;


/* =========================================
   ELEMENTOS
========================================= */

const tarjetas = [

    {
        tarjeta:
            document.querySelector(".integrante-izquierda"),

        imagen:
            document.getElementById("imagenIzquierda"),

        nombre:
            document.getElementById("nombreIzquierda"),

        rol:
            document.getElementById("rolIzquierda"),

        mensaje:
            document.getElementById("mensajeIzquierda")
    },

    {
        tarjeta:
            document.querySelector(".integrante-centro"),

        imagen:
            document.getElementById("imagenCentro"),

        nombre:
            document.getElementById("nombreCentro"),

        rol:
            document.getElementById("rolCentro"),

        mensaje:
            document.getElementById("mensajeCentro")
    },

    {
        tarjeta:
            document.querySelector(".integrante-derecha"),

        imagen:
            document.getElementById("imagenDerecha"),

        nombre:
            document.getElementById("nombreDerecha"),

        rol:
            document.getElementById("rolDerecha"),

        mensaje:
            document.getElementById("mensajeDerecha")
    }

];


const puntosEquipo =
    document.querySelectorAll(
        ".punto-equipo"
    );


/* =========================================
   ESCRITURA
========================================= */

function escribirMensaje(
    elemento,
    texto
) {

    elemento.textContent = "";

    let posicion = 0;

    const velocidad = 35;


    function escribir() {

        if (posicion < texto.length) {

            elemento.textContent +=
                texto.charAt(posicion);

            posicion++;

            setTimeout(
                escribir,
                velocidad
            );

        }

    }


    escribir();

}


/* =========================================
   OBTENER INTEGRANTE
========================================= */

function obtenerIntegrante(indice) {

    return equipoFEMNOVA[
        (indice + equipoFEMNOVA.length)
        % equipoFEMNOVA.length
    ];

}


/* =========================================
   MOSTRAR TARJETA
========================================= */

function colocarTarjeta(
    tarjeta,
    integrante
) {

    tarjeta.imagen.classList.add(
        "cambiando-equipo"
    );


    setTimeout(() => {

        tarjeta.imagen.src =
            integrante.imagen;

        tarjeta.imagen.alt =
            integrante.nombre;

        tarjeta.nombre.textContent =
            integrante.nombre;

        tarjeta.rol.textContent =
            integrante.rol;

        tarjeta.mensaje.textContent = "";


        setTimeout(() => {

            tarjeta.imagen.classList.remove(
                "cambiando-equipo"
            );

            escribirMensaje(
                tarjeta.mensaje,
                integrante.mensaje
            );

        }, 100);

    }, 400);

}


/* =========================================
   ACTUALIZAR CARRUSEL
========================================= */

function actualizarEquipo() {

    /*
       izquierda = integrante anterior
       centro    = integrante actual
       derecha   = integrante siguiente
    */

    const izquierda =
        obtenerIntegrante(
            centroEquipo - 1
        );

    const centro =
        obtenerIntegrante(
            centroEquipo
        );

    const derecha =
        obtenerIntegrante(
            centroEquipo + 1
        );


    colocarTarjeta(
        tarjetas[0],
        izquierda
    );


    colocarTarjeta(
        tarjetas[1],
        centro
    );


    colocarTarjeta(
        tarjetas[2],
        derecha
    );


    /* puntos */

    puntosEquipo.forEach(
        (punto, indice) => {

            punto.classList.toggle(
                "activo",
                indice === centroEquipo
            );

        }
    );

}


/* =========================================
   SIGUIENTE
========================================= */

function siguienteEquipo() {

    centroEquipo++;

    if (
        centroEquipo >=
        equipoFEMNOVA.length
    ) {

        centroEquipo = 0;

    }


    actualizarEquipo();

}


/* =========================================
   ANTERIOR
========================================= */

function anteriorEquipo() {

    centroEquipo--;

    if (centroEquipo < 0) {

        centroEquipo =
            equipoFEMNOVA.length - 1;

    }


    actualizarEquipo();

}


/* =========================================
   BOTONES
========================================= */

document
    .getElementById("siguienteEquipo")
    .addEventListener(
        "click",
        siguienteEquipo
    );


document
    .getElementById("anteriorEquipo")
    .addEventListener(
        "click",
        anteriorEquipo
    );


/* =========================================
   PUNTOS
========================================= */

puntosEquipo.forEach(
    (punto) => {

        punto.addEventListener(
            "click",
            () => {

                centroEquipo =
                    Number(
                        punto.dataset.posicion
                    );

                actualizarEquipo();

            }
        );

    }
);


/* =========================================
   CAMBIO AUTOMÁTICO
========================================= */

setInterval(() => {

    siguienteEquipo();

}, 8000);


/* =========================================
   INICIO
========================================= */

function iniciarEquipo() {

    const izquierda =
        obtenerIntegrante(
            centroEquipo - 1
        );

    const centro =
        obtenerIntegrante(
            centroEquipo
        );

    const derecha =
        obtenerIntegrante(
            centroEquipo + 1
        );


    tarjetas[0].nombre.textContent =
        izquierda.nombre;

    tarjetas[0].rol.textContent =
        izquierda.rol;

    tarjetas[0].imagen.src =
        izquierda.imagen;


    tarjetas[2].nombre.textContent =
        derecha.nombre;

    tarjetas[2].rol.textContent =
        derecha.rol;

    tarjetas[2].imagen.src =
        derecha.imagen;


    tarjetas[1].nombre.textContent =
        centro.nombre;

    tarjetas[1].rol.textContent =
        centro.rol;

    tarjetas[1].imagen.src =
        centro.imagen;


    escribirMensaje(
        tarjetas[1].mensaje,
        centro.mensaje
    );

}


iniciarEquipo();

/* =========================================================
   PROTECCIÓN DE MÓDULOS Y JUEGOS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sesionActiva =
        localStorage.getItem("sesionFemnova") === "activa";

    /* =========================================
       PROTEGER LOS ENLACES DEL MENÚ
    ========================================= */

    const enlacesProtegidos = document.querySelectorAll(
        'a[href="modulos.html"], a[href="juegos.html"]'
    );

    enlacesProtegidos.forEach(function (enlace) {

        enlace.addEventListener("click", function (evento) {

            if (!sesionActiva) {

                evento.preventDefault();

                const quiereEntrar = confirm(
                    "✦ Esta sección está disponible para usuarios con sesión iniciada.\n\n" +
                    "Debes iniciar sesión o crear una cuenta para acceder a Módulos y Juegos."
                );

                if (quiereEntrar) {
                    window.location.href = "acceder.html";
                }

            }

        });

    });


    /* =========================================
       PROTEGER EL ACCESO DIRECTO
    ========================================= */

    const paginaActual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const paginasProtegidas = [
        "modulos.html",
        "juegos.html"
    ];

    if (
        paginasProtegidas.includes(paginaActual) &&
        !sesionActiva
    ) {

        alert(
            "✦ Para acceder a esta sección debes iniciar sesión en FEMNOVA."
        );

        window.location.replace("acceder.html");

        return;
    }

});

/* =========================================================
        BLOQUEAR MÓDULOS Y JUEGOS SIN SESIÓN
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sesionActiva =
        localStorage.getItem("sesionFemnova") === "activa";

    const paginaActual =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    /* =========================================
            PÁGINAS QUE NECESITAN SESIÓN
    ========================================= */

    const paginasProtegidas = [
        "modulos.html",
        "juegos.html"
    ];


    /* =========================================
            BLOQUEAR ACCESO DIRECTO
    ========================================= */

    if (
        paginasProtegidas.includes(paginaActual)
        &&
        !sesionActiva
    ) {

        alert(
            "Para entrar a esta sección debes iniciar sesión en FEMNOVA ✦"
        );

        window.location.href =
            "acceder.html";

        return;
    }

});

/* =========================================================
         PROGRESO DEL USUARIO
========================================================= */

function obtenerProgresoFemnova() {

    const correo =
        localStorage.getItem("correoFemnova");

    if (!correo) {
        return {};
    }

    const clave =
        "progresoFemnova_" + correo;

    const progresoGuardado =
        localStorage.getItem(clave);

    if (!progresoGuardado) {
        return {};
    }

    try {

        return JSON.parse(
            progresoGuardado
        );

    } catch (error) {

        return {};
    }
}


/* =========================================
        GUARDAR PROGRESO
========================================= */

function guardarProgresoFemnova(
    progreso
) {

    const correo =
        localStorage.getItem("correoFemnova");

    if (!correo) {
        return;
    }

    const clave =
        "progresoFemnova_" + correo;

    localStorage.setItem(
        clave,
        JSON.stringify(progreso)
    );
}


/* =========================================
        MARCAR MÓDULO COMPLETADO
========================================= */

function completarModulo(
    numeroModulo
) {

    const progreso =
        obtenerProgresoFemnova();

    if (!progreso.modulos) {
        progreso.modulos = {};
    }

    progreso.modulos[
        "modulo" + numeroModulo
    ] = true;

    guardarProgresoFemnova(
        progreso
    );
}


/* =========================================
        MARCAR JUEGO COMPLETADO
========================================= */

function completarJuego(
    numeroJuego
) {

    const progreso =
        obtenerProgresoFemnova();

    if (!progreso.juegos) {
        progreso.juegos = {};
    }

    progreso.juegos[
        "juego" + numeroJuego
    ] = true;

    guardarProgresoFemnova(
        progreso
    );
}

localStorage.setItem("sesionFemnova", "activa");
localStorage.setItem("correoFemnova", correo);

window.location.href = "inicio.html";
// ---------------------------------------------------------------
  // 1. MODELO DE DATOS
  // Cada pregunta es un objeto independiente del renderizado.
  // Así, agregar/editar contenido nunca implica tocar el HTML/CSS.
  // ---------------------------------------------------------------
  const preguntas = [
    {
      afirmacion: "La identidad se construye únicamente a partir de lo que otras personas piensan de nosotros.",
      esMito: true,
      explicacion: "La identidad es un proceso propio que integra la historia personal, las emociones, los valores, la cultura y las vivencias de cada quien; no depende solo de la mirada externa."
    },
    {
      afirmacion: "La identidad de género y la orientación sexual son lo mismo.",
      esMito: true,
      explicacion: "La identidad de género se refiere a cómo una persona se percibe y se define a sí misma, mientras que la orientación sexual tiene que ver con hacia quién siente atracción. Son dimensiones distintas."
    },
    {
      afirmacion: "La diversidad de género ha existido en distintas culturas a lo largo de la historia.",
      esMito: false,
      explicacion: "Diversas culturas, como algunas comunidades indígenas de América, Asia y Oceanía, han reconocido históricamente identidades de género más allá del binario hombre/mujer."
    },
    {
      afirmacion: "Los estereotipos de género asignan roles y características fijas a las personas solo por su sexo, sin considerar su individualidad.",
      esMito: false,
      explicacion: "Eso es justamente lo que hace un estereotipo: generaliza y puede limitar las oportunidades, los gustos y la libre expresión de cada persona."
    },
    {
      afirmacion: "Todos los niños deben jugar con carros y todas las niñas con muñecas porque así es su naturaleza.",
      esMito: true,
      explicacion: "Esa idea es un estereotipo cultural, no una regla biológica. Los gustos e intereses de una persona no dependen del sexo con el que nació."
    },
    {
      afirmacion: "La identidad de una persona puede transformarse y seguir construyéndose a lo largo de la vida.",
      esMito: false,
      explicacion: "La identidad no es estática: se nutre de nuevas experiencias, relaciones y aprendizajes en cada etapa de la vida."
    },
    {
      afirmacion: "Reconocer la diversidad de género favorece el respeto y disminuye la discriminación.",
      esMito: false,
      explicacion: "Comprender que existen distintas formas de vivir y expresar el género ayuda a construir entornos más inclusivos y respetuosos para todas las personas."
    },
    {
      afirmacion: "Los estereotipos de género no afectan las decisiones de vida de las personas, como su carrera o su forma de vestir.",
      esMito: true,
      explicacion: "Los estereotipos sí influyen, muchas veces de forma inconsciente, en decisiones educativas, laborales y personales, limitando las opciones que una persona cree tener disponibles."
    },
    {
      afirmacion: "Existe una única forma 'correcta' de ser hombre o de ser mujer.",
      esMito: true,
      explicacion: "No existe un molde único: cada persona expresa su identidad de manera particular, y reducirla a un solo modelo desconoce esa diversidad."
    },
    {
      afirmacion: "Conocer la propia identidad ayuda a tomar decisiones más coherentes con los valores y necesidades de cada persona.",
      esMito: false,
      explicacion: "La autoconciencia sobre quién se es facilita relaciones más sanas y decisiones alineadas con el propio bienestar."
    }
  ];

  // ---------------------------------------------------------------
  // 2. ESTADO DEL JUEGO (en memoria — nada de localStorage aquí)
  // ---------------------------------------------------------------
  let indiceActual = 0;
  let puntaje = 0;
  let respondida = false;

  // ---------------------------------------------------------------
  // 2b. UTILIDAD: interpolar entre dos colores hex según una fracción 0–1
  // Se usa para el degradado "amanecer" progresivo de la tarjeta.
  // ---------------------------------------------------------------
  function mezclarColor(hexA, hexB, t){
    const a = [1,3,5].map(i => parseInt(hexA.slice(i, i+2), 16));
    const b = [1,3,5].map(i => parseInt(hexB.slice(i, i+2), 16));
    const m = a.map((v, i) => Math.round(v + (b[i] - v) * t));
    return `rgb(${m[0]}, ${m[1]}, ${m[2]})`;
  }

  function actualizarFondoTarjeta(fraccion){
    // De un morado profundo (inicio, "mito") hacia un dorado suave (final, "claridad")
    const colorInicio = mezclarColor('#4A214C', '#6B3550', fraccion);
    const colorFin = mezclarColor('#2A1830', '#3B2420', fraccion);
    document.getElementById('card').style.background =
      `linear-gradient(180deg, ${colorInicio}, ${colorFin})`;
  }

  // ---------------------------------------------------------------
  // 3. RENDERIZADO
  // ---------------------------------------------------------------
  function mostrarPregunta(){
    respondida = false;
    const p = preguntas[indiceActual];
    const fraccion = indiceActual / preguntas.length;

    document.getElementById('questionCount').textContent =
      `Pregunta ${indiceActual + 1} de ${preguntas.length}`;

    const statementEl = document.getElementById('statementText');
    statementEl.textContent = p.afirmacion;
    // Transición sutil al entrar una nueva pregunta
    statementEl.classList.remove('fade-in');
    void statementEl.offsetWidth; // fuerza reflow para reiniciar la animación
    statementEl.classList.add('fade-in');

    document.getElementById('progressFill').style.width = `${fraccion * 100}%`;
    actualizarFondoTarjeta(fraccion);

    const btnMito = document.getElementById('btnMito');
    const btnRealidad = document.getElementById('btnRealidad');
    [btnMito, btnRealidad].forEach(btn => {
      btn.disabled = false;
      btn.classList.remove('dim', 'right-answer', 'wrong-answer', 'pulse-correct', 'shake-wrong');
    });
    document.getElementById('iconMito').textContent = '';
    document.getElementById('iconMito').classList.remove('show');
    document.getElementById('iconRealidad').textContent = '';
    document.getElementById('iconRealidad').classList.remove('show');

    const feedback = document.getElementById('feedback');
    feedback.classList.remove('show', 'tone-myth', 'tone-reality');
    document.getElementById('nextBtn').classList.remove('show');
  }

  function responder(eligioMito){
    if (respondida) return;
    respondida = true;

    const p = preguntas[indiceActual];
    const esCorrecta = (eligioMito === p.esMito);
    if (esCorrecta) puntaje++;

    const btnMito = document.getElementById('btnMito');
    const btnRealidad = document.getElementById('btnRealidad');
    const btnElegido = eligioMito ? btnMito : btnRealidad;
    const btnCorrecto = p.esMito ? btnMito : btnRealidad;

    [btnMito, btnRealidad].forEach(btn => btn.disabled = true);
    if (!esCorrecta) btnElegido.classList.add('wrong-answer');
    btnCorrecto.classList.add('right-answer');
    [btnMito, btnRealidad].forEach(btn => {
      if (btn !== btnCorrecto && btn !== btnElegido) btn.classList.add('dim');
    });

    // Micro-recompensa: pulso en el acierto, ligero temblor en el error (icono, no solo color)
    const iconCorrecto = document.getElementById(p.esMito ? 'iconMito' : 'iconRealidad');
    iconCorrecto.textContent = '✓';
    iconCorrecto.classList.add('show');
    btnCorrecto.classList.add('pulse-correct');
    if (!esCorrecta){
      const iconElegido = document.getElementById(eligioMito ? 'iconMito' : 'iconRealidad');
      iconElegido.textContent = '✕';
      iconElegido.classList.add('show');
      btnElegido.classList.add('shake-wrong');
    }

    const feedback = document.getElementById('feedback');
    const verdict = document.getElementById('feedbackVerdict');
    verdict.textContent = esCorrecta ? 'Correcto' : `Es ${p.esMito ? 'un mito' : 'una realidad'}`;
    verdict.className = 'verdict ' + (esCorrecta ? 'ok' : 'no');
    document.getElementById('feedbackText').textContent = p.explicacion;
    // El borde del feedback usa el color de la categoría correcta (mito=rosado, realidad=verde)
    feedback.classList.remove('tone-myth', 'tone-reality');
    feedback.classList.add(p.esMito ? 'tone-myth' : 'tone-reality');
    feedback.classList.add('show');

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.textContent = (indiceActual === preguntas.length - 1) ? 'Ver resultado' : 'Siguiente';
    nextBtn.classList.add('show');
    nextBtn.focus();
  }

  function siguientePregunta(){
    indiceActual++;
    if (indiceActual >= preguntas.length){
      mostrarResultados();
    } else {
      mostrarPregunta();
    }
  }

  function mostrarResultados(){
    document.getElementById('progressFill').style.width = '100%';
    actualizarFondoTarjeta(1);
    document.getElementById('game').style.display = 'none';
    document.getElementById('results').classList.add('show');
    document.getElementById('scoreText').textContent = `${puntaje}/${preguntas.length}`;

    // Anillo circular: circunferencia = 2 * PI * r (r=52)
    const circunferencia = 2 * Math.PI * 52;
    const fraccionCorrecta = puntaje / preguntas.length;
    const ringFill = document.getElementById('ringFill');
    ringFill.style.strokeDasharray = `${circunferencia}`;
    ringFill.style.strokeDashoffset = `${circunferencia}`;
    // Pequeño delay para que la transición de "llenado" se aprecie
    requestAnimationFrame(() => {
      ringFill.style.strokeDashoffset = `${circunferencia * (1 - fraccionCorrecta)}`;
    });

    // Tono siempre de acompañamiento, nunca de competencia o de "fallaste"
    let mensaje;
    if (puntaje === preguntas.length){
      mensaje = "Identificaste todas las afirmaciones. Se nota que ya tienes clara la diferencia entre mito y realidad en este tema — comprender la identidad y la diversidad de género ayuda a relacionarnos con más respeto.";
    } else if (puntaje >= preguntas.length * 0.7){
      mensaje = "Vas construyendo una mirada clara sobre el tema. Revisa con calma las explicaciones de lo que se te escapó: cada mito desmontado suma a entender mejor la identidad y la diversidad de género.";
    } else {
      mensaje = "Este es un buen punto de partida, no una calificación. Nadie nace sabiendo esto, y volver a jugar cuantas veces quieras es parte de ir aclarando las ideas sobre identidad, diversidad de género y estereotipos.";
    }
    document.getElementById('resultMessage').textContent = mensaje;
  }

  function reiniciarJuego(){
    indiceActual = 0;
    puntaje = 0;
    document.getElementById('results').classList.remove('show');
    document.getElementById('game').style.display = 'block';
    mostrarPregunta();
  }

  // Inicio
  mostrarPregunta();

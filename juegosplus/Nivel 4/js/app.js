/* ================= ACTIVIDAD 1: Historias interactivas ================= */
/* cada icono se dibuja dentro de un medallón tipo vitral (marco cuatrifolio) */
function medallionFrame(inner){
  return `
    <g fill="none" stroke="#C9A44C" stroke-width="1">
      <circle cx="59" cy="59" r="55"/>
      <circle cx="59" cy="59" r="46"/>
      <path d="M59 4 A55 55 0 0 1 105 30" stroke-width="1.6"/>
      <path d="M114 59 A55 55 0 0 1 88 105" stroke-width="1.6"/>
      <path d="M59 114 A55 55 0 0 1 13 88" stroke-width="1.6"/>
      <path d="M4 59 A55 55 0 0 1 30 13" stroke-width="1.6"/>
    </g>
    <g fill="none" stroke="#E7C56B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
  `;
}

const stories = [
  {
    name:'El chiste en el grupo',
    sensible:false,
    icon:`
      <path d="M24 38 H72 V62 H42 L32 72 V62 H24 Z"/>
      <path d="M52 62 H96 V86 H88 V96 L78 86 H52 Z"/>
      <circle cx="48" cy="50" r="2.2" fill="#E7C56B"/>
      <circle cx="58" cy="50" r="2.2" fill="#E7C56B"/>
      <path d="M62 74 h24" stroke-dasharray="3 3"/>
    `,
    steps:[
      {
        setting:'Recreo. Están seis personas del curso y tú.',
        dialogue:[
          { who:'Un compañero', text:'A Laura no la pongan en el equipo de mecánica, va a romper algo. Es broma, no se enojen.' },
          { who:'El grupo', text:'(Risas.)' }
        ],
        options:[
          { text:'Te ríes también: no quieres ser la aguafiestas del grupo.', ok:false,
            fb:'La risa es lo que sostiene el chiste. Quien lo dijo recibe la señal de que puede repetirlo, y Laura recibe la de que nadie va a decir nada.',
            out:'Nadie dice nada. En la siguiente clase, el profesor arma los equipos y el comentario ya circula como si fuera un hecho.' },
          { text:'Te quedas serio y callado, esperando que el tema pase solo.', ok:false,
            fb:'No reírte ya marca una diferencia, pero el silencio no la nombra. Para el resto del grupo, silencio y aprobación se parecen demasiado.',
            out:'El tema pasa, pero no se olvida. En la siguiente clase, el profesor arma los equipos y el comentario ya circula como si fuera un hecho.' },
          { text:'“¿Por qué va a romper algo? Es la que mejor va en el taller.”', ok:true,
            fb:'Una pregunta corta obliga a explicar en voz alta el prejuicio, y añadir un hecho lo desmonta sin convertir la escena en una pelea.',
            out:'El compañero se encoge de hombros y cambia de tema. En la siguiente clase, el profesor arma los equipos.' }
        ]
      },
      {
        setting:'El profesor reparte los roles del taller.',
        dialogue:[
          { who:'El profesor', text:'Laura, tú encárgate de la bitácora y de tomar apuntes. Los muchachos se ocupan del motor.' }
        ],
        options:[
          { text:'No dices nada: al final es el profesor quien decide.', ok:false,
            fb:'La autoridad de quien decide no convierte la decisión en justa. Cuando el reparto se hace por sexo y no por habilidad, señalarlo con respeto también es parte de aprender.' },
          { text:'“Profe, Laura lleva todo el semestre en el motor. ¿Podemos rotar los roles?”', ok:true,
            fb:'Propones en vez de acusar: recuerdas un hecho y ofreces una solución que vale para todo el grupo. Es la forma más difícil de rechazar.' },
          { text:'“Eso es machismo, profe.” Y te cruzas de brazos.', ok:false,
            fb:'El diagnóstico puede ser correcto, pero sin un hecho ni una propuesta suele abrir una discusión sobre las palabras y no sobre los roles. Laura sigue con la bitácora.' }
        ]
      }
    ]
  },
  {
    name:'La vacante',
    sensible:false,
    icon:`
      <rect x="34" y="30" width="50" height="62"/>
      <path d="M44 46 h30"/><path d="M44 58 h30"/><path d="M44 70 h18" stroke-dasharray="3 3"/>
      <circle cx="88" cy="80" r="12"/>
      <path d="M97 89 l10 10" stroke-width="1.8"/>
    `,
    steps:[
      {
        setting:'Prácticas en una oficina. Escuchas a dos personas del equipo revisando hojas de vida.',
        dialogue:[
          { who:'Coordinadora', text:'Esta candidata es la mejor, sin duda. Pero tiene 29 años, seguro sale embarazada y nos deja el puesto colgado.' }
        ],
        options:[
          { text:'Callas: eres practicante, no te corresponde opinar.', ok:false,
            fb:'Descartar a alguien por un embarazo posible es discriminación y en la mayoría de países es ilegal. Ser practicante limita el poder, no la posibilidad de preguntar.',
            out:'La hoja de vida queda al final del montón. Al día siguiente, la coordinadora te pide ayuda para redactar el aviso del cargo.' },
          { text:'“¿Le preguntaríamos lo mismo a un candidato de 29?”', ok:true,
            fb:'Una pregunta que cambia el sujeto y deja ver la regla doble: el mismo riesgo no se le calcula a un hombre. Es breve y no acusa a nadie de nada.',
            out:'La coordinadora se queda callada un momento y vuelve a mirar la hoja de vida. Al día siguiente te pide ayuda para redactar el aviso del cargo.' },
          { text:'“Es que es verdad, siempre pasa lo mismo con las mujeres.”', ok:false,
            fb:'Repetir el prejuicio como si fuera un dato lo convierte en norma. La decisión no se toma sobre una persona real, sino sobre lo que se supone que hará.',
            out:'La hoja de vida queda al final del montón. Al día siguiente, la coordinadora te pide ayuda para redactar el aviso del cargo.' }
        ]
      },
      {
        setting:'Te toca escribir el aviso de la vacante.',
        dialogue:[
          { who:'Coordinadora', text:'Ponle algo como “se busca un joven dinámico, con buena presencia y disponibilidad total”.' }
        ],
        options:[
          { text:'Lo escribes tal cual: es lo que te pidieron.', ok:false,
            fb:'“Un joven”, “buena presencia” y “disponibilidad total” son filtros indirectos: descartan por edad, por apariencia y por tener personas a cargo, sin decirlo.' },
          { text:'“Lo dejo igual pero cambio ‘un joven’ por ‘una persona joven’.”', ok:false,
            fb:'Es un avance real en el lenguaje, pero el aviso sigue pidiendo “buena presencia” y “disponibilidad total”, que son los filtros que de verdad excluyen.' },
          { text:'“Mejor pongamos los requisitos del trabajo: la formación, la experiencia y el horario exacto.”', ok:true,
            fb:'Un aviso que pide capacidades y no características personales abre el cargo a quien pueda hacerlo. Así se previene la discriminación indirecta: cambiando la regla, no solo la palabra.' }
        ]
      }
    ]
  },
  {
    name:'La amiga del grupo',
    sensible:true,
    icon:`
      <circle cx="44" cy="46" r="10"/>
      <path d="M28 88c1.6-16 8-23 16-23s14.4 7 16 23"/>
      <circle cx="80" cy="46" r="10"/>
      <path d="M64 88c1.6-16 8-23 16-23s14.4 7 16 23"/>
      <path d="M34 98 h56" stroke-dasharray="3 3"/>
      <path d="M62 24 v-8"/><path d="M55 20 l7 -7 l7 7" stroke-width="1.2"/>
    `,
    steps:[
      {
        setting:'Chat del grupo de amigas. Alguien reenvía una foto íntima de una compañera.',
        dialogue:[
          { who:'Un contacto', text:'Miren lo que mandó ella. Pásenla, que se entere todo el colegio la clase de niña que es.' }
        ],
        options:[
          { text:'No la reenvías, pero tampoco respondes nada.', ok:false,
            fb:'No reenviar evita el daño mayor, y eso cuenta. Pero la foto sigue circulando y ella sigue sin saberlo: hay un paso más que sí está en tus manos.',
            out:'La imagen sigue circulando durante el día. En la tarde, ella entra al salón y nota que la miran distinto.' },
          { text:'La reenvías solo a una amiga para comentarlo.', ok:false,
            fb:'Difundir una imagen íntima sin permiso es violencia digital y, en muchos países, un delito: no importa a cuántas personas se envíe. “Solo a una” es como empiezan todas las cadenas.',
            out:'La imagen sigue circulando durante el día. En la tarde, ella entra al salón y nota que la miran distinto.' },
          { text:'No la reenvías, escribes “esto es delito, no lo pasen” y haces captura de quién la envió.', ok:true,
            fb:'Cortas la cadena, lo nombras delante del grupo y conservas la prueba para que ella pueda denunciar si quiere. Eso es lo que convierte a un testigo en apoyo.',
            out:'Dos personas más dejan de reenviarla. En la tarde, ella entra al salón y nota que la miran distinto.' }
        ]
      },
      {
        setting:'Ella se sienta a tu lado, sin saber todavía qué pasó.',
        dialogue:[
          { who:'Tú', text:'(Tengo que decirle algo.)' }
        ],
        options:[
          { text:'Le dices “no te preocupes, ya se les va a olvidar”.', ok:false,
            fb:'Minimizar deja el problema en sus manos y sola. Lo que ocurrió no se olvida por sí solo: se detiene con apoyo y, si ella quiere, con una denuncia.' },
          { text:'Le cuentas en privado lo que viste, le muestras la captura y le preguntas qué necesita.', ok:true,
            fb:'Le devuelves la información y la decisión: ella elige si denuncia, si habla con su familia o si busca a la orientadora. Acompañar no es decidir por la otra persona.' },
          { text:'Le dices delante de todas: “te están pasando una foto tuya, ¿tú se la mandaste a quién?”', ok:false,
            fb:'Hacerlo en público la expone otra vez, y la pregunta pone el foco en su conducta y no en quien difundió la imagen. La responsabilidad es siempre de quien difunde.' }
        ]
      }
    ]
  }
];

const totalDecisions = stories.reduce((n, s) => n + s.steps.length, 0);
let storyIdx = 0;
let stepIdx = 0;
let answered = false;
let correctCount = 0;
let storyScore = 0;
let carryOutcome = null;

document.getElementById('scTotal').textContent = stories.length;
document.getElementById('scorePill').textContent = `Aciertos 0 / ${totalDecisions}`;

const dotsEl = document.getElementById('dots');
stories.forEach((s, i) => {
  s.steps.forEach((_, j) => {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 && j === 0 ? ' active' : '');
    d.dataset.pos = i + '-' + j;
    dotsEl.appendChild(d);
  });
});

function flatIndex(i, j){
  let n = 0;
  for(let k = 0; k < i; k++) n += stories[k].steps.length;
  return n + j;
}

function updateDots(){
  const pos = flatIndex(storyIdx, stepIdx);
  [...dotsEl.children].forEach((d, idx) => {
    d.className = 'dot' + (idx === pos ? ' active' : idx < pos ? ' done' : '');
  });
}

function markWindow(i, good){
  const pane = document.querySelector(`.pane[data-i="${i}"]`);
  const crack = document.querySelector(`.crack[data-i="${i}"]`);
  if(good){ pane.classList.add('lit'); crack.classList.remove('show'); }
  else { pane.classList.remove('lit'); crack.classList.add('show'); }
}

function loadStep(){
  answered = false;
  const story = stories[storyIdx];
  const step = story.steps[stepIdx];

  document.getElementById('scCurrent').textContent = storyIdx + 1;
  document.getElementById('stCurrent').textContent = stepIdx + 1;
  document.getElementById('storyName').textContent = story.name;
  document.getElementById('scenarioIcon').innerHTML = medallionFrame(story.icon);
  document.getElementById('sceneSetting').innerHTML = step.setting +
    (story.sensible ? '<div><span class="tag-sensible"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Tema sensible · violencia de género</span></div>' : '');

  const dlg = document.getElementById('dialogue');
  dlg.innerHTML = '';
  if(carryOutcome){
    const n = document.createElement('div');
    n.className = 'line-narr';
    n.innerHTML = `<span class="who">Lo que pasó después</span>${carryOutcome}`;
    dlg.appendChild(n);
    carryOutcome = null;
  }
  step.dialogue.forEach(l => {
    const el = document.createElement('div');
    el.className = 'line-said' + (l.who === 'Tú' ? ' mine' : '');
    el.innerHTML = `<span class="who">${l.who}</span>${l.text}`;
    dlg.appendChild(el);
  });

  const col = document.getElementById('choiceCol');
  col.innerHTML = '';
  step.options.forEach((o, i) => {
    const b = document.createElement('button');
    b.className = 'reply-btn';
    b.dataset.i = i;
    b.textContent = o.text;
    col.appendChild(b);
  });

  const fb = document.getElementById('feedback');
  fb.className = 'feedback';
  fb.innerHTML = '';
  document.getElementById('nextBtn').classList.remove('show');
  updateDots();
}

document.getElementById('choiceCol').addEventListener('click', (e) => {
  const btn = e.target.closest('.reply-btn');
  if(!btn || answered) return;
  answered = true;

  const story = stories[storyIdx];
  const step = story.steps[stepIdx];
  const opt = step.options[+btn.dataset.i];

  if(opt.ok){ correctCount++; storyScore++; }
  document.getElementById('scorePill').textContent = `Aciertos ${correctCount} / ${totalDecisions}`;

  document.querySelectorAll('.reply-btn').forEach(b => {
    b.disabled = true;
    if(b === btn) b.classList.add('chosen', opt.ok ? 'right' : 'wrong');
  });

  const fb = document.getElementById('feedback');
  fb.className = 'feedback show ' + (opt.ok ? 'correct' : 'incorrect');
  fb.innerHTML = `<span class="verdict">${opt.ok ? '✓ Buena decisión' : '✗ Revisemos juntos'}</span>${opt.fb}`;

  const isLastStep = stepIdx === story.steps.length - 1;
  if(isLastStep) markWindow(storyIdx, storyScore === story.steps.length);
  if(opt.out) carryOutcome = opt.out;

  const nb = document.getElementById('nextBtn');
  nb.textContent = !isLastStep ? 'Continuar →'
    : (storyIdx < stories.length - 1 ? 'Siguiente historia →' : 'Ver resultado →');
  nb.classList.add('show');
});

document.getElementById('nextBtn').addEventListener('click', () => {
  const story = stories[storyIdx];
  if(stepIdx < story.steps.length - 1){
    stepIdx++;
    loadStep();
  } else if(storyIdx < stories.length - 1){
    storyIdx++;
    stepIdx = 0;
    storyScore = 0;
    carryOutcome = null;
    loadStep();
  } else {
    document.getElementById('sealScore').textContent = `${correctCount}/${totalDecisions}`;
    document.getElementById('seal').classList.add('show');
    document.getElementById('scenarioCard').style.opacity = '.4';
    document.getElementById('scenarioCard').style.pointerEvents = 'none';
    return;
  }
  document.getElementById('scenarioCard').scrollIntoView({behavior:'smooth', block:'center'});
});

loadStep();

/* ================= ACTIVIDAD 2: Detecta la microagresión ================= */
const phrases = [
  {
    text:'“Te felicito, quedaste de jefa. Eso sí, ojo con volverte mandona.”',
    micro:true,
    note:'A un hombre en el mismo cargo se le pide liderazgo; a ella se le advierte que no se pase. La palabra “mandona” casi no existe en masculino, y eso dice bastante.'
  },
  {
    text:'“¿Puedes revisar el informe antes de las cinco? Lo necesito para la reunión.”',
    micro:false,
    note:'Es una petición concreta, con un motivo y un plazo, dirigida a una persona por su función. No hay prejuicio: solo trabajo.'
  },
  {
    text:'“Qué valiente tu esposo, quedándose a cuidar a los niños mientras tú viajas.”',
    micro:true,
    note:'Se elogia como heroísmo lo que en una madre se daría por descontado. El elogio refuerza la idea de que cuidar es tarea de ella y favor de él.'
  },
  {
    text:'“No pareces lesbiana, si eres súper femenina.”',
    micro:true,
    note:'Presenta la orientación como algo que debería notarse en la apariencia, y disfraza de cumplido la idea de que hay una forma correcta de verse.'
  },
  {
    text:'“Me gustó cómo defendiste tu propuesta en la reunión.”',
    micro:false,
    note:'Reconoce una acción concreta, sin compararla con lo que se esperaba de ella por ser quien es. Así se ve un reconocimiento sin condiciones.'
  },
  {
    text:'“Déjame eso a mí, que tú no vas a poder con ese peso.”',
    micro:true,
    note:'Decidir por otra persona lo que puede o no puede hacer, sin preguntarle, es paternalismo. Ofrecer ayuda sería: “¿Quieres que te dé una mano?”.'
  }
];

const detectList = document.getElementById('detectList');
const detectStatus = document.getElementById('detectStatus');
let detectAnswered = 0;
let detectCorrect = 0;

phrases.forEach((p, idx) => {
  const card = document.createElement('div');
  card.className = 'gothic-frame detect-card';
  card.innerHTML = `
    <div class="corner tl"><svg viewBox="0 0 22 22"><path d="M1 21V6a5 5 0 015-5h15" fill="none" stroke="#C9A44C" stroke-width="1.2"/></svg></div>
    <div class="corner br"><svg viewBox="0 0 22 22"><path d="M1 21V6a5 5 0 015-5h15" fill="none" stroke="#C9A44C" stroke-width="1.2"/></svg></div>
    <div class="detect-phrase"><span class="heard">Frase ${idx + 1}</span>${p.text}</div>
    <div class="detect-row">
      <button class="arch-btn" data-v="1"><span class="frame"></span><span class="keystone"></span>Microagresión</button>
      <button class="arch-btn" data-v="0"><span class="frame"></span><span class="keystone"></span>Comentario neutral</button>
    </div>
    <div class="detect-note"></div>
  `;
  const note = card.querySelector('.detect-note');
  note.textContent = p.note;
  card.querySelectorAll('.arch-btn').forEach(b => {
    b.addEventListener('click', () => {
      if(card.dataset.done) return;
      card.dataset.done = '1';
      const said = b.dataset.v === '1';
      const ok = said === p.micro;
      if(ok) detectCorrect++;
      detectAnswered++;
      card.querySelectorAll('.arch-btn').forEach(other => {
        other.disabled = true;
        if(other === b) other.classList.add('chosen', ok ? 'right' : 'wrong');
      });
      note.classList.add('show');
      detectStatus.textContent = detectAnswered === phrases.length
        ? `Actividad completa — ${detectCorrect} de ${phrases.length} bien identificadas.`
        : `${detectAnswered} de ${phrases.length} respondidas.`;
    });
  });
  detectList.appendChild(card);
});

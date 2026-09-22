/* ================= ACTIVIDAD 1: Simulación de conversaciones ================= */
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

const conversations = [
  {
    icon: `
      <path d="M26 38 H74 V62 H44 L34 72 V62 H26 Z"/>
      <path d="M50 58 H92 V82 H84 V92 L74 82 H50 Z"/>
      <path d="M34 48 h28" stroke-dasharray="3 3"/>
      <path d="M58 70 h24" stroke-dasharray="3 3"/>
    `,
    setting: 'En el salón, frente a varias personas.',
    dialogue: [
      { who:'Un compañero', text:'Tranquila, esto lo explico yo, que a las mujeres los números no se les dan.' }
    ],
    sensible: false,
    options: [
      { text:'Me quedo callada y dejo que siga explicando.', type:'pasiva' },
      { text:'“Explícalo tú, que para ignorante no hay quien te gane.”', type:'agresiva' },
      { text:'“Ese comentario sobra. Yo resolví el ejercicio y lo voy a explicar.”', type:'asertiva' }
    ],
    feedback: {
      pasiva:'Callar evita el roce del momento, pero deja el comentario en pie y la explicación en sus manos. La asertividad no obliga a pelear: basta con nombrar lo que pasó y sostener tu lugar.',
      agresiva:'Devolver el insulto empata el tono, pero desvía la conversación hacia quién ofende más y tu argumento se pierde. Se puede marcar un límite sin descalificar.',
      asertiva:'Señalas el comentario, no a la persona, y recuperas tu espacio. Frase corta, sin insulto y con una acción concreta: así se pone un límite.'
    },
    correct:'asertiva'
  },
  {
    icon: `
      <rect x="40" y="30" width="38" height="62" rx="5"/>
      <path d="M52 30 h14" stroke-width="1.2"/>
      <circle cx="59" cy="84" r="2.5"/>
      <path d="M48 48 h22" stroke-dasharray="3 3"/>
      <path d="M48 58 h22" stroke-dasharray="3 3"/>
      <path d="M86 42 l16 -12" stroke-width="1.2"/>
      <circle cx="105" cy="26" r="5"/>
    `,
    setting: 'Tu pareja toma tu celular y empieza a revisarlo.',
    dialogue: [
      { who:'Tu pareja', text:'Si no tienes nada que ocultar, no te molesta que lo revise, ¿verdad?' }
    ],
    sensible: true,
    options: [
      { text:'“Revísalo, así te quedas tranquilo.”', type:'pasiva' },
      { text:'“Pues entonces dame el tuyo, a ver qué escondes tú.”', type:'agresiva' },
      { text:'“No voy a entregarte mi celular. Cuando lo revisas me siento vigilada y necesito que confíes en mí.”', type:'asertiva' }
    ],
    feedback: {
      pasiva:'Ceder una vez suele abrir la puerta a la siguiente. Revisar el celular de la pareja no es una prueba de amor: es control, y el control se sostiene cuando no encuentra un límite.',
      agresiva:'Responder con la misma sospecha convierte la relación en una vigilancia mutua. El problema no es quién revisa primero, sino que la confianza se haya sustituido por el control.',
      asertiva:'Dices que no, explicas cómo te sientes y nombras lo que necesitas. Un no acompañado de una razón propia es más difícil de discutir que un no a secas.'
    },
    correct:'asertiva'
  },
  {
    icon: `
      <path d="M22 58 H62 V82 H36 L28 90 V82 H22 Z"/>
      <path d="M62 34 H100 V58 H92 V66 L84 58 H62 Z"/>
      <circle cx="42" cy="34" r="8"/>
      <path d="M30 52 c1-9 5-13 12-13 s11 4 12 13" stroke-width="1.2"/>
      <path d="M78 76 v10" stroke-width="1.2"/>
      <path d="M72 86 h12" stroke-width="1.2"/>
    `,
    setting: 'Trabajo en grupo. Llevas tres días haciendo la parte de otra persona.',
    dialogue: [
      { who:'Tú', text:'(Otra vez me tocó terminar su parte y mañana entregamos.)' },
      { who:'Tu compañera', text:'Ay, se me volvió a olvidar. Tú lo haces rapidísimo, ¿no?' }
    ],
    sensible: false,
    options: [
      { text:'“No te preocupes, yo lo hago.”', type:'pasiva' },
      { text:'“Eres una interesada, no piensas hacer nada nunca.”', type:'agresiva' },
      { text:'“Llevo tres días cubriendo tu parte y no me alcanza el tiempo. Necesito que hagas tu sección hoy.”', type:'asertiva' }
    ],
    feedback: {
      pasiva:'Resolverlo tú evita la incomodidad, pero el acuerdo sigue roto y la carga vuelve a caer en el mismo lado. Ceder no es generosidad cuando se vuelve costumbre.',
      agresiva:'La etiqueta —“eres una interesada”— habla de su persona, no del problema. Casi siempre provoca defensa y la tarea sigue sin hacerse.',
      asertiva:'Describes el hecho, dices cómo te afecta y haces una petición concreta con plazo. Es la estructura básica de una frase asertiva.'
    },
    correct:'asertiva'
  },
  {
    icon: `
      <circle cx="42" cy="44" r="10"/>
      <path d="M26 82c1.6-16 8-23 16-23s14.4 7 16 23"/>
      <circle cx="80" cy="44" r="10"/>
      <path d="M64 82c1.6-16 8-23 16-23s14.4 7 16 23"/>
      <path d="M38 96 h42" stroke-dasharray="3 3"/>
      <path d="M59 22 v10"/>
      <path d="M52 28 l7 -8 l7 8" stroke-width="1.2"/>
    `,
    setting: 'Una amiga te cuenta que su novio le prohibió salir con ustedes.',
    dialogue: [
      { who:'Tu amiga', text:'No es para tanto, es que se pone celoso porque me quiere mucho.' }
    ],
    sensible: true,
    options: [
      { text:'“Bueno, cada pareja es un mundo.”', type:'pasiva' },
      { text:'“Estás ciega, déjalo ya o no me busques más.”', type:'agresiva' },
      { text:'“A mí me preocupa que decida con quién sales. Yo te escucho cuando quieras y aquí sigo.”', type:'asertiva' }
    ],
    feedback: {
      pasiva:'Evita el conflicto, pero también evita a tu amiga. Puedes respetar su decisión y aun así decirle lo que ves.',
      agresiva:'Los ultimátums suelen aislar más a quien ya está siendo aislada. Si la relación con sus amistades se rompe, se queda con la única voz que la controla.',
      asertiva:'Nombras tu preocupación sin dar órdenes y dejas la puerta abierta. Mantener el vínculo es lo más protector que puedes ofrecerle.',
    },
    correct:'asertiva'
  }
];

let current = 0;
let answered = false;
let correctCount = 0;
document.getElementById('scTotal').textContent = conversations.length;

const dotsEl = document.getElementById('dots');
conversations.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  dotsEl.appendChild(d);
});

function updateScorePill(){
  document.getElementById('scorePill').textContent = `Aciertos ${correctCount} / ${conversations.length}`;
}

function setNeedle(type){
  const deg = type === 'pasiva' ? -58 : type === 'agresiva' ? 58 : 0;
  document.getElementById('needle').style.transform = `rotate(${deg}deg)`;
}

function loadConversation(i){
  answered = false;
  const c = conversations[i];
  document.getElementById('scCurrent').textContent = i + 1;
  document.getElementById('scenarioIcon').innerHTML = medallionFrame(c.icon);
  document.getElementById('sceneSetting').innerHTML = c.setting +
    (c.sensible ? '<div><span class="tag-sensible"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Tema sensible · violencia de género</span></div>' : '');

  const dlg = document.getElementById('dialogue');
  dlg.innerHTML = '';
  c.dialogue.forEach(l => {
    const el = document.createElement('div');
    el.className = 'line-said' + (l.who === 'Tú' ? ' mine' : '');
    el.innerHTML = `<span class="who">${l.who}</span>${l.text}`;
    dlg.appendChild(el);
  });

  const col = document.getElementById('choiceCol');
  col.innerHTML = '';
  c.options.forEach(o => {
    const b = document.createElement('button');
    b.className = 'reply-btn';
    b.dataset.type = o.type;
    b.textContent = o.text;
    col.appendChild(b);
  });

  const fb = document.getElementById('feedback');
  fb.className = 'feedback';
  fb.innerHTML = '';
  document.getElementById('nextBtn').classList.remove('show');
  setNeedle('asertiva');
  [...dotsEl.children].forEach((d, idx) => {
    d.className = 'dot' + (idx === i ? ' active' : idx < i ? ' done' : '');
  });
}

document.getElementById('choiceCol').addEventListener('click', (e) => {
  const btn = e.target.closest('.reply-btn');
  if(!btn || answered) return;
  answered = true;
  const type = btn.dataset.type;
  const c = conversations[current];
  const isCorrect = type === c.correct;
  if(isCorrect) correctCount++;
  updateScorePill();
  setNeedle(type);

  document.querySelectorAll('.reply-btn').forEach(b => {
    b.disabled = true;
    if(b === btn) b.classList.add('chosen', isCorrect ? 'right' : 'wrong');
  });

  const fb = document.getElementById('feedback');
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
  const etiqueta = type === 'pasiva' ? 'Respuesta pasiva' : type === 'agresiva' ? 'Respuesta agresiva' : 'Respuesta asertiva';
  fb.innerHTML = `<span class="verdict">${isCorrect ? '✓ ' + etiqueta : '✗ ' + etiqueta}</span>${c.feedback[type]}`;

  const nb = document.getElementById('nextBtn');
  nb.textContent = current < conversations.length - 1 ? 'Siguiente →' : 'Ver resultado →';
  nb.classList.add('show');
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if(current < conversations.length - 1){
    current++;
    loadConversation(current);
    document.getElementById('scenarioCard').scrollIntoView({behavior:'smooth', block:'center'});
  } else {
    document.getElementById('sealScore').textContent = `${correctCount}/${conversations.length}`;
    document.getElementById('seal').classList.add('show');
    document.getElementById('scenarioCard').style.opacity = '.4';
    document.getElementById('scenarioCard').style.pointerEvents = 'none';
  }
});

loadConversation(0);

/* ================= ACTIVIDAD 2: Elegir la forma respetuosa ================= */
const rewrites = [
  {
    phrase:'“Necesitamos un hombre que cargue las cajas, ustedes no van a poder.”',
    options:[
      { text:'“Necesitamos a alguien con fuerza para cargar las cajas: ¿quién puede?”', ok:true },
      { text:'“Necesitamos un hombre fuerte, pero si alguna quiere intentar, que lo intente.”', ok:false },
      { text:'“Los hombres cargan las cajas y las mujeres organizan los papeles.”', ok:false }
    ],
    note:'La primera pide una capacidad —fuerza— y deja que responda quien la tenga. Las otras dos siguen repartiendo tareas por sexo, aunque una lo diga con más cortesía.'
  },
  {
    phrase:'“Todos los niños deben venir acompañados de su mamá.”',
    options:[
      { text:'“Cada niño debe venir con su mamá o, si no puede, con otro familiar.”', ok:false },
      { text:'“Cada estudiante debe venir acompañado por una persona adulta de su familia.”', ok:true },
      { text:'“Los niños y las niñas deben venir con su mamá.”', ok:false }
    ],
    note:'Poner a la madre como responsable por defecto —aunque se admitan excepciones— sigue asignando el cuidado a las mujeres. Hablar de “una persona adulta de su familia” incluye a todas las formas de familia.'
  },
  {
    phrase:'“Qué carácter tiene ella, seguro está en sus días.”',
    options:[
      { text:'“Ella está molesta, será cosa de hormonas.”', ok:false },
      { text:'“No le hagan caso, ya se le pasa.”', ok:false },
      { text:'“Ella está molesta. ¿Sabemos qué pasó?”', ok:true }
    ],
    note:'Explicar el enojo de una mujer por su ciclo o por su carácter sirve para no escuchar el motivo. Preguntar qué pasó devuelve el enojo a su causa real.'
  },
  {
    phrase:'“Ese trabajo lo hizo muy bien, para ser mujer.”',
    options:[
      { text:'“Ese trabajo quedó muy bien.”', ok:true },
      { text:'“Ese trabajo lo hizo muy bien, igual que un hombre.”', ok:false },
      { text:'“Qué sorpresa, no esperaba que le saliera tan bien.”', ok:false }
    ],
    note:'El elogio con condición —“para ser mujer”, “igual que un hombre”— mide el trabajo contra una expectativa baja. Un buen trabajo se reconoce sin comparaciones.'
  }
];

const rewriteList = document.getElementById('rewriteList');
const rewriteStatus = document.getElementById('rewriteStatus');
let rewriteAnswered = 0;
let rewriteCorrect = 0;

rewrites.forEach((r, idx) => {
  const card = document.createElement('div');
  card.className = 'gothic-frame rewrite-card';
  card.innerHTML = `
    <div class="corner tl"><svg viewBox="0 0 22 22"><path d="M1 21V6a5 5 0 015-5h15" fill="none" stroke="#C9A44C" stroke-width="1.2"/></svg></div>
    <div class="corner tr"><svg viewBox="0 0 22 22"><path d="M1 21V6a5 5 0 015-5h15" fill="none" stroke="#C9A44C" stroke-width="1.2"/></svg></div>
    <div class="corner bl"><svg viewBox="0 0 22 22"><path d="M1 21V6a5 5 0 015-5h15" fill="none" stroke="#C9A44C" stroke-width="1.2"/></svg></div>
    <div class="corner br"><svg viewBox="0 0 22 22"><path d="M1 21V6a5 5 0 015-5h15" fill="none" stroke="#C9A44C" stroke-width="1.2"/></svg></div>
    <div class="rewrite-top">
      <span class="heard">Frase ${idx + 1}</span>
      <div class="phrase">${r.phrase}</div>
    </div>
    <div class="rewrite-options"></div>
  `;
  const optWrap = card.querySelector('.rewrite-options');
  r.options.forEach(o => {
    const b = document.createElement('button');
    b.className = 'opt-btn';
    b.textContent = o.text;
    b.addEventListener('click', () => {
      if(card.dataset.done) return;
      card.dataset.done = '1';
      rewriteAnswered++;
      if(o.ok) rewriteCorrect++;
      optWrap.querySelectorAll('.opt-btn').forEach((other, i) => {
        other.disabled = true;
        if(r.options[i].ok) other.classList.add('right');
        else if(other === b) other.classList.add('wrong');
        else other.classList.add('dim');
      });
      note.classList.add('show');
      rewriteStatus.textContent = rewriteAnswered === rewrites.length
        ? `Actividad completa — ${rewriteCorrect} de ${rewrites.length} bien elegidas.`
        : `${rewriteAnswered} de ${rewrites.length} respondidas.`;
    });
    optWrap.appendChild(b);
  });
  const note = document.createElement('div');
  note.className = 'rewrite-note';
  note.textContent = r.note;
  optWrap.appendChild(note);
  rewriteList.appendChild(card);
});

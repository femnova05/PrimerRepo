/* ================= ACTIVIDAD 1: ¿Es justo o no? ================= */
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

const scenarios = [
  {
    icon: `
      <circle cx="42" cy="42" r="8"/>
      <path d="M26 74c1.5-13 7-20 16-20s14.5 7 16 20"/>
      <circle cx="76" cy="46" r="7"/>
      <path d="M62 74c1.3-11 6-17 14-17s12.7 6 14 17"/>
      <path d="M50 52 L68 52" stroke-dasharray="3 3"/>
      <rect x="47" y="49" width="6" height="6"/>
      <rect x="65" y="49" width="6" height="6"/>
      <path d="M50 43 a4 4 0 0 1 8 0 v6 h-8 z" stroke-width="1.2"/>
    `,
    text: `En una pareja, él decide qué ropa puede usar ella, con quién puede hablar y le revisa el celular "porque la quiere".`,
    sensible: true,
    correct: 'injusto',
    feedback: `Controlar la vida de otra persona no es cuidado ni amor: es una forma de violencia. La equidad y el respeto en una relación implican confianza y libertad para ambas personas, no vigilancia ni control.`
  },
  {
    icon: `
      <rect x="26" y="64" width="66" height="4"/>
      <rect x="34" y="40" width="14" height="24"/>
      <rect x="52" y="40" width="14" height="24"/>
      <rect x="70" y="40" width="14" height="24"/>
      <circle cx="59" cy="26" r="9"/>
      <path d="M52 32 h14" stroke-dasharray="2 2"/>
      <path d="M59 17 L59 26 L64 29" stroke-width="1.3"/>
    `,
    text: `En una clase, la maestra le da el mismo tiempo extra en el examen a todos los estudiantes, incluido uno con una condición visual que necesita más tiempo para leer.`,
    sensible: false,
    correct: 'injusto',
    feedback: `Tratar a todos igual aquí no resuelve la diferencia real de necesidad. Para que sea equitativo, ese estudiante necesitaría un ajuste adicional, no exactamente el mismo trato.`
  },
  {
    icon: `
      <rect x="28" y="46" width="62" height="34"/>
      <path d="M28 46 L59 24 L90 46"/>
      <rect x="52" y="60" width="14" height="20"/>
      <path d="M28 80 L18 92 L44 92 Z"/>
      <circle cx="24" cy="86" r="3"/>
    `,
    text: `Un edificio construye una rampa además de las escaleras, para que las personas en silla de ruedas también puedan entrar.`,
    sensible: false,
    correct: 'justo',
    feedback: `No se trata de dar lo mismo a todos, sino de dar lo que cada quien necesita para tener el mismo acceso: eso es equidad.`
  },
  {
    icon: `
      <path d="M30 76 V46 L59 24 L88 46 V76 Z"/>
      <path d="M30 76 H88" />
      <circle cx="48" cy="58" r="6"/>
      <path d="M38 76c1-8 5-12 10-12s9 4 10 12"/>
      <circle cx="70" cy="60" r="6"/>
      <path d="M60 76c1-7 4.5-11 10-11s8.7 4 10 11"/>
    `,
    text: `En casa, ambas personas de la pareja se reparten las tareas del hogar según el tiempo libre real que tiene cada una esa semana, no en partes matemáticamente iguales.`,
    sensible: false,
    correct: 'justo',
    feedback: `Ajustar la repartición según la situación real de cada persona es equidad: el objetivo es que la carga se sienta pareja, no que se divida en fracciones idénticas.`
  }
];

let current = 0;
let answered = false;
let correctCount = 0;
document.getElementById('scTotal').textContent = scenarios.length;

const dotsEl = document.getElementById('dots');
scenarios.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  dotsEl.appendChild(d);
});

function updateScorePill(){
  document.getElementById('scorePill').textContent = `Aciertos ${correctCount} / ${scenarios.length}`;
}

function loadScenario(i){
  answered = false;
  const s = scenarios[i];
  document.getElementById('scCurrent').textContent = i+1;
  document.getElementById('scenarioIcon').innerHTML = medallionFrame(s.icon);
  document.getElementById('scenarioText').innerHTML = s.text + (s.sensible ? '<span class="tag-sensible"><svg viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>Tema sensible · violencia de género</span>' : '');
  const fb = document.getElementById('feedback');
  fb.className = 'feedback';
  fb.innerHTML = '';
  document.getElementById('nextBtn').classList.remove('show');
  document.querySelectorAll('.arch-btn').forEach(b => b.disabled = false);
  resetScale();
  [...dotsEl.children].forEach((d, idx) => {
    d.className = 'dot' + (idx === i ? ' active' : idx < i ? ' done' : '');
  });
}

function resetScale(){
  document.getElementById('beam').style.transform = 'rotate(0deg)';
  document.getElementById('panL').style.transform = 'translateY(0px)';
  document.getElementById('panR').style.transform = 'translateY(0px)';
}

function tiltScale(toJusto){
  const beam = document.getElementById('beam');
  const panL = document.getElementById('panL');
  const panR = document.getElementById('panR');
  if(toJusto){
    beam.style.transform = 'rotate(-10deg)'; panL.style.transform = 'translateY(11px)'; panR.style.transform = 'translateY(-11px)';
  } else {
    beam.style.transform = 'rotate(10deg)'; panL.style.transform = 'translateY(-11px)'; panR.style.transform = 'translateY(11px)';
  }
}

document.getElementById('choiceRow').addEventListener('click', (e) => {
  const btn = e.target.closest('.arch-btn');
  if(!btn || answered) return;
  answered = true;
  const choice = btn.dataset.choice;
  const s = scenarios[current];
  const isCorrect = choice === s.correct;
  if(isCorrect) correctCount++;
  updateScorePill();
  tiltScale(s.correct === 'justo');
  const fb = document.getElementById('feedback');
  fb.className = 'feedback show ' + (isCorrect ? 'correct' : 'incorrect');
  fb.innerHTML = `<span class="verdict">${isCorrect ? '✓ Correcto' : '✗ Revisemos juntos'}</span>${s.feedback}`;
  document.querySelectorAll('.arch-btn').forEach(b => b.disabled = true);
  document.getElementById('nextBtn').textContent = current < scenarios.length - 1 ? 'Siguiente →' : 'Ver resultado →';
  document.getElementById('nextBtn').classList.add('show');
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if(current < scenarios.length - 1){
    current++;
    loadScenario(current);
  } else {
    document.getElementById('sealScore').textContent = `${correctCount}/${scenarios.length}`;
    document.getElementById('seal').classList.add('show');
    document.getElementById('scenarioCard').style.opacity = '.4';
    document.getElementById('scenarioCard').style.pointerEvents = 'none';
  }
});

loadScenario(0);

/* ================= ACTIVIDAD 2: Arrastrar ================= */
const dragScenarios = [
  { id:'d1', text:'Repartir 3 lápices exactamente iguales entre 3 niños, sin ver si alguno ya tiene material.', zone:'igualdad' },
  { id:'d2', text:'Dar más tiempo de estudio a quien tuvo menos oportunidades antes del examen.', zone:'equidad' },
  { id:'d3', text:'El mismo horario de entrada para todo el personal de la oficina.', zone:'igualdad' },
  { id:'d4', text:'Adaptar la carga de trabajo de una persona en rehabilitación médica.', zone:'equidad' },
  { id:'d5', text:'Dar la misma beca económica a cada estudiante, sin revisar su situación familiar.', zone:'igualdad' },
  { id:'d6', text:'Ofrecer intérprete de lengua de señas solo a quien lo necesita en una charla.', zone:'equidad' }
];

const pool = document.getElementById('pool');
const itemsIgualdad = document.getElementById('itemsIgualdad');
const itemsEquidad = document.getElementById('itemsEquidad');
const dragStatus = document.getElementById('dragStatus');
let placedCount = 0;

dragScenarios.forEach(s => {
  const el = document.createElement('div');
  el.className = 'drag-item';
  el.textContent = s.text;
  el.draggable = true;
  el.dataset.id = s.id;
  el.dataset.zone = s.zone;
  el.addEventListener('dragstart', e => { el.classList.add('dragging'); e.dataTransfer.setData('text/plain', s.id); });
  el.addEventListener('dragend', () => el.classList.remove('dragging'));
  pool.appendChild(el);
});

[document.getElementById('zoneIgualdad'), document.getElementById('zoneEquidad')].forEach(zone => {
  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('over');
    const id = e.dataTransfer.getData('text/plain');
    const original = pool.querySelector(`.drag-item[data-id="${id}"]`);
    if(!original || original.classList.contains('placed')) return;

    const dropZoneName = zone.dataset.zone;
    const correctZone = original.dataset.zone;
    const clone = document.createElement('div');
    clone.className = 'drag-item ' + (dropZoneName === correctZone ? 'right' : 'wrong');
    clone.textContent = original.textContent;
    const target = dropZoneName === 'igualdad' ? itemsIgualdad : itemsEquidad;
    target.appendChild(clone);

    original.classList.add('placed');
    original.draggable = false;

    placedCount++;
    if(placedCount === dragScenarios.length){
      const correct = [...itemsIgualdad.children, ...itemsEquidad.children].filter(el => el.classList.contains('right')).length;
      dragStatus.textContent = `Actividad completa — ${correct} de ${dragScenarios.length} bien clasificadas.`;
    } else {
      dragStatus.textContent = `${placedCount} de ${dragScenarios.length} colocadas.`;
    }
  });
});

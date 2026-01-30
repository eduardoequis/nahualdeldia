// --- COMPATIBILIDAD DAYJS ---
// Si estamos en Node.js, cargamos la librería. Si no, asumimos que viene del HTML.
let dayjs;
if (typeof require !== 'undefined') {
    dayjs = require('dayjs');
} else {
    // En el navegador, dayjs ya debería estar cargado globalmente
    dayjs = window.dayjs;
}

const NAHUALES_DATA = [
    { n: 1, nombre: "B'atz'", desc: "Día del hilo y del mono 🐒. Ideal para planificación y artistas." },
    { n: 2, nombre: "Ee", desc: "Día del camino 🐅. Propicio para viajes y nuevos proyectos." },
    { n: 3, nombre: "Aj", desc: "Día del hogar y la abundancia 🎍. Protección familiar." },
    { n: 4, nombre: "I'x", desc: "Día del jaguar 🐅. Momento de meditación y soluciones." },
    { n: 5, nombre: "Tz'ikin", desc: "Día del pájaro 🦅. Suerte en el amor y los negocios." },
    { n: 6, nombre: "Ajmaq", desc: "Día del búho 🦉. Para el perdón y la armonía." },
    { n: 7, nombre: "No'j", desc: "Día de la sabiduría y el pensamiento claro." },
    { n: 8, nombre: "Tijax", desc: "Día del pedernal. Para cortar lo negativo." },
    { n: 9, nombre: "Kawoq", desc: "Día de la familia y la comunidad." },
    { n: 10, nombre: "Ajpu", desc: "Día del sol ☀️. Victoria sobre obstáculos." },
    { n: 11, nombre: "Imox", desc: "Día del agua y la intuición." },
    { n: 12, nombre: "Iq'", desc: "Día del viento 💨. Limpieza espiritual." },
    { n: 13, nombre: "Aq'ab'al", desc: "Día del amanecer 🌅. Nuevas oportunidades." },
    { n: 14, nombre: "K'at", desc: "Día de la red 🕸️. Para resolver enredos." },
    { n: 15, nombre: "Kan", desc: "Día de la serpiente 🐍. Fuerza e inteligencia." },
    { n: 16, nombre: "Kame", desc: "Día del renacimiento 🦉. Conexión ancestral." },
    { n: 17, nombre: "Kej", desc: "Día del venado 🦌. Equilibrio y autoridad." },
    { n: 18, nombre: "Q'anil", desc: "Día de la semilla 🐇. Inicio de proyectos." },
    { n: 19, nombre: "Toj", desc: "Día de la ofrenda 🌧️. Agradecimiento." },
    { n: 20, nombre: "Tz'i'", desc: "Día de la justicia y la ley espiritual 🐕." }
];

const CONFIG = {
    fechaBase: "2020-01-01",
    numBase: 10,
    nahualBase: 17
};

function calcularEnergia(fechaInput) {
    const seleccion = fechaInput ? dayjs(fechaInput) : dayjs();
    const dias = seleccion.diff(dayjs(CONFIG.fechaBase), 'day');

    let num = (CONFIG.numBase + dias) % 13;
    if (num <= 0) num += 13;

    let idx = (CONFIG.nahualBase + dias) % 20;
    if (idx <= 0) idx += 20;

    const info = NAHUALES_DATA.find(item => item.n === idx);
    return { numero: num, index: idx, ...info };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { calcularEnergia };
}
const { Jimp } = require('jimp');
const { calcularEnergia } = require('./app'); // Nombre correcto de la función
const path = require('path');

async function crearPost() {
    // Usamos el nombre correcto: calcularEnergia()
    const energia = calcularEnergia(); 
    console.log(`🚀 Iniciando generación: ${energia.numero} ${energia.nombre}`);

    try {
        // Rutas según tu estructura de carpetas "images"
        const rutaFondo = path.resolve(__dirname, 'images', 'fondo.png');
        const rutaNumero = path.resolve(__dirname, 'images', 'numbers', `${energia.numero}.png`);
        const rutaNahual = path.resolve(__dirname, 'images', 'nahual', `Nahual_${energia.index}.png`);
        const rutaSalida = path.resolve(__dirname, 'images', 'today.png');

        const [fondo, numero, nahual] = await Promise.all([
            Jimp.read(rutaFondo),
            Jimp.read(rutaNumero),
            Jimp.read(rutaNahual)
        ]);

        // --- 1. AJUSTE DE TAMAÑOS (Estilo "Imagen Ideal") ---
        nahual.resize({ w: 220 }); 
        numero.resize({ w: 220 });

        // --- 2. CÁLCULO DE POSICIONES ---
        const centerY = (fondo.bitmap.height / 2);
        const centerX = (fondo.bitmap.width / 2);

        // Separamos los elementos del centro para que respiren
        const numX = centerX - 280; 
        const numY = centerY - (numero.bitmap.height / 2);

        const nahualX = centerX + 20; 
        const nahualY = centerY - (nahual.bitmap.height / 2);

        // --- 3. COMPOSICIÓN ---
        fondo.composite(numero, numX, numY);
        fondo.composite(nahual, nahualX, nahualY);

        // --- 4. GUARDADO ---
        await fondo.write(rutaSalida);
        
        console.log(`✅ ¡Éxito! Imagen guardada en: ${rutaSalida}`);

    } catch (err) {
        console.error("❌ Error:", err.message);
    }
}

module.exports = { crearImagen: crearPost };
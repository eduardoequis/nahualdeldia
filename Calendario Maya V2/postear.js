require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');
const { calcularEnergia } = require('./app');
const { crearImagen } = require('./generador'); 
const nahualesInfo = require('./info'); // Importamos tu base de datos cultural
const path = require('path');

const client = new TwitterApi({
  appKey: process.env.X_API_KEY,
  appSecret: process.env.X_API_SECRET,
  accessToken: process.env.X_ACCESS_TOKEN,
  accessSecret: process.env.X_ACCESS_SECRET,
});

async function ejecutarBot() {
    try {
        console.log("🎨 Generando imagen...");
        await crearImagen(); 

        const energia = calcularEnergia();
        
        // Buscamos la info extendida en tu archivo info.js usando el índice
        // Restamos 1 porque el array empieza en 0
        const infoCultural = nahualesInfo[energia.index - 1];

        // Replicamos la estructura exacta de tu tweet.js original
        const textoTweet = `Hoy es ${energia.numero} ${infoCultural.name}\n` +
                           `El nahual ${infoCultural.icons}\n\n` +
                           `${infoCultural.day_description}`;

        console.log("📤 Publicando en X con la info de info.js...");
        const rutaImagen = path.resolve(__dirname, 'images', 'today.png');
        
        const mediaId = await client.v1.uploadMedia(rutaImagen, { mimeType: 'image/png' });
        
        await client.v2.tweet({
            text: textoTweet,
            media: { media_ids: [mediaId] }
        });

        console.log('✅ ¡Publicación exitosa con formato!');
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

ejecutarBot();
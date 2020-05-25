let watermark = require('jimp-watermark');

function createImage(daynumber, nahual) {

    let number = `./images/numbers/${daynumber}.png`
    let nahualicon = `./images/nahual/Nahual_${nahual.number}.png`

    var options = {
        'ratio': 1,
        'opacity': 1,
        'dstPath' : './images/today.png'
    };

   return watermark.addWatermark(number, nahualicon, options)
    .then(data => {
        console.log("Imagen creada");
        return data.destinationPath
    }).catch(err => {
        console.log(err);
    });

}

module.exports = createImage

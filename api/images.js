let watermark = require('jimp-watermark');

function createImage(daynumber, nahual) {

    let number = `./images/numbers/${daynumber}.png`
    let nahualicon = `./images/nahual/Nahual_${nahual.number}.png`

    var options = {
        'ratio': 1,
        'opacity': 1,
        'dstPath' : './images/today.png'
    };

    let imagePath = new Promise((resolve, reject) => { 
        setTimeout(resolve, 2000, watermark.addWatermark(number, nahualicon, options).then(image => { return image.destinationPath }))
      })
    
      console.log("imagen creada")
      return imagePath


}

module.exports = createImage

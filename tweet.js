let Twitter = require('twitter');
let createImage = require('./images')
let dotenv = require('dotenv').config();
let fs = require('fs')

let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

async function createTweet (number, nahual) {

  try {
    tweet = `Hoy es ${number} ${nahual.name}
El nahual ${nahual.icons}

${nahual.day_description}`

    let image = await createImage(number, nahual)
    
    sendTweet (image, tweet)

    } catch (error){
      console.log(error)
  }
    
}

function sendTweet (image, text) {

    let data = fs.readFileSync(image);

    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', {media: data}, function(error, media, response) {

    if (!error) {

        console.log(media);

        var status = {
        status: text,
        media_ids: media.media_id_string // Pass the media id string
        }

        client.post('statuses/update', status, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        }
        });

    }

    });
}

module.exports = createTweet

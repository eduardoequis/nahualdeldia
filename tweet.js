let Twitter = require('twitter');
let createImage = require('./images')

let client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

 function createTweet (number, nahual) {

    tweet = `Hoy es ${number} ${nahual.name}
    El nahual ${nahual.icons}

    ${nahual.day_description}`

    let image = createImage(number, nahual)
    
    image.then(image => sendTweet(image, tweet))
    

}

function sendTweet (image, text) {

 
    let data = require('fs').readFileSync(image);

    // Make post request on media endpoint. Pass file data as media parameter
    client.post('media/upload', {media: data}, function(error, media, response) {

    if (!error) {

        // console.log(media);

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

   
 /*
    console.log("Tweet enviado")
    console.log(text)

     */
}

module.exports = createTweet

  /*
Tweet:

client.post('statuses/update', {status: 'I am a tweet'}, function(error, tweet, response) {
  if (!error) {
    console.log(tweet);
  }
});

Images: 

// Load your image
var data = require('fs').readFileSync('image.jpg');

// Make post request on media endpoint. Pass file data as media parameter
client.post('media/upload', {media: data}, function(error, media, response) {

  if (!error) {

    // If successful, a media object will be returned.
    console.log(media);

    // Lets tweet it
    var status = {
      status: 'I am a tweet',
      media_ids: media.media_id_string // Pass the media id string
    }

    client.post('statuses/update', status, function(error, tweet, response) {
      if (!error) {
        console.log(tweet);
      }
    });

  }
});



  */
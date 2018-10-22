const express = require('express');
const Twitter = require('twit');

const app = express();
const client = new Twitter({
  consumer_key: 'HUTbbE1ovbgBch4V537weCiVS',
  consumer_secret: 'MzPSO5S7xWTRIjGCGbXFX7iaFZ6REUuQStBZLdsRejCvuIntXA',
  access_token: '790339097046810624-xWel9we1G0dUvH7Uu0Tg8LrOI3nquI8',
  access_token_secret: 'zOAQuyARhciE1CFOez7rt3AZfFL4DMii4XcHNPh0AyjvP'
});

app.use(require('cors')());
app.use(require('body-parser').json());

//API call to search/tweets to pull relevant tweets based on queries performed
//retrieves json object of 100 tweets relevant to the query: "banana"
app.get('/api/search', (req, res) => {
  client
  .get('search/tweets', { q: 'banana', count: 100 }
)
.then(search => {
  res.send(search);
})
.catch(error => {
  res.send(error);
  console.log("couldn't search");
})
})
;

//API call to account/verify_credentials to pull user data onto endpoint /api/user
app.get('/api/user', (req, res) => {
  console.log("successful user obtained");

  client
    .get('account/verify_credentials')
    .then(user => {
      res.send(user);

    })
    .catch(error => {
      res.send(error)
      console.log("failure!!!!!!!!");
    });
});

let cache = [];
let cacheAge = 0;

app.get('/api/home', (req, res) => {
  if (Date.now() - cacheAge > 60000) {
    console.log('60 seconds elapsed');
    cacheAge = Date.now();
    const params = { tweet_mode: 'extended', count: 200 };
    if (req.query.since) {
      params.since_id = req.query.since;
    }
    client
      .get(`statuses/home_timeline`, params)
      .then(timeline => {
        cache = timeline;
        res.send(timeline);
      })
      .catch(error => res.send(error));
  } else {
    res.send(cache);
  }
});

app.post('/api/favorite/:id', (req, res) => {
  const path = req.body.state ? 'create' : 'destroy';
  client
    .post(`favorites/${path}`, { id: req.params.id })
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

app.post('/api/retweet/:id', (req, res) => {
  const path = req.body.state ? 'retweet' : 'unretweet';
  client
    .post(`statuses/retweet/${req.params.id}`)
    .then(tweet => res.send(tweet))
    .catch(error => res.send(error));
});

// app.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
//   console.log(data)
// })

app.listen(3000, () => console.log('Server running'));

const express = require('express');
const request = require('request');
const querystring = require('querystring');
const dotenv = require('dotenv').config({ path: './config.env' });

const app = express();

const redirect_uri =
  process.env.REDIRECT_URI || 'http://localhost:8888/callback';

const scope = [
  'user-read-playback-state',
  'user-read-private',
  'playlist-read-private',
  'user-library-modify',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'user-follow-modify',
  'user-modify-playback-state',
  'user-read-email',
  'user-library-read',
  'user-top-read',
  'playlist-modify-public',
  'user-follow-read',
  'user-read-currently-playing',
  'user-read-recently-played'
];
let scopeString = '';
scope.forEach(s => (scopeString += `${s} `));
scopeString = scopeString.slice(0, -1);
console.log(scopeString);

app.get('/login', (req, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        scope: scopeString,
        redirect_uri
      })
  );
});

app.get('/callback', (req, res) => {
  const code = req.query.code || null;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(
          process.env.SPOTIFY_CLIENT_ID +
            ':' +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString('base64')
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    const access_token = body.access_token;
    const uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

const port = process.env.PORT || 8888;
console.log(
  `Listening on port ${port}. Go /login to initiate authentication flow.`
);
app.listen(port);

const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI
});
console.log('Spotify Client ID:', process.env.SPOTIFY_CLIENT_ID);
console.log('Spotify Client Secret:', process.env.SPOTIFY_CLIENT_SECRET);
console.log('Spotify Redirect URI:', process.env.SPOTIFY_REDIRECT_URI);

module.exports = spotifyApi;

// src/pages/api/playlist-songs.js
import spotifyApi from '../../../lib/spotify-api'; // Adjust the path if needed

export default async function handler(req, res) {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    // Replace 'YOUR_PLAYLIST_ID' with your playlist ID
    const playlistId = '4JxrclerunAVSh3GVX1pii';
    const playlistTracks = await spotifyApi.getPlaylistTracks(playlistId, {
      limit: 50, // Adjust as needed
    });

    res.status(200).json(playlistTracks.body);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch playlist songs', details: err.message });
  }
}

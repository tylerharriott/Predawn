
const spotifyApi = require('../../../../lib/spotify-api');

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    const artist = await spotifyApi.getArtist(id);
    const topTracks = await spotifyApi.getArtistTopTracks(id, 'US');

    res.status(200).json({
      artist: artist.body,
      topTracks: topTracks.body.tracks.slice(0, 5), // Only returning the top 5 tracks
    });
  } catch (error) {
    console.error('Error fetching artist data:', error);
    res.status(500).json({ error: 'Failed to fetch artist data' });
  }
}

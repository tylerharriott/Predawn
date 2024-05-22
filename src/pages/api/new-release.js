import spotifyApi from '../../../lib/spotify-api';  // Adjust the path if needed

export default async function handler(req, res) {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    const newReleases = await spotifyApi.getNewReleases({ limit: 1, country: 'US' });
    res.status(200).json(newReleases.body.albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}

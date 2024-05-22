import spotifyApi from '../../../lib/spotify-api';  // Adjust the path if needed

export default async function handler(req, res) {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);

    const newReleases = await spotifyApi.getNewReleases({ limit: 7, country: 'US' });
    console.log(newReleases.body);  // Log the response body to inspect the structure
    res.status(200).json(newReleases.body.albums);  // Make sure this matches the actual data structure
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch data', details: err.message });
  }
}
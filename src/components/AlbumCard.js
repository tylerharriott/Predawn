import React from 'react';

function AlbumCard({ album }) {
  return (
    <div style={{ margin: 20, padding: 20, border: '1px solid #ccc' }}>
      <img src={album.images[0].url} alt={album.name} style={{ width: 100, height: 100 }} />
      <h3>{album.name}</h3>
      <p>By {album.artists.map(artist => artist.name).join(', ')}</p>
      <p>Released on: {album.release_date}</p>
      <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
    </div>
  );
}

export default AlbumCard;

import React, { useEffect, useState } from 'react';
import AlbumCard from '../components/AlbumCard';

function NewReleases() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch('/api/new-release')
      .then(response => response.json())
      .then(data => setAlbums(data.items))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}

export default NewReleases;

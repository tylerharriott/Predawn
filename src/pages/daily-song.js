// src/pages/daily-song.js
import { Box, Text, VStack, Flex, Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FooterNote from '../components/FooterNote';

function DailySong() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await fetch('/api/playlist-songs'); // New endpoint
        const data = await response.json();
        if (data && data.items) {
          const dayOfWeek = new Date().getDay(); // Pick a song based on the day of the week
          const track = data.items[dayOfWeek % data.items.length].track;

          const formattedSong = {
            name: track.name,
            artists: track.artists.map(artist => artist.name).join(', '),
            release_date: track.album.release_date
              ? new Date(track.album.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'N/A',
            duration: track.duration_ms / 60000, // Convert ms to minutes as a float
            image: track.album.images[0]?.url || '',
            spotify_url: track.external_urls.spotify,
          };

          setSong(formattedSong);
        }
      } catch (error) {
        console.error('Failed to fetch song:', error);
      }
    }

    fetchSong();
  }, []);

  return (
    <Box
      height="100vh"
      bgGradient="linear(to-b, sunset.900, sunset.200 60%, sunset.100 90%)"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="20px"
    >
      {song ? (
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          justify="center"
          width="full"
          padding="4"
        >
          <Image
            src={song.image}
            alt={song.name}
            boxSize={{ base: '100%', md: '350px' }}
            objectFit="cover"
            marginRight={{ md: '20px' }}
          />
          <VStack spacing={4} align="flex-start" maxWidth={{ md: '650px' }}>
            <Text fontSize="2xl" fontWeight="bold">{song.name}</Text>
            <Text fontSize="lg">
              <Text as="span" fontWeight="bold">Artist: </Text>{song.artists}
            </Text>
            <Text fontSize="md">
              <Text as="span" fontWeight="bold">Release Date: </Text>{song.release_date}
            </Text>
            <Text fontSize="md">
              <Text as="span" fontWeight="bold">Duration: </Text>
              {Math.floor(song.duration)}:
              {Math.round((song.duration % 1) * 60).toString().padStart(2, '0')} minutes
            </Text>
            <Button colorScheme="orange" as="a" href={song.spotify_url} target="_blank">
              Listen on Spotify
            </Button>
          </VStack>
        </Flex>
      ) : (
        <Text fontSize="xl" fontWeight="bold">Loading song...</Text>
      )}
      <FooterNote />
    </Box>
  );
}

export default DailySong;

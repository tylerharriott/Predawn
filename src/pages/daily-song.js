// src/pages/daily-song.js
import { Box, Text, VStack, Flex, Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FooterNote from '../components/FooterNote';

function DailySong() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await fetch('/api/new-release');  // Assuming 'new-release' gives up to 7 new albums
        const data = await response.json();
        if (data && data.items) {
          const dayOfWeek = new Date().getDay();  // Sunday - 0, Monday - 1, ..., Saturday - 6
          // Check if there are at least 7 albums, if not, use the first album
          const selectedSong = data.items.length >= 7 ? data.items[dayOfWeek] : data.items[0];
          // Format the release date to be more human-readable
          selectedSong.release_date = new Date(selectedSong.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          setSong(selectedSong);
        }
      } catch (error) {
        console.error('Failed to fetch song:', error);
        // Optionally handle the error by displaying a default message or image
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
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          width="full"
          padding="4"
        >
          <Image
            src={song.images[0].url}
            alt={song.name}
            boxSize={{ base: "100%", md: "350px" }}
            objectFit="cover"
            marginRight={{ md: "20px" }}
          />
          <VStack spacing={4} align="flex-start" maxWidth={{ md: "650px" }}>
            <Text fontSize="2xl" fontWeight="bold">{song.name}</Text>
            <Text fontSize="lg">{song.artists.map(artist => artist.name).join(', ')}</Text>
            <Text fontSize="md">Release Date: {song.release_date}</Text>  // Formatted date
            <Text fontSize="md">Total Tracks: {song.total_tracks}</Text>
            <Button colorScheme="orange" as="a" href={song.external_urls.spotify} target="_blank">
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

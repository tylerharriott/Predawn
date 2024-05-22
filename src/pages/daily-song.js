// src/pages/daily-song.js
import { Box, Text, VStack, Flex, Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

function DailySong() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    fetch('/api/new-release')  // Assuming 'new-release' is your API route
      .then(response => response.json())
      .then(data => {
        if (data && data.items && data.items.length > 0) {
            setSong({
              ...data.items[0],
              release_date: new Date(data.items[0].release_date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })  // Formatting the release date
            });  // Assuming the song data is in 'items[0]'
        }
      })
      .catch(error => console.error('Failed to fetch song:', error));
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
            <Text fontSize="md">Release Date: {song.release_date}</Text>
            <Text fontSize="md">Total Tracks: {song.total_tracks}</Text>
            <Button colorScheme="orange" as="a" href={song.external_urls.spotify} target="_blank">
              Listen on Spotify
            </Button>
          </VStack>
        </Flex>
      ) : (
        <Text fontSize="xl" fontWeight="bold">Loading song...</Text>
      )}
    </Box>
  );
}

export default DailySong;

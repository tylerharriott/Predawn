import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Image, Flex } from '@chakra-ui/react';
import FooterNote from '../components/FooterNote';

function ArtistPage({ artistId }) {
  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function fetchArtistData() {
      try {
        const res = await fetch(`/api/artist/${artistId}`);
        const data = await res.json();
        setArtist(data.artist);
        setTopTracks(data.topTracks);
      } catch (error) {
        console.error('Failed to fetch artist data:', error);
      }
    }

    fetchArtistData();
  }, [artistId]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      bgGradient="linear(to-b, sunset.900, sunset.200 60%, sunset.100 90%)"
    >
      {artist ? (
        <Box width="90%" maxWidth="1100px" bg="gray.900" borderRadius="20px" boxShadow="lg" overflow="hidden">
          {/* Artist Image and Name */}
          <Box position="relative" width="100%" height="350px"> {/* Adjust height here */}
            <Image
              src={artist.images[0].url} // Artist image
              alt={artist.name}
              width="100%" // Adjust width here
              height="100%" // Adjust height here
              objectFit="cover"
              borderTopLeftRadius="20px"
              borderTopRightRadius="20px"
            />
            <Text
              position="absolute"
              bottom="10px"
              left="20px"
              fontSize="4xl"
              fontWeight="bold"
              color="white"
              bg="rgba(0, 0, 0, 0.6)" // Slightly transparent background to make the text more readable
              p={2}
              borderRadius="10px"
            >
              {artist.name}
            </Text>
          </Box>

          <Box padding="10px 20px 0px 20px" > {/* Removed extra padding here */}
            <Text fontSize="lg" color="gray.300">
              {artist.followers.total.toLocaleString()} monthly listeners
            </Text>
          </Box>

          {/* Add more spacing between artist section and top songs */}
          <Box padding="30px" bg="gray.800" mt={10}> {/* Adjust the `mt={10}` value to add more space */}
            <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
              Top 5 Songs
            </Text>
            <Flex direction="row" justifyContent="space-between">
              {topTracks.map((track) => (
                <Box key={track.id} display="flex" flexDirection="column" alignItems="center" textAlign="center">
                  <Image
                    src={track.album.images[0].url}
                    alt={track.name}
                    boxSize="100px"
                    borderRadius="10px"
                    mb={2}
                  />
                  <Text fontSize="md" color="white" noOfLines={1}>
                    {track.name}
                  </Text>
                  <Text fontSize="sm" color="gray.300">
                    {track.album.name}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      ) : (
        <Text fontSize="xl" fontWeight="bold" color="white">
          Loading artist...
        </Text>
      )}
      <FooterNote />
    </Box>
  );
}

export default ArtistPage;

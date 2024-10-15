import { Box, Text, VStack, Flex, Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import FooterNote from '../components/FooterNote';

function DailySong() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    async function fetchSong() {
      try {
        const response = await fetch('/api/new-release');
        const data = await response.json();
        if (data && data.items) {
          const dayOfWeek = new Date().getDay();
          const selectedSong = data.items.length >= 7 ? data.items[dayOfWeek] : data.items[0];
          selectedSong.release_date = new Date(selectedSong.release_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          setSong(selectedSong);
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
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding="20px"
      bgGradient="linear(to-b, sunset.900, sunset.200 60%, sunset.100 90%)"
    >
      {song ? (
        <Box 
          width="80%"
          maxWidth="1000px"
          bg="gray.900"
          borderRadius="20px"
          boxShadow="lg"
          overflow="hidden"
        >
          {/* Top Section - Artist Image and Name */}
          <Flex
            bgGradient="linear(to-r, #003973, #E5E5BE)"
            padding="20px"
            flexDirection={{ base: "column", md: "row" }}
            alignItems="center"
          >
            <Image
              src="/images/artist_image.jpg" // Replace with actual artist image
              alt="Artist Image"
              boxSize="200px"
              borderRadius="full"
              objectFit="cover"
            />
            <VStack align="flex-start" ml={{ base: 0, md: 6 }} mt={{ base: 4, md: 0 }}>
              <Text fontSize="4xl" fontWeight="bold" color="white">
                Rhyan Douglas {/* Replace with actual artist name */}
              </Text>
              <Text fontSize="lg" color="gray.200">
                28,052 monthly listeners {/* You can adjust the subheading */}
              </Text>
            </VStack>
          </Flex>

          {/* Bottom Section - Video and Song Details */}
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            padding="20px"
            bg="gray.800"
          >
            {/* Video Section */}
            <Box 
              width={{ base: "100%", md: "45%" }}
              mb={{ base: 4, md: 0 }}
              display="flex"
              justifyContent="center"
            >
              <video
                width="100%"
                height="100%"
                loop
                autoPlay
                muted
                playsInline
                style={{ borderRadius: "20px" }} // Rounded corners for video
              >
                <source src="/videos/pipe_down.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>

            {/* Song Details */}
            <VStack 
              align="flex-start"
              width={{ base: "100%", md: "50%" }}
            >
              <Text fontSize="2xl" fontWeight="bold" color="white">{song.name}</Text>
              <Text fontSize="lg" color="gray.300">
                {song.artists.map(artist => artist.name).join(', ')}
              </Text>
              <Text fontSize="md" color="gray.400">Release Date: {song.release_date}</Text>
              <Text fontSize="md" color="gray.400">Total Tracks: {song.total_tracks}</Text>
              <Button colorScheme="orange" as="a" href={song.external_urls.spotify} target="_blank">
                Listen on Spotify
              </Button>
            </VStack>
          </Flex>
        </Box>
      ) : (
        <Text fontSize="xl" fontWeight="bold" color="white">Loading song...</Text>
      )}
      <FooterNote />
    </Box>
  );
}

export default DailySong;

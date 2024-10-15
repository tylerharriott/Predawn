import { useRouter } from 'next/router';
import { Box, Button, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import FooterNote from '../components/FooterNote';
import { FaMusic, FaStar, FaShareAlt } from 'react-icons/fa';

function Home() {
  const router = useRouter();

  const goToArtistPage = () => {
    router.push('/artist/4fxd5Ee7UefO4CUXgwJ7IP'); // Daniel Caesar's ID
  };

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
      <VStack spacing={6}>
        {/* Artist of the Day Section */}
        <Text fontSize="2xl" fontWeight="semibold" color="black" textAlign="center">
          Artist of the Day
        </Text>
        <Text fontSize="4xl" fontWeight="bold" textAlign="center" color="white">
          Meet Your New Favorite Artist
        </Text>
        <Text fontSize="md" textAlign="center" color="gray.200" maxWidth="80%">
          Every day, we spotlight a new artist, giving you a taste of their unique sound. Check out today's feature and explore their latest track.
        </Text>
        
        {/* Button to Artist Page */}
        <Button colorScheme="yellow" size="lg" mt={8} onClick={goToArtistPage}>
          Explore Daniel Caesar's Top Tracks
        </Button>
      </VStack>
      <FooterNote />
    </Box>
  );
}

export default Home;

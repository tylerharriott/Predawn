import { useRouter } from 'next/router';
import { Box, Button, Text, VStack } from '@chakra-ui/react';
import FooterNote from '../components/FooterNote'; 

function Home() {
  const router = useRouter();

  const handleGetDailySong = () => {
    router.push('/daily-song'); // Redirect to the daily song page
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
      <VStack spacing={4}>
        <Text fontSize="4xl" fontWeight="bold" textAlign="center">
          Predawn
        </Text>
        <Text fontSize="md" textAlign="center">
          All tracks are handpicked and are promised to have you coming back!
        </Text>
        <Button colorScheme="orange" variant="solid" onClick={handleGetDailySong}>
          Get a daily song
        </Button>
      </VStack>
      <FooterNote />
    </Box>
  );
}

export default Home;

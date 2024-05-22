import { Box, Button, Text, VStack, ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';  // Ensure the path to your theme file is correct

function Home() {
  return (
    <ChakraProvider theme={theme}>
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
          <Button colorScheme="orange" variant="solid">
            Get Daily Song
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default Home;
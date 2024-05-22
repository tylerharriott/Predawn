import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    sunset: {
      900: '#003973', // deep blue
      200: '#ff8a65', // soft orange
      100: '#ffcc80', // lighter orange
    },
  },
});

export default theme;
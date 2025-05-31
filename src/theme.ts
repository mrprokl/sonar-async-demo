import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
  components: {
    Box: {
      baseStyle: {
        _hover: {
          transform: 'translateY(-2px)',
          shadow: 'lg',
        },
        transition: 'all 0.2s',
      },
    },
  },
});

export default theme; 
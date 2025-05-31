import { Box, Text, Link } from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box
      as="footer"
      py={6}
      textAlign="center"
      borderTop="1px solid"
      borderColor="#77774d"
      bg="#100000"
    >
      <Text color="#e4e3d4">
        Built with ❤️ |{' '}
        <Link
          href="https://github.com/mrprokl/sonar-async-demo"
          color="#4CAF50"
          isExternal
          _hover={{ textDecoration: 'underline' }}
        >
          View on GitHub
        </Link>
      </Text>
    </Box>
  );
}; 
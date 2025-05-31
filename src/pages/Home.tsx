import { Box, Container, Heading, SimpleGrid, Text, VStack, useToast, Spinner, Textarea, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, InputGroup, InputRightElement, useClipboard, Input, Image } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitAsyncRequest } from '../services/api';

const predefinedQueries = [
  {
    id: '1',
    title: 'Quantum Computing Basics',
    description: 'Explain the fundamental principles of quantum computing in simple terms',
    query: 'Explain the fundamental principles of quantum computing in simple terms'
  },
  {
    id: '2',
    title: 'Climate Change Impact',
    description: 'What are the most significant impacts of climate change on marine ecosystems?',
    query: 'What are the most significant impacts of climate change on marine ecosystems?'
  },
  {
    id: '3',
    title: 'AI Ethics',
    description: 'Discuss the ethical considerations in developing artificial intelligence systems',
    query: 'Discuss the ethical considerations in developing artificial intelligence systems'
  }
];

// Define a simple theme for the new sections using the provided colors
const sectionTheme = {
  bg: '#091717', // Dark background color from provided palette
  color: '#e4e3d4', // Light text color from provided palette
};

const features = [
  {
    icon: "⚡️", // Using simple text icons for now
    title: 'Asynchronous Processing',
    description: 'Submit queries and retrieve results later, perfect for long-running tasks.',
  },
  {
    icon: "🧠",
    title: 'Powerful Capabilities',
    description: 'Leverage advanced search and research features via the API.',
  },
  {
    icon: "😊",
    title: 'User-Friendly Demo',
    description: 'Easily explore API features with predefined and custom queries.',
  },
];

export const Home = () => {
  const [loading, setLoading] = useState<string | null>(null);
  const navigate = useNavigate();
  const toast = useToast();
  const [apiKey, setApiKey] = useState('');

  const [customQuery, setCustomQuery] = useState('');
  const [customQueryLoading, setCustomQueryLoading] = useState(false);

  // State for the new modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);

  // Hook for copy to clipboard
  const { onCopy, hasCopied } = useClipboard(currentRequestId || '');

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentRequestId(null);
  };

  const handleQuerySubmit = async (query: string, id: string) => {
    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your Perplexity API key.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(id);
      const response = await submitAsyncRequest(query, apiKey);
      setCurrentRequestId(response.id);
      setIsModalOpen(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit query. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(null);
    }
  };

  const handleCustomQuerySubmit = async () => {
    if (!customQuery.trim()) {
      toast({
        title: 'Input Empty',
        description: 'Please enter a query.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: 'API Key Required',
        description: 'Please enter your Perplexity API key.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setCustomQueryLoading(true);
      const response = await submitAsyncRequest(customQuery, apiKey);
      setCurrentRequestId(response.id);
      setIsModalOpen(true);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit custom query. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setCustomQueryLoading(false);
    }
  };

  const handleGoToResult = () => {
    if (currentRequestId) {
      navigate(`/result/${currentRequestId}`); // Navigate to the new result page
      handleCloseModal();
    }
  };

  return (
    <Box {...sectionTheme}> {/* Apply dark background and light text color */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={12} align="stretch">
          <Box textAlign="center">
            <Image
              src="/logo.svg"
              alt="Perplexity Logo"
              height="60px"
              margin="0 auto"
              mb={8}
              filter="invert(1)"
            />
            <Heading as="h1" size="2xl" mb={4} color="#e4e3d4"> {/* Heading color */}
              Explore the Async API Demo
            </Heading>
            <Text fontSize="xl" color="#757876"> {/* Slightly darker text for description */}
              See how to integrate powerful asynchronous search and research into your applications.
            </Text>
          </Box>

          {/* Features Section */}
          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={8} color="#e4e3d4"> {/* Heading color */}
              Key Capabilities
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
              {features.map((feature, index) => (
                <VStack
                  key={index}
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  borderColor="#77774d" // Border color from palette
                  bg="#100000" // Dark card background
                  align="start"
                  spacing={4}
                >
                  <Text fontSize="4xl">{feature.icon}</Text>
                  <Heading as="h3" size="md" color="#e4e3d4"> {/* Heading color */}
                    {feature.title}
                  </Heading>
                  <Text color="#757876">{feature.description}</Text> {/* Text color */}
                </VStack>
              ))}
            </SimpleGrid>
          </Box>

          {/* Predefined Queries Section */}
          <Box>
             <Heading as="h2" size="xl" textAlign="center" mb={8} color="#e4e3d4"> {/* Heading color */}
              Try a Predefined Query
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {predefinedQueries.map((query) => (
                <Box
                  key={query.id}
                  p={6}
                  borderWidth="1px"
                  borderRadius="lg"
                  cursor="pointer"
                  onClick={() => handleQuerySubmit(query.query, query.id)}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'lg',
                  }}
                  transition="all 0.2s"
                  bg="#100000" // Dark card background
                  borderColor="#77774d" // Border color
                  position="relative"
                >
                  {loading === query.id && (
                    <Box
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                      bg="rgba(16, 0, 0, 0.8)" // Semi-transparent dark background using #100000
                      p={4}
                      borderRadius="md"
                    >
                      <Spinner size="lg" color="#e4e3d4"/> {/* Spinner color */}
                    </Box>
                  )}
                  <VStack align="start" spacing={4}>
                    <Heading as="h3" size="md" color="#e4e3d4"> {/* Heading color */}
                      {query.title}
                    </Heading>
                    <Text color="#757876">{query.description}</Text> {/* Text color */}
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Custom Query Section */}
          <Box>
            <Heading as="h2" size="xl" textAlign="center" mb={8} color="#e4e3d4">
              Or Enter Your Own Query
            </Heading>
            <VStack spacing={4} maxW="600px" mx="auto">
              <Input
                placeholder="Enter your Perplexity API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                size="md"
                bg="#100000"
                color="#e4e3d4"
                borderColor="#77774d"
                _placeholder={{ color: '#757876' }}
                type="password"
                maxW="400px"
                mx="auto"
              />
              <Textarea
                placeholder="Enter your query here..."
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                size="lg"
                minH="150px"
                bg="#100000"
                color="#e4e3d4"
                borderColor="#77774d"
                _placeholder={{ color: '#757876' }}
              />
              <Button
                onClick={handleCustomQuerySubmit}
                isLoading={customQueryLoading}
                size="lg"
                alignSelf="center"
                bg="#77774d"
                color="#100000"
                _hover={{ bg: "#e4e3d4", color: "#100000" }}
              >
                Submit Custom Query
              </Button>
            </VStack>
          </Box>

        </VStack>
      </Container>

      {/* New Request ID Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent bg="#100000" color="#e4e3d4" borderColor="#77774d" borderWidth="1px">
          <ModalHeader>Request Submitted!</ModalHeader>
          <ModalCloseButton color="#e4e3d4"/>
          <ModalBody>
            <Text mb={2}>Your request has been submitted successfully. Here is your Request ID:</Text>
            <InputGroup size="md">
              <Input
                value={currentRequestId || ''}
                isReadOnly
                pr="4.5rem"
                bg="#091717"
                color="#e4e3d4"
                borderColor="#77774d"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={onCopy} bg="#77774d" color="#100000" _hover={{ bg: "#e4e3d4", color: "#100000" }}>
                  {hasCopied ? "Copied!" : "Copy"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text mt={4}>Use this ID to retrieve your result later.</Text>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button
              bg="#77774d"
              _hover={{ bg: "#e4e3d4" }}
              size="lg"
              onClick={handleGoToResult}
              fontFamily="monospace"
              fontSize="lg"
              color="#e4e3d4"
            >
              Retrieve My Result
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default Home; 
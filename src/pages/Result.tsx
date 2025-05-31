import { Box, Container, Heading, Text, VStack, Input, Button, Spinner, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getAsyncResponse } from '../services/api';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const sectionTheme = {
  bg: '#091717',
  color: '#e4e3d4',
  minHeight: '100vh',
  py: 10,
};

export const Result = () => {
  const { requestId: urlRequestId } = useParams<{ requestId: string }>();
  const [requestId, setRequestId] = useState(urlRequestId || '');
  const [apiKey, setApiKey] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [citations, setCitations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlRequestId) {
      fetchStatus();
    }
  }, [urlRequestId]);

  const fetchStatus = async () => {
    if (!requestId.trim() || !apiKey.trim()) {
      return;
    }

    setLoading(true);
    setStatus(null);
    setResult(null);

    try {
      const response = await getAsyncResponse(requestId, apiKey);
      setStatus(response.status);
      if (response.status === 'COMPLETED') {
        if (response.response && typeof response.response === 'object' && response.response.choices && response.response.choices.length > 0 && response.response.choices[0].message && typeof response.response.choices[0].message.content === 'string') {
          setResult(response.response.choices[0].message.content);
          if (response.response.citations && Array.isArray(response.response.citations)) {
            setCitations(response.response.citations);
          }
        } else {
          setResult('Could not parse the result content.' + (response.response ? JSON.stringify(response.response, null, 2) : ''));
        }
      }
    } catch (error) {
      setStatus('ERROR');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box {...sectionTheme}>
      <Container maxW="container.md" py={10}>
        <VStack spacing={8} align="stretch" textAlign="center">
          <Image
            src="/logo.svg"
            alt="Perplexity Logo"
            height="60px"
            margin="0 auto"
            mb={8}
            filter="invert(1)"
          />
          <Heading as="h1" size="xl" color="#e4e3d4">
            Check Request Status
          </Heading>

          <VStack spacing={6} maxW="600px" mx="auto">
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
            <Input
              placeholder="Enter your Request ID"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              size="lg"
              bg="#100000"
              color="#e4e3d4"
              borderColor="#77774d"
              _placeholder={{ color: '#757876' }}
            />
            <Button
              onClick={fetchStatus}
              isLoading={loading}
              size="lg"
              bg="#77774d"
              color="#e4e3d4"
              _hover={{ bg: "#e4e3d4", color: "#100000" }}
            >
              Fetch Result
            </Button>
          </VStack>

          {status && (
            <Box p={6} borderWidth="1px" borderRadius="lg" borderColor="#77774d" bg="#100000" textAlign="left">
              <Heading as="h2" size="md" mb={4} color="#e4e3d4">Status: {status}</Heading>
              {loading ? (
                <VStack spacing={4} align="center">
                   <Spinner size="xl" color="#e4e3d4"/>
                   <Text color="#e4e3d4">Fetching result...</Text>
                </VStack>
              ) : status === 'COMPLETED' && result !== null ? (
                <Box>
                  <Heading as="h3" size="md" mb={2} color="#e4e3d4">Result:</Heading>
                  <MarkdownRenderer content={result} citations={citations} />
                </Box>
              ) : status !== 'FAILED' && status !== 'ERROR' ? (
                <Text color="#e4e3d4">We are still cooking for you...</Text>
              ) : null}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Result; 
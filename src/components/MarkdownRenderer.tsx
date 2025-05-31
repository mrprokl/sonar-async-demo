import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import 'katex/dist/katex.min.css';
import { Box, Link, VStack, Text } from '@chakra-ui/react';

interface MarkdownRendererProps {
  content: string;
  citations?: string[]; // Add citations prop
}

export const MarkdownRenderer = ({ content, citations = [] }: MarkdownRendererProps) => {
  // Pre-process the content to handle citations and math
  const processedContent = content
    // Convert math expressions in square brackets to proper LaTeX delimiters
    .replace(/\[(.*?)\]/g, (match, content) => {
      // Check if the content looks like a math expression
      if (content.includes('\\') || content.includes('|') || content.includes('\\langle') || content.includes('\\rangle')) {
        return `\\[${content}\\]`;
      }
      return match; // Return original if not a math expression
    });

  // Extract citation numbers from the content
  const citationNumbers = Array.from(content.matchAll(/\[(\d+)\]/g))
    .map(match => parseInt(match[1]))
    .filter((num, index, self) => self.indexOf(num) === index) // Remove duplicates
    .sort((a, b) => a - b); // Sort in ascending order

  return (
    <VStack align="stretch" spacing={4}>
      <Box
        className="markdown-content"
        sx={{
          '& .markdown-content': {
            color: '#e4e3d4',
          },
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            color: '#e4e3d4',
            marginTop: '1.5em',
            marginBottom: '0.5em',
            fontWeight: 'bold',
          },
          '& h1': { fontSize: '2em' },
          '& h2': { fontSize: '1.5em' },
          '& h3': { fontSize: '1.25em' },
          '& p': {
            marginBottom: '1em',
            lineHeight: '1.6',
          },
          '& .katex': {
            fontSize: '1.1em',
          },
          '& .katex-display': {
            margin: '1em 0',
            overflowX: 'auto',
            overflowY: 'hidden',
          },
          '& code': {
            backgroundColor: '#1a1a1a',
            padding: '0.2em 0.4em',
            borderRadius: '3px',
            fontSize: '0.9em',
          },
          '& pre': {
            backgroundColor: '#1a1a1a',
            padding: '1em',
            borderRadius: '5px',
            overflowX: 'auto',
            margin: '1em 0',
          },
          '& blockquote': {
            borderLeft: '4px solid #77774d',
            margin: '1em 0',
            padding: '0.5em 1em',
            backgroundColor: '#1a1a1a',
          },
          '& ul, & ol': {
            marginLeft: '2em',
            marginBottom: '1em',
          },
          '& li': {
            marginBottom: '0.5em',
          },
          '& a': {
            color: '#4CAF50',
            textDecoration: 'underline',
            '&:hover': {
              color: '#45a049',
            },
          },
          '& table': {
            borderCollapse: 'collapse',
            width: '100%',
            margin: '1em 0',
          },
          '& th, & td': {
            border: '1px solid #77774d',
            padding: '0.5em',
            textAlign: 'left',
          },
          '& th': {
            backgroundColor: '#1a1a1a',
          },
          // Add styles for citations
          '& sup': {
            color: '#4CAF50',
            cursor: 'pointer',
            marginLeft: '0.2em',
            '& a': {
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex, rehypeRaw]}
          components={{
            a: ({ node, ...props }) => (
              <Link
                {...props}
                color="#4CAF50"
                _hover={{ color: '#45a049', textDecoration: 'underline' }}
              />
            ),
          }}
        >
          {processedContent}
        </ReactMarkdown>
      </Box>

      {/* Citations section */}
      {citationNumbers.length > 0 && (
        <Box
          mt={8}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          borderColor="#77774d"
          bg="#100000"
        >
          <Text as="h3" fontSize="lg" color="#e4e3d4" mb={4}>
            References
          </Text>
          <VStack align="stretch" spacing={2}>
            {citationNumbers.map((num) => (
              <Text key={num} color="#e4e3d4">
                [{num}]:{' '}
                <Link
                  href={citations[num - 1] || '#'}
                  color="#4CAF50"
                  isExternal
                  _hover={{ color: '#45a049', textDecoration: 'underline' }}
                >
                  {citations[num - 1] || `Reference ${num}`}
                </Link>
              </Text>
            ))}
          </VStack>
        </Box>
      )}
    </VStack>
  );
}; 
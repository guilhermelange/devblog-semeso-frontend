import { Box } from '@chakra-ui/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function CodeBlock({ language, value }: { language: any, value: any }) {
  return (
    <Box p={2} borderWidth="0px" borderRadius="md" overflowX="auto">
      <SyntaxHighlighter language={language} style={dracula}>
        {value}
      </SyntaxHighlighter>
    </Box>
  );
}

export default CodeBlock;
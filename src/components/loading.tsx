import { Box, Spinner } from "@chakra-ui/react";

export default function LoadingScreen()  {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="50vh"
      width="100%"
    >
      <Spinner size="xl" />
    </Box>
  );
};
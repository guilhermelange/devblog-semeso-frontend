import { Box, Center } from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box top={'100vh'} position={'sticky'}>
            <Center h={'140px'} minH={'140px'} w={'full'} bg={"whiteAlpha.50"}>
                © {(new Date()).getUTCFullYear()} - Blog
            </Center>
        </Box>
    )
}
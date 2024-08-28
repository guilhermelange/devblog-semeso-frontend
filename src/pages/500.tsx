import { useColorModeValue } from "@chakra-ui/react";
import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NotFound() {
    const router = useRouter();
    const [path, setPath] = useState("");

    const primary = useColorModeValue("purple", "purple")
    const text = useColorModeValue("black", "white")

    useEffect(() => {
        setPath(router.asPath);
    }, [router.asPath])

    return (
        <Flex alignItems={'center'} justifyContent={'center'} h={'100vh'}>
            <Box p={6} textAlign={'center'} background={'whiteAlpha.50'}>
                <VStack spacing={6}>
                    <Heading>Desculpe, algo ocorreu errado<Text display={'inline'} color={primary}>!</Text> </Heading>
                    <Text color={primary}>{path}</Text>
                </VStack>
            </Box>
        </Flex>
    )
}
import { useColorModeValue } from "@chakra-ui/react";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
interface SignUpSectionDTO {
    headingText: string[];
    commentText: string[];
    buttonText: string;
    onClick: () => void;
}

export default function SignUpSection({ headingText, commentText, buttonText, onClick }: SignUpSectionDTO) {

    const primary = useColorModeValue("purple", "purple")
    const bg = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

    return (
        <Flex
            w="full"
            h="full"
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={bg}
            borderRadius={[0, 0, 0, 10]}
        >

            <VStack
                p={10}
                spacing={10}
                align="center">
                <Heading textAlign={'center'}>{headingText[0]}<Text display={'inline'}>{headingText[1]}</Text></Heading>
                <Text textAlign={'center'}>{commentText[0]}<br />{commentText[1]}</Text>
                <Button colorScheme={primary} onClick={onClick} variant={'outline'} w='full'>{buttonText}</Button>
            </VStack>
        </Flex>
    )
}
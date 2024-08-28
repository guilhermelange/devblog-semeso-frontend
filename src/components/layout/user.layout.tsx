import { Box, Container, Flex } from "@chakra-ui/react";
import Footer from "../footer";
import { NavTop } from "../nav.top";

interface UserLayoutDTO {
    children: any
    queryString?: string | string[] | undefined
}

export default function UserLayout({ children, queryString }: UserLayoutDTO) {
    return (
        <Flex direction={'column'} justifyContent={'space-between'} flexGrow={1} minH={'100vh'}>
            <Box w={'full'} borderBottom={'1px solid'} borderColor={'whiteAlpha.200'}>
                <Container maxW={"container.xl"} position={'relative'}>
                    <NavTop inputSearch={queryString} />
                </Container>
            </Box>

            <Container
                flexGrow={1}
                maxW={"container.xl"}
            >
                {children}
            </Container>
            <Footer></Footer>
        </Flex>
    )
}
import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/user.layout";
import LoadingScreen from "@/components/loading";
import Post from "@/components/post";
import { PostContext } from "@/context/PostContext";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useContext } from "react"

export default function Search() {
    const { posts, loadSearch, loading } = useContext(PostContext);
    const router = useRouter();

    useEffect(() => {
        if (router.query.q) {
            loadSearch(String(router.query.q));
        }
    }, [router.query.q])

    return (
        <>
            <SEO title="Pesquisa" />
            <UserLayout>
                <Container maxW="container.xl" py={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Heading size={'lg'} mb={4}>Resultados</Heading>
                            <SimpleGrid minChildWidth='350px' spacing='40px'>
                                {posts && posts.map(item => (<Post key={item.id} post={item}></Post>))}
                            </SimpleGrid>
                        </>}

                </Container>
            </UserLayout>
        </>

    )
}
import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/user.layout";
import LoadingScreen from "@/components/loading";
import Post from "@/components/post";
import { PostContext } from "@/context/PostContext";
import { api } from "@/services/api";
import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useContext } from "react"

export default function Favorite() {
    const { posts, loadAll, loading } = useContext(PostContext);

    useEffect(() => {
        loadAll(true);
    }, [])

    return (
        <>
            <SEO title="Favoritos" />
            <UserLayout>
                <Container maxW="container.xl" py={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Heading size={'lg'} mb={4}>Favoritos</Heading>
                            <SimpleGrid minChildWidth='350px' spacing='40px'>
                                {posts && posts.map(item => (<Post key={item.id} post={item}></Post>))}
                            </SimpleGrid>
                        </>}

                </Container>
            </UserLayout>
        </>

    )
}
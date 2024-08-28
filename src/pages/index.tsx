import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/user.layout";
import LoadingScreen from "@/components/loading";
import Pagination from "@/components/pagination";
import Post from "@/components/post";
import { PostContext } from "@/context/PostContext";
import { Center, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react"

export default function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    const { posts, total, loadAll, loadAllByPage, loading } = useContext(PostContext);

    useEffect(() => {
        loadAll(false);
    }, [])

    const handlePageChange = (page: any) => {
        loadAllByPage(+page);
    };

    return (
        <>
            <SEO title="Home" />
            <UserLayout>
                <Container maxW="container.xl" py={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Heading size={'lg'} mb={4}>Todos os Posts</Heading>
                            <SimpleGrid minChildWidth='350px' spacing='40px' pb={8}>
                                {posts && posts.map(item => (<Post key={item.id} post={item}></Post>))}
                            </SimpleGrid>
                            <Center>
                                <Pagination currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    maxButtons={5}
                                    itemsPerPage={12}
                                    onPageChange={handlePageChange}
                                    totalItems={total}></Pagination>
                            </Center></>}
                </Container>
            </UserLayout>
        </>

    )
}
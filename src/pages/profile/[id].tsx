import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/user.layout";
import { Box, Container, Text, Heading, Stack, SimpleGrid, Avatar, Center } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { api } from "@/services/api";
import LoadingScreen from "@/components/loading";
import Post from "@/components/post";
import { PostContext } from "@/context/PostContext";
import { useRouter } from "next/router";
import { resources } from "@/services/api.constants";

export default function PublicProfile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { posts, loadForUser, loading: loadingPost } = useContext(PostContext);
    
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        description: '',
        id: 0,
    })

    useEffect(() => {
        if (router.query.id) {
            setLoading(true);

            api.get(`${resources.USERS}/users/${router.query.id}`)
                .then((item: any) => {
                    const profiletData = item.data;
                    setProfile({ ...profiletData })
                    setLoading(false);
                }).catch((error) => {
                    setLoading(false);
                })

            loadForUser(Number(router.query.id));

        }
    }, [router.query.id]);

    return (
        <>
            <SEO title={profile?.name ? profile?.name : 'Perfil'} />
            <UserLayout>
                <Container maxW="container.sm" py={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Center flexDirection={'column'}>
                                <Heading size="lg" mb={4} display={'flex'}>
                                    <Text>{profile.name}</Text>
                                </Heading>
                                <Text >{profile.description}</Text>
                                <Avatar mt={6} name={profile?.name} size={'xl'}></Avatar>
                            </Center>
                        </>}
                </Container>
                {loadingPost && <LoadingScreen></LoadingScreen>}
                {!loadingPost && posts &&
                    <>
                        <Stack flexDir={'row'} w={'full'} justifyContent={'space-between'}>
                            <Heading size="md" mb={4} display={'flex'}>
                                <Text>Posts por {profile?.name}</Text>
                            </Heading>
                        </Stack>

                        <SimpleGrid mb={12} minChildWidth='350px' spacing='40px'>
                            {posts && posts.map(item => (<Post key={item.id} post={item}></Post>))}
                        </SimpleGrid>
                    </>}
            </UserLayout>
        </>
    )
}
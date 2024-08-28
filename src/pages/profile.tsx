import SEO from "@/components/SEO";
import UserLayout from "@/components/layout/user.layout";
import { Box, Container, Text, FormLabel, Input, FormControl, Heading, Stack, useToast, useColorModeValue, SimpleGrid, Avatar, Center, IconButton } from "@chakra-ui/react";
import CustomButton from "@/components/custom.button";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";
import LoadingScreen from "@/components/loading";
import { AuthContext, User } from "@/context/AuthContext";
import Post from "@/components/post";
import { PostContext } from "@/context/PostContext";
import { FaPlus } from "react-icons/fa";
import { resources } from "@/services/api.constants";

export default function Profile() {
    const toast = useToast();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { user, updateUser } = useContext(AuthContext);
    const { posts, loadForUser, loading: loadingPost } = useContext(PostContext);
    const primary = useColorModeValue("purple", "purple")

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        description: '',
        id: 0,
    })

    useEffect(() => {
        setLoading(true);
        api.get(`${resources.USERS}/users/${user?.id}`)
            .then((item: any) => {
                const profiletData = item.data;
                setProfile({ ...profiletData })
                setLoading(false);
            }).catch((error) => {
                console.log(error)
                setLoading(false);
            })

        loadForUser(Number(user?.id));
    }, [])

    const handleReturn = async () => { router.back() }

    const handleNewPost = () => {
        router.push('/edit/post/0')
    }

    const handleUpdate = async () => {
        api.put(`${resources.USERS}/users`, {
            name: profile.name,
            description: profile.description,
        })
            .then((e: any) => {
                toast({
                    title: 'Usuário atualizado com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                updateUser(profile as unknown as User);
            })
            .catch((error: any) => {
                toast({
                    title: 'Algo deu errado!',
                    status: 'error',
                    duration: 2000,
                    description: error.response?.data?.message || 'Erro interno',
                    isClosable: true,
                })
            });
    }

    return (
        <>
            <SEO title="Perfil" />
            <UserLayout>
                <Container maxW="container.sm" py={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Center flexDirection={'column'}>
                                <Heading size="lg" mb={4} display={'flex'}>
                                    <Text>Seu Perfil</Text>
                                </Heading>
                                <Avatar name={user?.name} size={'xl'}></Avatar>
                            </Center>
                            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }}>
                                <Box flex="1" mr={{ md: 4 }}>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="name">Nome</FormLabel>
                                        <Input id="name" name="name" placeholder="Nome" value={profile?.name}
                                            onChange={e => { setProfile({ ...profile, name: e.target.value }) }} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="description">Descrição</FormLabel>
                                        <Input id="description" name="description" placeholder="Descrição" value={profile?.description}
                                            onChange={e => { setProfile({ ...profile, description: e.target.value }) }} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <Input isReadOnly id="email" name="email" placeholder="Email" type="email" value={profile?.email}
                                            onChange={e => { setProfile({ ...profile, email: e.target.value }) }} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <Stack direction={'row'}>
                                            <CustomButton colorSchema={primary} callback={handleUpdate}>Confirmar</CustomButton>
                                            <CustomButton colorSchema={'gray'} variant="outline" callback={handleReturn}>Voltar</CustomButton>
                                        </Stack>
                                    </FormControl>
                                </Box>
                            </Box>
                        </>}
                </Container>
                {loadingPost && <LoadingScreen></LoadingScreen>}
                {!loadingPost && posts &&
                    <>
                        <Stack flexDir={'row'} w={'full'} justifyContent={'space-between'}>
                            <Heading size="lg" mb={4} display={'flex'}>
                                <Text>Seus Posts</Text>
                            </Heading>
                            <IconButton
                                variant="outline"
                                aria-label="Add item"
                                icon={<FaPlus />}
                                ml="2"
                                onClick={handleNewPost}/>
                        </Stack>

                        <SimpleGrid mb={12} minChildWidth='350px' spacing='40px'>
                            {posts && posts.map(item => (<Post key={item.id} post={item}></Post>))}
                        </SimpleGrid>
                    </>}
            </UserLayout>
        </>
    )
}
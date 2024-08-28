import SEO from "@/components/SEO"
import CustomButton from "@/components/custom.button"
import UserLayout from "@/components/layout/user.layout"
import LoadingScreen from "@/components/loading";
import { api } from "@/services/api";
import { resources } from "@/services/api.constants";
import { STATIC_URL } from "@/services/constant";
import { Box, Center, Container, FormControl, FormLabel, Heading, Image, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, ResponsiveValue, Stack, Text, Textarea, useColorModeValue, useToast } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface PostNew {
    title: string;
    description: string;
    time_read: number;
    slug: string;
    content: string;
    upload_image: boolean;
}

export default function NewPost() {
    const primary = useColorModeValue("purple", "purple")
    const router = useRouter();
    const toast = useToast();
    const [id, setId] = useState(0);
    const [loading, setLoading] = useState(true);
    const [selectedFile, setSelectedFile] = useState(null);
    const [post, setPost] = useState({
        title: '',
        description: '',
        time_read: 0,
        slug: '',
        content: '',
        upload_image: false,
    } as PostNew);

    useEffect(() => {
        if (router.query.id) {
            setId(+router.query.id);
            if (+router.query.id > 0) {
                setLoading(true);
                api.get(`${resources.POSTS}/posts/${+router.query.id}`)
                    .then(item => {
                        setPost(item.data);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                    })
            } else {
                setLoading(false);
            }

        }
    }, [router.query.id]);

    const handleReturn = async () => { router.back() }

    const handleCreate = async () => {
        api.post(`${resources.POSTS}/posts`, {
            title: post.title,
            description: post.description,
            content: post.content,
            time_read: post.time_read,
            slug: post.slug,
            upload_image: false
        })
            .then(e => {
                updateFile(e.data.id);
                toast({
                    title: `Post criado com sucesso!`,
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                handleReturn();
            })
            .catch(e => {
                toast({
                    title: 'Algo deu errado!',
                    status: 'error',
                    duration: 2000,
                    description: e.response?.data?.message || 'Erro interno',
                    isClosable: true,
                })
            });
    }

    const handleUpdate = async () => {
        api.put(`${resources.POSTS}/posts/${id}`, {
            title: post.title,
            description: post.description,
            content: post.content,
            time_read: post.time_read,
            slug: post.slug
        })
            .then(e => {
                updateFile(id);
                toast({
                    title: 'Post atualizado com sucesso!',
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
                // handleReturn();
            })
            .catch(e => {
                toast({
                    title: 'Algo deu errado!',
                    status: 'error',
                    duration: 2000,
                    description: e.response?.data?.message || 'Erro interno',
                    isClosable: true,
                })
            });
    }

    const updateFile = (postId: number) => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile as unknown as File);

            api.post(`${resources.POSTS}/posts/${postId}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(item => {
                })
                .catch(error => {
                })

        }
    }

    const handleChangeFile = (e: any) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <>
            <SEO title="Post" />
            <UserLayout>
                <Container maxW="container.sm" pt={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Center flexDirection={'column'}>
                                <Heading size="lg" mb={4} display={'flex'}>
                                    <Text>{id > 0 ? 'Editar Post' : 'Novo Post'}</Text>
                                </Heading>
                            </Center>
                            <Box display="flex" flexDirection={{ base: 'column', md: 'row' }}>
                                <Box flex="1" mr={{ md: 4 }}>
                                    <FormControl mb={4}>
                                        <Center>
                                            <Image src={post.upload_image ? STATIC_URL + post.slug : STATIC_URL + 'default.png'}
                                                borderRadius='lg' 
                                                mb={4}
                                                alt="logo"
                                                maxW={'100%'}></Image>
                                        </Center>
                                        <Input pl={1} pb={0} pt={1} type="file" name="file" onChange={handleChangeFile}></Input>
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="title">Título</FormLabel>
                                        <Input id="title" name="title" placeholder="Título" value={post?.title}
                                            onChange={e => { setPost({ ...post, title: e.target.value }) }} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="description">Descrição</FormLabel>
                                        <Input id="description" name="description" placeholder="Descrição" value={post?.description}
                                            onChange={e => { setPost({ ...post, description: e.target.value }) }} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="slug">Slug</FormLabel>
                                        <Input id="slug" name="slug" placeholder="Slug" value={post?.slug}
                                            onChange={e => { setPost({ ...post, slug: e.target.value }) }} />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel htmlFor="time_read">Tempo de Leitura (min)</FormLabel>
                                        <NumberInput value={post?.time_read}
                                            onChange={value => { setPost({ ...post, time_read: +value }) }}>
                                            <NumberInputField id="time_read" name="time_read" placeholder="Tempo de Leitura" />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </FormControl>
                                </Box>
                            </Box>
                        </>}

                </Container>
                <Container maxW="container.sm" pb={8}>
                    {!loading &&
                        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }}>
                            <Box flex="1" mr={{ md: 4 }}>
                                <FormControl mb={4}>
                                    <FormLabel htmlFor="content">Conteúdo</FormLabel>
                                    <Textarea id="content" name="content" placeholder="Conteúdo" value={post?.content} variant={'filled'} minH={80}
                                        // resize={resize}
                                        onChange={e => { setPost({ ...post, content: e.target.value }) }} />
                                </FormControl>
                                <FormControl mb={4}>
                                    <Stack direction={'row'}>
                                        <CustomButton colorSchema={primary} callback={id > 0 ? handleUpdate : handleCreate}>Confirmar</CustomButton>
                                        <CustomButton colorSchema={'gray'} variant="outline" callback={handleReturn}>Voltar</CustomButton>
                                    </Stack>
                                </FormControl>
                            </Box>
                        </Box>}

                </Container>
            </UserLayout>
        </>
    )
}
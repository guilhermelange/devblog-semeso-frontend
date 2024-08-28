import SEO from "@/components/SEO"
import CodeBlock from "@/components/codeblock";
import Comments from "@/components/comments";
import UserLayout from "@/components/layout/user.layout"
import LoadingScreen from "@/components/loading"
import { AuthContext } from "@/context/AuthContext";
import { PostContext } from "@/context/PostContext";
import { IPost } from "@/models/post.models";
import { api } from "@/services/api";
import { resources } from "@/services/api.constants";
import { formatDate } from "@/utils/view.utils";
import { Avatar, Box, Container, Divider, Heading, Icon, IconButton, Image, Link, List, ListItem, Stack, Text } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { FaRegEdit, FaTrash } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';

export default function PagePost() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({} as IPost);
    const { user, authenticated } = useContext(AuthContext);
    const { handleSetFavorite } = useContext(PostContext);

    useEffect(() => {
        if (router.query.slug) {
            setLoading(true);
            api.get(`${resources.POSTS}/posts/${router.query.slug}/slug`)
                .then(item => {
                    setPost(item.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                    setLoading(false);
                })
        }
    }, [router.query.slug]);

    const handleFavorite = () => {
        handleSetFavorite(post as IPost);
        post.favorite = !post?.favorite;
    }

    const handleEditPost = () => {
        router.push(`/edit/post/${post.id}`)
    }

    const handleRemovePost = () => {
        api.delete(`${resources.POSTS}/posts/${post.id}`)
            .then(item => {
                router.back();
            })
            .catch(error => {
            })
    }

    const handleProfile = () => {
        router.push(`/profile/${post.users.id}`)
    }

    return (
        <>
            <SEO title="Post" />
            <UserLayout>
                <Container maxW="container.md" py={8}>
                    {loading && <LoadingScreen></LoadingScreen>}
                    {!loading &&
                        <>
                            <Stack>
                                <Box>
                                    <Stack direction={'row'} gap={4}>
                                        <Avatar name={post?.users?.name}></Avatar>
                                        <Box>
                                            <Text _hover={{ textDecoration: 'underline' }} onClick={handleProfile} cursor={'pointer'}>{post?.users?.name}</Text>
                                            <Text fontSize={'sm'} color={'gray'}>{post?.users?.description}</Text>
                                        </Box>
                                    </Stack>
                                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                                        <Text fontSize={'4xl'}>{post?.title}</Text>
                                        {authenticated() && <Icon cursor={'pointer'} onClick={handleFavorite} w={6} h={6} as={post?.favorite ? BsFillBookmarkFill : BsBookmark} />}
                                    </Stack>
                                    <Text fontSize={'sm'} color={'gray'}>{formatDate(new Date(post?.create_date))} - {post?.time_read} min read</Text>
                                </Box>
                                <Divider fontSize={'3xl'} my={4}></Divider>
                                <Box>
                                    <ReactMarkdown
                                        components={{
                                            h1: ({ children }) => (
                                                <Heading as="h1" size="xl" mb={4}>
                                                    {children}
                                                </Heading>
                                            ),
                                            h2: ({ children }) => (
                                                <Heading as="h2" size="lg" mb={3}>
                                                    {children}
                                                </Heading>
                                            ),
                                            h3: ({ children }) => (
                                                <Heading as="h3" size="md" mb={2}>
                                                    {children}
                                                </Heading>
                                            ),
                                            h4: ({ children }) => (
                                                <Heading as="h4" size="md" mb={2}>
                                                    {children}
                                                </Heading>
                                            ),
                                            h5: ({ children }) => (
                                                <Heading as="h5" size="md" mb={2}>
                                                    {children}
                                                </Heading>
                                            ),
                                            h6: ({ children }) => (
                                                <Heading as="h6" size="md" mb={2}>
                                                    {children}
                                                </Heading>
                                            ),
                                            p: ({ children }) => (
                                                <Text fontSize="md" color="whiteAlpha.700" mb={4}>
                                                    {children}
                                                </Text>
                                            ),
                                            ul: ({ children }) => (
                                                <List styleType="disc" pl={4} mb={4}>
                                                    {children}
                                                </List>
                                            ),
                                            ol: ({ children }) => (
                                                <List as="ol" styleType="decimal" pl={4} mb={4}>
                                                    {children}
                                                </List>
                                            ),
                                            li: ({ children }) => (
                                                <ListItem>
                                                    {children}
                                                </ListItem>
                                            ),
                                            a: ({ children, href }) => (
                                                <Link color="blue.500" textDecoration="underline" href={href}>
                                                    {children}
                                                </Link>
                                            ),
                                            img: ({ src, alt }) => (
                                                <Image src={src} alt={alt} w="100%" maxW="400px" mx="auto" my={4} />
                                            ),
                                            code: ({ node, className, children, ...props }) => {
                                                const match = /language-(\w+)/.exec(className || '');
                                                return match ? (
                                                    <CodeBlock language={match[1]} value={String(children).replace(/\n$/, '')} {...props} />
                                                ) : (
                                                    <code className={className} {...props}>
                                                        {children}
                                                    </code>
                                                );
                                            },
                                        }}

                                    >{post?.content}</ReactMarkdown>
                                </Box>
                                {authenticated() && user?.id && post?.users && post.users.id == +user?.id &&
                                    <>
                                        <IconButton
                                            variant="solid"
                                            colorScheme="gray"
                                            aria-label="Edit item"
                                            icon={<FaRegEdit />}
                                            w={'full'}
                                            onClick={handleEditPost}
                                        />
                                        <IconButton
                                            variant="outline"
                                            colorScheme="red"
                                            aria-label="remove item"
                                            icon={<FaTrash />}
                                            w={'full'}
                                            onClick={handleRemovePost}
                                        />
                                    </>
                                }
                                <Comments postId={post.id}></Comments>
                            </Stack>
                        </>}
                </Container>
            </UserLayout>
        </>
    )
}
import { AuthContext } from "@/context/AuthContext";
import { PostContext } from "@/context/PostContext";
import { IPost } from "@/models/post.models";
import { STATIC_URL } from "@/services/constant";
import { formatDate } from "@/utils/view.utils";
import { Box, Card, CardBody, CardFooter, Heading, Icon, IconButton, Image, Stack, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";

export default function Post({ post }: { post: IPost }) {
    const { authenticated, user } = useContext(AuthContext);
    const { handleSetFavorite } = useContext(PostContext);
    const router = useRouter();

    const handleFavorite = () => {
        handleSetFavorite(post);
    }

    const handleRedirectPost = () => {
        router.push(`/post/${post.slug}`)
    }

    const handleEditPost = () => {
        router.push(`/edit/post/${post.id}`)
    }

    const handleProfile = () => {
        router.push(`/profile/${post.users.id}`)
    }

    return (
        <>
            <Card maxW='lg' _hover={{ transform: 'scale(1.03)' }} transition={'transform 0.2s'}>
                <Box maxW={'100%'} height={'220px'} overflow={'hidden'}>
                    <Image
                        onClick={handleRedirectPost}
                        cursor={'pointer'}
                        src={post.upload_image ? STATIC_URL + post.slug : STATIC_URL + 'default.png'}
                        alt={post.slug}
                        height={'auto'}
                        width={'100%'}
                        borderRadius='md'
                        maxHeight="220px" 
                        minH={'220px'}
                        objectFit="cover"
                    />
                </Box>
                <CardBody onClick={handleRedirectPost} cursor={'pointer'}>
                    <Stack spacing='3'>
                        <Heading size='md'>{post?.title}</Heading>
                        <Text fontSize={'xs'}>{post?.description}</Text>
                    </Stack>
                </CardBody>
                <CardFooter fontSize={'sm'} w={'full'}>
                    <Stack direction={'row'} w={'full'} justifyContent={'space-between'}>
                        <Stack>
                            <Text _hover={{ textDecoration: 'underline' }} onClick={handleProfile} cursor={'pointer'}>{post?.users?.name}</Text>
                            <Text color={'whiteAlpha.700'}> {formatDate(new Date(post.create_date))} - {post?.time_read} min read</Text>
                        </Stack>
                        {authenticated() &&
                            <Icon cursor={'pointer'} onClick={handleFavorite} w={6} h={6} as={post?.favorite ? BsFillBookmarkFill : BsBookmark} />
                        }
                    </Stack>
                </CardFooter>
                {authenticated() && user?.id && post.users.id == +user?.id &&
                    <IconButton
                        variant="solid"
                        colorScheme="gray"
                        aria-label="Edit item"
                        icon={<FaRegEdit />}
                        onClick={handleEditPost}
                    />
                }
            </Card>
        </>
    )
}
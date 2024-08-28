import { AuthContext } from "@/context/AuthContext";
import { api } from "@/services/api";
import { formatDateTime } from "@/utils/view.utils";
import { Avatar, Box, Button, Divider, FormControl, FormLabel, Heading, Input, SimpleGrid, Stack, Text, Textarea } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { IoMdClose } from "react-icons/io";
import LoadingScreen from "./loading";
import { resources } from "@/services/api.constants";

interface Comment {
    id: number;
    content: string;
    create_date: string;
    users: {
        name: string;
        id: number;
    }
}

export default function Comments({ postId }: { postId: number }) {
    const [comments, setComments] = useState([] as Comment[]);
    const [comment, setComment] = useState('');
    const { user, authenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`${resources.COMMENTS}/comments/${postId}`)
            .then(item => {
                setComments(item.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
            })
    }, [])

    const handleAddComment = () => {
        api.post(`${resources.COMMENTS}/comments`, {
            post_id: postId,
            content: comment
        })
            .then(item => {
                const newComment = {
                    id: +item.data.id,
                    content: comment,
                    create_date: new Date(),
                    users: {
                        id: user?.id,
                        name: user?.name
                    }
                } as unknown as Comment;
                setComments([...comments, newComment]);
                setComment('');
            })
            .catch(error => { })
    }

    const handleRemove = (id: number) => {
        api.delete(`${resources.COMMENTS}/comments/${id}`)
            .then(item => {
                setComments(comments.filter(aux => aux.id != id))
            })
            .catch(error => {

            })
    }

    return (
        <>
            <Divider pt={4}></Divider>
            {loading && <LoadingScreen></LoadingScreen>}
            {!loading &&
                <Box >
                    <Heading pt={4} mb={2} size={'md'}>Comentários</Heading>
                    <SimpleGrid columns={1} spacing={4}>
                        {comments.map((comment) => (
                            <Box key={comment.id} p={4} bgColor={'whiteAlpha.100'} borderRadius="md">
                                <Stack flexDirection={'row'} justifyContent={'space-between'} textAlign={'center'} alignItems={'center'} mb={1}>
                                    <Stack flexDirection={'row'} alignItems={'center'}>
                                        <Avatar name={comment.users.name} size={'sm'}></Avatar>
                                        <Text fontWeight="bold" fontSize={'sm'}>{comment.users.name}</Text>
                                    </Stack>
                                    <Stack flexDirection={'row'}>
                                        <Text color={'gray'} fontSize={'xs'}>{formatDateTime(new Date(comment.create_date))}</Text>
                                        {authenticated() && Number(user?.id) == comment.users.id &&
                                            <Box onClick={() => handleRemove(comment.id)} cursor={'pointer'}>
                                                <IoMdClose></IoMdClose>
                                            </Box>}
                                    </Stack>
                                </Stack>
                                <Text pl={1} fontSize={'sm'} color={'whiteAlpha.700'}>{comment.content}</Text>
                            </Box>
                        ))}
                    </SimpleGrid>
                    {authenticated() &&
                        <FormControl mb={4} pt={4}>
                            <FormLabel htmlFor="leave">Deixe um comentário</FormLabel>
                            <Textarea value={comment} variant={'filled'}
                                onChange={e => { setComment(e.target.value) }}
                                borderBottomEndRadius={comment ? 0 : 'md'}
                                borderBottomStartRadius={comment ? 0 : 'md'}></Textarea>
                            {comment &&
                                <Button onClick={handleAddComment} colorScheme="gray" color={'white'} borderTopRadius={0} w={'full'}>Comentar</Button>}
                        </FormControl>}
                    {!authenticated() &&
                        <FormLabel mt={4} htmlFor="leave">Efetue o login para comentar...</FormLabel>}

                </Box>}
        </>
    )
}
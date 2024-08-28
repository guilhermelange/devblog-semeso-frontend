import { SimpleGrid } from "@chakra-ui/react";
import Post from "./post";

export default function PostList({ posts }: { posts: any[] }) {
    return (
        <>
            <SimpleGrid minChildWidth={'350px'} spacing='40px'>
                {posts && posts.map(item => (<Post key={item.id} post={item}></Post>))}
            </SimpleGrid>
        </>
    )
}
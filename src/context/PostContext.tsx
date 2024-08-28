import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { api } from '@/services/api'
import { IPost } from "@/models/post.models";
import { resources } from "@/services/api.constants";

interface PostProviderProps {
    children: ReactNode;
}

interface PostContextType {
    loadAll: (onlyFavorite: boolean) => Promise<void>;
    loadForUser: (userId: number) => Promise<void>;
    loadAllByPage: (page: number) => Promise<void>;
    handleSetFavorite: (post: IPost) => Promise<void>;
    loadSearch: (q: string) => Promise<void>;
    posts: IPost[];
    total: number;
    loading: boolean;
}

export const PostContext = createContext({} as PostContextType)

export function PostProvider({ children }: PostProviderProps) {
    const [posts, setPosts] = useState([] as IPost[]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    async function loadAll(onlyFavorite: boolean) {
        setLoading(true);
        const apiUrl = onlyFavorite ? 'posts?favorite=true' : 'posts';
        api.get(`${resources.POSTS}/${apiUrl}`)
            .then(item => {
                setPosts(item.data.data);
                setTotal(item.data.count);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }

    async function loadAllByPage(page: number) {
        setLoading(true);
        api.get(`${resources.POSTS}/posts?page=${page}`)
            .then(item => {
                setPosts(item.data.data);
                setTotal(item.data.count);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }

    async function loadForUser(userId: number) {
        setLoading(true);
        api.get(`${resources.POSTS}/posts?user_id=${userId}`)
            .then(item => {
                setPosts(item.data.data);
                setTotal(item.data.count);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }

    async function loadSearch(q: string) {
        setLoading(true);
        api.get(`${resources.POSTS}/posts?q=${q}`)
            .then(item => {
                setPosts(item.data.data);
                setTotal(item.data.count);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }

    function updatePosts(id: number, favorite: boolean) {
        const updatedPosts = posts.map((aux) => {
            if (aux.id === id) {
              return {
                ...aux,
                favorite: favorite,
              };
            }
            return aux;
          });
        setPosts(updatedPosts)
    }
    

    async function handleSetFavorite(post: IPost) {
        const favoriteBoolean = !post.favorite
        updatePosts(post.id, favoriteBoolean);
        api.put(`${resources.POSTS}/posts/${post.id}/favorite`, {favorite: !post.favorite})
            .then(item => {
            })
            .catch(error => {
                updatePosts(post.id, !favoriteBoolean);
            })
    }

    return (
        <PostContext.Provider value={{ loadSearch, loadForUser, loadAll, loadAllByPage, handleSetFavorite, posts, total, loading }}>
            {children}
        </PostContext.Provider>
    )
}
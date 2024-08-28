import { signInRequest } from "@/services/auth";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api";
import { useStatePersist } from 'use-state-persist';

interface AuthContextData {
    signIn(credentials: SignInCredentials): Promise<void>;
    logout: () => Promise<void>;
    user: undefined | User
    isAuthenticated: boolean;
    authenticated: () => boolean;
    updateUser: (user: User) => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

interface SignInCredentials {
    email: string;
    password: string;
    google?: boolean;
    avatar?: string;
    name?: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

export const AuthContext = createContext({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useStatePersist('@user', {} as User);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    async function signIn({ email, password, google, avatar, name: userName }: SignInCredentials) {
        const { token, user: { id, name, avatar: avatar_url } } = await signInRequest({
            email,
            password,
            avatar,
            name: userName
        })

        const loggedUser = { id, name, email, avatar: avatar_url }
        setUser(loggedUser)

        setCookie(null, 'nextauth.token', token, {
            maxAge: 60 * 60 * 5, // 1 hour
            path: '/'
        })

        setCookie(null, 'nextauth.avatar', avatar_url, {
            maxAge: 60 * 60 * 5, // 5 hour
            path: '/'
        })

        setCookie(null, 'nextauth.name', name, {
            maxAge: 60 * 60 * 5, // 5 hour
            path: '/'
        })

        setCookie(null, 'nextauth.id', id, {
            maxAge: 60 * 60 * 5, // 5 hour
            path: '/'
        })

        setAuthenticated(true);

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        router.push('/');
    }

    async function logout() {
        destroyCookie(null, 'nextauth.token', {
            path: '/'
        });
        destroyCookie(null, 'nextauth.avatar', {
            path: '/'
        });
        destroyCookie(null, 'nextauth.name', {
            path: '/'
        });
        destroyCookie(null, 'nextauth.id', {
            path: '/'
        });
        setUser({} as User)
        setAuthenticated(false);
        router.push('/signin');
    }

    function authenticated() {
        const {'nextauth.token': token} = parseCookies();
        return !!token;
    }

    function updateUser(user: User) {
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{ updateUser, user, isAuthenticated, authenticated, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
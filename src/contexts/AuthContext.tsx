import { createContext, ReactNode, useState, useEffect } from "react";
import { fauna } from "../services/fauna";
import { query as q } from "faunadb";
import { setCookie, parseCookies } from 'nookies';
import Router from "next/router";
import { api } from "../services/api";

type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInData = {
    email: string,
    password: string;
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn(credentials: SignInData): Promise<void>;
}


type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();

    const isAuthenticated = !!user;

    useEffect(() => {
        const { 'comic.token': token } = parseCookies();
        if (token) {
            api.get('/me').then(response => {
                const { email, permissions, roles } = response.data


                setUser({ email, permissions, roles });
            })
        }
    }, [])
    async function signIn({ email, password }: SignInData) {
        try {

            const response = await api.post('sessions', {
                email, password
            })

            const { token, refreshToken, permissions, roles } = response.data;

            setCookie(undefined, 'comic.token', token, {
                maxAge: 60 * 60 * 24 * 30, //30 days
                path: '/'
            })


            setCookie(undefined, 'refreshComic.token', refreshToken, {
                maxAge: 60 * 60 * 1, //1 hour
                path: '/'
            })

            setUser(
                {
                    email,
                    permissions,
                    roles
                }
            )

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            Router.push('/comics');
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}
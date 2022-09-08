import { createContext, useState } from "react";
import { fauna } from "../services/fauna";
import { query as q } from "faunadb";
import { setCookie } from 'nookies';
import Router from "next/router";

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (user, account, profile) => Promise<boolean>;
}


type SignInData = {
    name: string;
    email: string,
    password: string;
}

type User = {
    name: string;
    email: string;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User | null>();


    const isAuthenticated = !!user;

    async function signIn({ user, account, profile }) {
        const { name, email, password, token } = user;

        setCookie(undefined, 'comic.token', token, {
            maxAge: 60 * 60 * 1, //1 hour
        })

        setUser(user)

        Router.push('/notAllowed')
        try {
            await fauna.query(
                q.If(
                    q.Not(
                        q.Exists(
                            q.Match(q.Index('user_by_email'), q.Casefold(user.email)),
                        ),
                    ),
                    q.Create(q.Collection('users'), { data: { name, email, password } }),
                    q.Get(q.Match(q.Index('user_by_email'), q.Casefold(user.email))),
                ),
            );
            return true
        } catch {
            return false;
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}
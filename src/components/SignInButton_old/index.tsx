

import { FaUserLock } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from 'next-auth/react'

import styles from './styles.module.scss'

interface SignInProps {
    onOpenNewTransactionModal: () => void;
}
export function SignInButtonOld({ onOpenNewTransactionModal }: SignInProps) {

    //Verifica sessão
    const { data: session } = useSession()

    let isLoggedIn = false;
    if (session) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    // so para teste onClick={() => signIn('github', { callbackUrl: 'http://localhost:3000/teste' })}
    return //isLoggedIn ? (
    /*
    <button type="button" className={styles.signInButton} onClick={() => signOut()}>
        <FaUserLock color="#04D361" />
        {session.user.name}
        <FiX color="#737380" className={styles.closeIcon} />
    </button>
) : (

    <button type="button" className={styles.signInButton} onClick={onOpenNewTransactionModal}>
        <FaUserLock color="#EBA417" />
        Sign in
    </button>*/
    <h1>Old</h1>
    //)
}
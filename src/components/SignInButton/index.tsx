
import { FaUserLock } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from 'next-auth/react'

import styles from './styles.module.scss'

export function SignInButton() {

    //Verifica sessão
    const { data: session } = useSession()

    let isLoggedIn = false;
    if (session) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    return isLoggedIn ? (

        <button type="button" className={styles.signInButton} onClick={() => signOut()}>
            <FaUserLock color="#04D361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (

        <button type="button" className={styles.signInButton} onClick={() => signIn('github')}>
            <FaUserLock color="#EBA417" />
            Sign in with GitHub
        </button>
    )
}
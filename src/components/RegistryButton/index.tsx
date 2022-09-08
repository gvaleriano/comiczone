
import { FaUserLock } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from 'next-auth/react'

import styles from './styles.module.scss'

interface SignInProps {
    onOpenNewTransactionModal: () => void;
}

export function RegistryButton({ onOpenNewTransactionModal }: SignInProps) {

    //Verifica sessão
    const { data: session } = useSession()

    let isLoggedIn = false;
    if (session) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }

    return isLoggedIn ? (
        // implementar logout para cadastro pelo BD
        <button type="button" className={styles.regButton} onClick={() => signOut()}>
            <FaUserLock color="#04D361" />
            {session.user.name}
            <FiX color="#737380" className={styles.closeIcon} />
        </button>
    ) : (

        <button type="button" className={styles.regButton} onClick={onOpenNewTransactionModal}>
            <FaUserLock color="#EBA417" />
            Register a new user with email
        </button>
    )
}


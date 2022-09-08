import { SignInButton } from '../SignInButton';
import styles from './styles.module.scss';
import Modal from 'react-modal';
import Link from 'next/link';
import { useSession } from 'next-auth/react'
import { useState } from 'react';
import { NewTransactionModal } from '../../components/NewTransactionModal';
import { RegistryButton } from '../RegistryButton';


Modal.setAppElement('#__next');
export function Header() {

    //Função para o modal
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);

    function handleOpenNewTransactionModal() {

        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpen(false);
    }

    //Verifica sessão
    const { data: session } = useSession()

    let isLoggedIn = false;
    if (session) {
        isLoggedIn = true;
    } else {
        isLoggedIn = false;
    }
    return isLoggedIn ? (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo_comic.svg" alt="Comic Zone" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <Link href={`/comics`}>
                        <a>Comics</a>
                    </Link>
                    <a>My tasks</a>
                </nav>

                <SignInButton />
            </div>
        </header>
    ) : (

        <header className={styles.headerContainer}>

            <div className={styles.headerContent}>
                <img src="/images/logo_comic.svg" alt="Comic Zone" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a>Comics</a>
                </nav>

                <SignInButton />
                <RegistryButton onOpenNewTransactionModal={handleOpenNewTransactionModal} />
                <NewTransactionModal
                    isOpen={isNewTransactionModalOpen}
                    onRequestClose={handleCloseNewTransactionModal}
                />
            </div>
        </header>
    )
}
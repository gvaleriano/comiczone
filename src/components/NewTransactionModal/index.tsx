import { FormEvent, useState, useContext } from 'react';
import Modal from 'react-modal';
import styles from './styles.module.scss'
import { useTransactions } from '../../hooks/useTransactions';

import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthContext';


interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}


export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    const { register, handleSubmit } = useForm();
    const { createTransaction } = useTransactions();
    const { signIn } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('bd');

    function handleSignIn(data) {
        signIn(data, null, null);
    }
    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            name,
            email,
            password,
            type,
        })
        setName('');
        setEmail('');
        setPassword('');
        setType('');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button"
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src='/images/logo_comic.svg' alt="Fechar modal">

                </img>
            </button>
            <form className={styles.containerForm} onSubmit={handleCreateNewTransaction}>
                <h2> Cadastrar novo usuario</h2>


                <input
                    {...register('name')}
                    placeholder='Nome completo'
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
                <input
                    {...register('email')}
                    type="email"
                    placeholder='Email'
                    name="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    {...register('password')}
                    type="password"
                    placeholder='Senha'
                    name="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
        </Modal >
    )
}
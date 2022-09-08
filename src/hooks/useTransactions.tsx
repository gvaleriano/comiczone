import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { query as q } from 'faunadb';
import { fauna } from '../services/fauna';
import { api } from '../services/api';
interface Transaction {
    id: number;
    name: string;
    email: string;
    password: string;
    type: string;
    createdAt: string;
}
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    /*
        useEffect(() => {
            api.get('transactions')
                .then(response => setTransactions(response.data.transactions))
        }, []);*/

    async function createTransaction(transactionInput: TransactionInput) {

        const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() });
        const { transaction } = response.data;

        setTransactions([...transactions, transaction]);
    }

    return (
        <TransactionsContext.Provider value={{
            transactions, createTransaction
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribreButton({ priceId }: SubscribeButtonProps) {

    return (
        <button type="button" className={styles.subscribeButton}>
            Subscribe now
        </button>
    )
}
import Head from 'next/head';
import styles from './styles.module.scss'
export function NotAllowed() {
    return (
        <>
            <Head>
                <title>Home | Comic Zone</title>
            </Head>

            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <h1>🚫 Ops,</h1> <span><br /><br />You don't have permisson to access this section.</span>
                    <h1>Error <span>401</span>.</h1>
                </section>
                <img src="/images/not_allowed.png" alt="Super Hero" />
            </main>
        </>
    )
}
//Imports
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribreButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss'
import Image from "next/image";

//Tipagem Home
interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

//Componente Home
export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Comic Zone</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, Welcome</span>
          <h1>Dive into <span>comics adventure</span>.</h1>
          <p>
            Get access to all the content <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribreButton priceId={product.priceId} />
        </section>
        <Image src="/images/hero.svg" alt="Super Hero" />
      </main>
    </>
  )
}

//Função para pagina estatica ser salva no next e não ficar fazendo varias requisições sem necessidade
export const getStaticProps: GetStaticProps = async () => {

  const price = {id: "price_1MoBy5LkdIwHu7ixZhnattbh", "unit_amount": 1000}//await stripe.prices.retrieve('price_1MoBy5LkdIwHu7ixZhnattbh')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

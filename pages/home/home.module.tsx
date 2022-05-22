import type { NextPage } from 'next'
import Head from 'next/head'
import Wallet from '../wallet/wallet.module'
import styles from './home.module.css'
import TransakView from '../buy/transak/transak.module';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Dapp</title>
        <meta name="description" content="Your own descentralized application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/ekiametis91"> My Dapp!</a>
        </h1>

        <Wallet className={styles.description}/>
        <TransakView />
      </main>
    </div>
  )
}

export default Home

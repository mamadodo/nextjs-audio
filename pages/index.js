import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout, { siteTitle } from '../components/layout'
import Link from 'next/link'
import React, { useContext } from 'react'
import { DataContext } from '../components/DataProvider'
// import utilStyles from '../styles/utils.module.css'
// import { getSortedPostsData } from '../lib/posts'

export default function Home() {
  const trackIndex = useContext(DataContext);
  console.log(trackIndex);

  return (
    <div className={styles.container}>
      <Head>
        <title>Audio prototype - Next-js</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <ul>
        <li className={`${styles.topChannel__content__list} ${styles.channelItem}`}>
          <Link href="/radiohistory">
          <a>
          <div className={styles.channelItem__channelLink}>
            <p className={styles.channelItem__channelLink__image}><img src="images/radireki_thumbnail.jpeg" alt="ラジレキ～学び直し！日本史総復習編～" /></p>
            <h2 className={styles.channeltem__channelLink__detail}>
               ラジオ歴史小話
            </h2>
          </div>
          </a>
          </Link>
        </li>
      </ul>
      </main>

    <Layout></Layout>
    </div>
  )
}

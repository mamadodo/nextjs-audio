import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { useState, useEffect, useContext } from 'react'
import episodeImg from "../../public/images/radireki_thumbnail.jpeg";

import { getSortedPostsData } from '../../lib/posts';

import { DataContext } from '../../components/DataProvider';
import { useRouter } from 'next/router';
import Layout from '../../components/layout';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Radiohistory({allPostsData}) {
  // const url = './data.json'
  // // console.log(episodeImg);
  
  // const { episodes, setEpisodes } = useContext(DataContext)

  // // const { apple } = useContext(DataContext);
  // console.log(episodes);

  // useEffect(() => {
  //   fetch(url)
  //     .then(res=> res.json())
  //     .then(res=> setEpisodes(res))
  // }, [])


  
  const router = useRouter()

  return (
    <>
    <div className={`${styles["chl-mvContainer"]} ${styles.row700}`}>
      <div className={`${styles["chl-mvContainer__box"]} ${styles.is_black}`}>
        <div className={`${styles["chl-mvContainer__box__img"]}`}>
          <img src={episodeImg.src} width="360" height="360" alt="ラジレキ 〜ラジオ歴史小話〜 " />
        </div>
        <div className={`${styles["chl-mvContainer__box__desc"]}`}>
          <h1 className={`${styles["chl-mvContainer__box__desc__title"]}`}>ラジレキ 〜ラジオ歴史小話〜 </h1>
        </div>
      </div>
      <div>
        <Link href="/">
          <a>←番組ページに戻る</a>
        </Link>
      </div>
    </div>
    <div>
      <ul className={styles.allContents_list}>
        {allPostsData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href="/radiohistory/[id]" as={`/radiohistory/${id}`} >
              <a>
              <h2 className={styles.content_ttl}>
                {title}
              </h2>
              {date} <br />
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Layout></Layout>

  </>
  )
}

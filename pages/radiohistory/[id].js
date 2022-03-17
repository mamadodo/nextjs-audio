import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import episodeImg from "../../public/images/radireki_thumbnail.jpeg";
import styles from '../../styles/Home.module.css'

import React, { useContext } from 'react';
import { DataContext } from '../../components/DataProvider';

import { PlayList } from '../../components/PlayList';


export default function Post({ postData, children, href }) {
  // const { test } = useContext(DataContext)
  const { tracks, setTracks, isPlay, setIsPlay, trackIndex, setTrackIndex } = useContext(DataContext);
  // console.log(isPlay)

  const currentEpisode = [postData]
  // console.log(currentEpisode)



  const isDuplicate = () => {
    if(tracks.some(el => el.title === currentEpisode[0].title)){
      console.log("true");
      return true;
    } else {
      console.log("false");
      return false;
    }
  }

  const onClickPlay = () => {
  
    if(isPlay) { // 再生中にクリック
      if(tracks[trackIndex].src !== currentEpisode[0].src) {
        const changeTrack = async () => {
          await new Promise((resolve) => {
            setIsPlay(false); //pause
            setTimeout(() => {
              resolve();
            }, 300);
          });
          const stopTrack = tracks[trackIndex];
          stopTrack.playing = false;
          console.log(stopTrack);
          console.log(trackIndex);

          // 重複チェック
          if(isDuplicate()) {
            audioPlay();
          } else {
            audioPlayAdd();
          }
        }
        changeTrack();
      }
      currentEpisode.playing = true;

    } else { //停止時にクリック
      // 重複チェック
      if(isDuplicate()) {
        audioPlay();
        currentEpisode.playing = true;
        console.log("tracks " + tracks);

      } else {
        audioPlayAdd();
        currentEpisode.playing = true;
      }
    }
  };

  const audioPlay = () => {
    const targetIndex = tracks.findIndex((v) => v.title === currentEpisode[0].title);
    const currentTrack = tracks[targetIndex];
    setTrackIndex(targetIndex);
    currentTrack.playing = true;
    setIsPlay(true);
  }

  const audioPlayAdd = () => { //再生＋プレイリスト追加
    const playTracks = [...currentEpisode, ...tracks];
    setTracks(playTracks);
    setTrackIndex(0);
    const currentTrack = playTracks[0];
    currentTrack.playing = true;
    setIsPlay(true);
  }


  const onClickAdd = () => {
    // 重複チェック
    if(!isDuplicate()) {
      // console.log("重複なし");
      const newTracks = [...tracks, ...currentEpisode];
      setTracks(newTracks);
    }
  }

  let currentPlayFlg = false;
  if(isPlay) {
    currentPlayFlg = tracks[trackIndex].title === StaticRange.title;
  }

  return (
    <>
    <Head>
      <title>Episode: {postData.id}</title>
      </Head>
      <div id={styles.container} className={`${styles["chl-mvContainer"]} ${styles.row700}`}>
        <div className={`${styles["chl-mvContainer__box"]} ${styles.is_black}`}>
          <div className={`${styles["chl-mvContainer__box__img"]}`}>
            <img src={episodeImg.src} width="360" height="360" alt="ラジレキ 〜ラジオ歴史小話〜 " />
          </div>
          <div className={`${styles["chl-mvContainer__box__desc"]}`}>
            <h1 className={`${styles["chl-mvContainer__box__desc__title"]} ${styles["episode-title"]}`}>
              {postData.id} <br />
              {postData.title}
            </h1>
          <div className={`${styles["content-listItem"]} ${styles.addBtn}`} onClick={onClickAdd} >
            {/* <span className="material-icons ico-listen">play_circle_outline</span> */}
            <span className={`${styles["play-text"]} ${styles.listen}`}>プレイリストに追加</span>
          </div>
            {currentPlayFlg === false ?
          <div className={`${styles["content-listItem"]} ${styles.addBtn}`} onClick={onClickPlay} >
            <span className={`${styles["play-text"]} ${styles.listen}`}>再生</span>
            </div> :
          <div className={`${styles["content-listItem"]} ${styles.addBtn}`}  disabled onClick={onClickPlay} >

            <span className={`${styles["play-text"]} ${styles.listen}`}>再生</span></div>
            }
          </div>
        </div>
        <Link href="/radiohistory">
          <div className={`${styles["toProgram-btn"]}`}>
            すべてのエピソード
          </div>
        </Link>
      </div>

      <Layout></Layout>

    </>



  )
}

export async function getStaticProps({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}



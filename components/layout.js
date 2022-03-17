import Head from 'next/head'
import Image from 'next/image'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from './DataProvider';
import { PlayList } from './PlayList'
import { AudioPlayer } from './AudioPlayer'
import styles from '../styles/Home.module.css'

const name = '[Your Name]'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  const { tracks, setTracks, isPlay, setIsPlay, trackIndex, setTrackIndex } = useContext(DataContext);
  return (
    <>
    <section className={`${styles["playlist-sec"]}`}>
    <h2>プレイリスト</h2>
    {tracks.length > 0 ?
    <PlayList 
      tracks={tracks}
      setTracks={setTracks}
    />
    : <p>プレイリストはまだありません。</p>
    }
    </section>
    {tracks.length > 0 &&
      <AudioPlayer
        tracks={tracks}
        
       />
    }
    </>
  )
}

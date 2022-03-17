import React, { useContext } from "react";
import { DataContext } from './DataProvider'
import styles from '../styles/Home.module.css'


export const PlayList = (props) => {
  // const { tracks, setTracks } = props;
  // console.log(tracks[0].playing)
  const { tracks, setTracks, trackIndex, setTrackIndex, isPlay, setIsPlay } = useContext(DataContext);
  console.log(tracks);

  // delete playlist
  const onClickDeleteEpisode = (e) => {
    console.log("e.currentTarget.id", e.currentTarget.id);
    const newtracks = [...tracks];
    newtracks.splice(e.currentTarget.id, 1);
    setTracks(newtracks);
  }

  // pause audio
  const pauseAudio = () => {
    const prevTrack = tracks[trackIndex];
    prevTrack.playing = false;
  }

  // play audio
  const playAudio = (target) => {
    const currentTrack = tracks[target];
    currentTrack.playing = true;
    setTrackIndex(target);
    setIsPlay(true);  
  }
  
  const onClickTrack = (e) => {
    // console.log("trackボタンクリック");
    const newIndex = e.currentTarget.id;
    // ↑ここでNumberつける

    if (isPlay) {
      if (Number(newIndex) !== Number(trackIndex)) { // 別のトラックをクリック
        // 再生中のトラックを停止
        // console.log("通過：別トラック")
        const changeTrack = async () => {
          await new Promise((resolve) => {
            setIsPlay(false); //pause
            setTimeout(() => {
              resolve();
            }, 300);
            pauseAudio();
          });
          // クリックしたトラックを再生
          playAudio(newIndex);
          console.log('次のトラック: ' + newIndex);
        }
        changeTrack();
      } else {
        // console.log("通過：同一トラック")

        // 再生中のトラックを停止
        setIsPlay(false); //pause
        pauseAudio();
      }
    } else {
      playAudio(e.currentTarget.id);
    }
  };

  return (
    <>
    <ul className={`$styles.playlists`}>
    {tracks.map((track, index) => (

      <li className={`${styles["playlists-item"]}`} key={index}>
              <h2 className={`${styles["content-ttl"]}`}>
                {track.title}
              </h2>
        <div className={`${styles["content-inner2"]} ${styles["content-info"]}`}>
          <span className="date">{track.date}</span>
          {/* <span> / </span>
          <span className="time">{musicTime(track.duration)}</span> */}
        </div>
        <div className={`${styles["content-listItem"]} ${styles["playBtn"]}`} onClick={onClickTrack} id={index}>
          {track.playing === false ? 
              (<span className={`${styles["material-icons"]} ${styles ["ico-listen"]}`}>play_circle_outline</span>) :
              (<span>再生中</span>)
          }
        </div>
        {isPlay === true ? 
          <button className={`${styles["content-listItem"]} ${styles["playBtn"]}`} disabled onClick={onClickDeleteEpisode} id={index}>
            <span className={`${styles["material-icons"]} ${styles["ico-listen"]}`}>delete</span>
            <span className={`${styles["play-text"]} ${styles["listen"]}`}>削除</span>
        </button> :
        <button className={`${styles["playBtn"]}`} onClick={onClickDeleteEpisode} id={index}>
            <span className={`${styles["material-icons"]} ${styles["ico-listen"]}`} >delete</span>
            <span className={`${styles["play-text"]} ${styles["listen"]}`}>削除</span>
        </button>
        }
      </li>
      ))}
    </ul>
    </>
  );
}


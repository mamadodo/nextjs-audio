import Head from 'next/head'
import React, { useEffect, useRef, useState, useContext  } from "react";
import { DataContext } from './DataProvider'
import styles from '../styles/Home.module.css'
import episodeImg from "../public/images/radireki_thumbnail.jpeg";


export const AudioPlayer = () => {
  // const { tracks } = props;
  const { tracks } = useContext(DataContext);

  
  // const intervalRef = useRef(null);
  
  // tracks
  // const [trackIndex, setTrackIndex] = useState(0);
  const { intervalRef, trackIndex, setTrackIndex, isPlay, setIsPlay } = useContext(DataContext);
  useEffect(() => {
    setTrackIndex(0);
  }, []);
    
  const { title, date, duration,  epiNum } = tracks[trackIndex];
  // const thumbnail = episodeImg
  
  const trackSrc = tracks[trackIndex].src;

  const musicRef = useRef(new Audio(trackSrc));

  const musicCurrentTime = musicRef.current.currentTime;
  const musicRate = (Math.floor(musicCurrentTime / tracks[trackIndex].duration * 100));
 
  const [timePosition, setTimePosition] = useState(0); // time position

  const speed = [1.0, 1.3, 1.5, 2.0, 0.5, 0.7];
  const [speedIndex, setSpeedIndex] = useState(0);
  const [speedNextIndex, setSpeedNextIndex] = useState(1);
  
  const musicTime = (time) => {
    let hour = (Math.floor(time / 60 / 60)).toString().padStart( 2, '0');
    let minutes = (Math.floor((time / 60) % 60)).toString().padStart( 2, '0');
    let sec = (Math.floor(time % 60)).toString().padStart( 2, '0');
    let convertTime;
    convertTime = hour + ':' + minutes + ':' + sec;
    return convertTime;
  }

  const start = () => {
    if (intervalRef.current !== null) {
      return;
    }
    
    intervalRef.current = setInterval(() => {
      if (musicRef.current.ended) {
        console.log('nextTrack実行 ');
        nextTrack();
      } else {
      setTimePosition(musicRef.current.currentTime);
      // console.log(' 再生トラック/経過時間 ');
      // console.log('trackIndex ' + trackIndex + ' / ' + musicRef.current.currentTime);
      }
    }, [1000]);
  };


  useEffect(() => {
    musicRef.current = new Audio(trackSrc);
  }, [trackSrc]);

  useEffect(() => {
    if(isPlay) {
      musicRef.current.play();
      start();
      console.log('track' + trackIndex + ' start ');
    } else {
      musicRef.current.pause();
      console.log('track' + trackIndex + ' pause ');
      if (intervalRef.current === null) {
        return;
      }
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isPlay]);

  const timeBar = useRef(null);
  let timeBarWidth;
  let timeBarX;

  // play button
  const onClickTogglePlay = () => {
    if (isPlay) {
      setIsPlay(!isPlay);
      const playingTrack = tracks[trackIndex];
      playingTrack.playing = false;
      // console.log('isPlay change ' + isPlay);
    } else {
      setIsPlay(!isPlay);
      const playingTrack = tracks[trackIndex];
      playingTrack.playing = true;

      // console.log('!isPlay change ' + isPlay);
    }
  }

  // prev 15s
  const onClickBack = () => {
    console.log("15s playback");
    musicRef.current.currentTime -= 15;
  }
  
  // next 30s
  const onClickSkip = () => {
    console.log("30s playskip");
    musicRef.current.currentTime += 30;
  }


  // timebar click
  const onClickTime = (e) => {
    timeBarWidth = e.target.getBoundingClientRect().width;
    timeBarX = e.nativeEvent.offsetX;
    console.log('timeBarクリック: ' + timeBarX / timeBarWidth * tracks[trackIndex].duration + '');
    // console.log(e.target.getBoundingClientRect().width);
    // console.log(e.nativeEvent.offsetX);
    musicRef.current.currentTime = (timeBarX / timeBarWidth * tracks[trackIndex].duration);
  }

  // speed change
  const onClickChangeSpeed = () => {
    if (speedIndex === speed.length - 1) {
      setSpeedIndex(0);
      setSpeedNextIndex(speedNextIndex + 1);
    } else {
      setSpeedIndex(speedIndex + 1);
      if (speedNextIndex === speed.length - 1) {
        setSpeedNextIndex(0);
      } else {
        setSpeedNextIndex(speedNextIndex + 1);
      }
    }
    musicRef.current.playbackRate = speed[speedNextIndex];
    console.log(speedIndex);
    console.log(speedNextIndex + 'next');
  }

// next Track
  const nextTrack = () => {
    if(isPlay) { // 次のトラック
      setIsPlay(false);
      const playingTrack = tracks[trackIndex];
      playingTrack.playing = false;
      if (trackIndex < tracks.length - 1) {
        setTrackIndex((currentIndex) => Number(currentIndex) + 1);
        const nextTrack = tracks[trackIndex + 1];
        nextTrack.playing = true;
      } else { // 最初のトラックに戻る
        setTrackIndex(0);
        const nextTrack = tracks[0];
        nextTrack.playing = true;
      }
      setIsPlay(true);
    }
  };

  return (
    <>
    <Head>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    </Head>
    <div id={styles.app} className={styles.app}>
    <div id={styles.audio_thumb} onClick={onClickTogglePlay}>
      <img className="ep_img" src={episodeImg.src} width="160" height="160" alt={epiNum} />

      {isPlay? 
        (
          <i id={styles.pause_ico} className={`${styles["material-icons"]}`}>pause_circle_outline</i>
        ) : (
          <i id={styles.play_ico} className={`${styles["material-icons"]}`}>play_circle_outline</i>
        )
      }

    </div>
    <div id={styles.audio_desc}>
      <div className={`${styles["ep-date"]}`}>{date}</div>
      <div className={`${styles["ep-title"]}`}>
        {title}<span className={`${styles["sp-nodisp"]}`}></span>
      </div>
      <div id={styles.timebar}>
        <div id={`${styles["timebar-bg"]}`} onClick={onClickTime} ref={timeBar}>
          <div id={`${styles["timebar-past"]}`} style={{width: musicRate + '%'}}>
            <div id={`${styles["timebar-num"]}`}>{musicRate + '%'}</div>
          </div>
        </div>
      </div>
      <div>
        <span id={styles.time_disp}>
        {musicTime(timePosition)}/
        {musicTime(duration)}
        </span>
        <p className={styles.time_control_area}>
          <span>
            <img 
              id={styles.playback} 
              src="https://propo.fm/image/rewind.png" 
              width="23" 
              alt="rewind" 
              onClick={onClickBack}
            />
          </span>
          <span>
            <img 
              id={styles.skip} 
              src="https://propo.fm/image/skip.png" 
              width="23" 
              alt="skip"
              onClick={onClickSkip}
            />
          </span>
          <span id={styles.speed_ctrl} onClick={onClickChangeSpeed}>{speed[speedIndex].toFixed(1)}x</span>
        </p>
      </div>
    </div>
    </div>


  </>

  );
}

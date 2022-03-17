import React, { createContext, useState, useRef } from "react";

export const DataContext = createContext({});

export const DataProvider = (props) => {
  const { children } = props;

  const intervalRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [tracks, setTracks] = useState([]);
  const [isPlay, setIsPlay] = useState(false); // playing state
  const test = 'abc';
  const [episodes, setEpisodes] = useState([])

  return (
    <DataContext.Provider
      value={{ 
        intervalRef,
        trackIndex, 
        setTrackIndex,
        tracks,
        setTracks,
        isPlay,
        setIsPlay,
        episodes,
        setEpisodes,
        test
      }}>
      {children}
    </DataContext.Provider>
  );
};

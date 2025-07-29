
import { useEffect, useRef } from "react";
import { musicList } from '../../models/music'; 
import styles from './Reproductor.module.css';
import { useState } from "react";

//Uso de Context
import { useContext } from "react";
import { ReproductorContext } from "../../context/reproductorContext";



type Audio = typeof musicList[0];

export default function Reproductor({audio}: {audio: Audio}) {

        const reproductorContext = useContext(ReproductorContext);
        if (!reproductorContext) {
            throw new Error("ReproductorContext no está definido");
        }
        const { tiempoActual, setTiempoActual} = reproductorContext;

        const [isPlaying, setIsPlaying] = useState(false)
        const [duration, setDuration] = useState(0);
        const [volume, setVolume] = useState(1);
        const audioRef = useRef<HTMLAudioElement>(null);



        useEffect(() => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
            }
        }, [volume]);
    
        useEffect(() => {
            if (audio && audioRef.current) {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }, [audio, setIsPlaying]);
    


        const handlePlayPause = () => {
            if (!audioRef.current) return;
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        };

    
        const handleLoadedMetadata = () => {
            if (audioRef.current) {
                setDuration(audioRef.current.duration);
            }
        };
    
        const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (audioRef.current) {
                audioRef.current.currentTime = Number(e.target.value);
                setTiempoActual(Number(e.target.value));
            }
        };
    
        const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setVolume(Number(e.target.value));
        };


        
            const updateTime = () => {
                if (audioRef.current) {
                setTiempoActual(audioRef.current.currentTime);
                }
                requestAnimationFrame(updateTime);
            };
            requestAnimationFrame(updateTime);
    
    
        const handleAudioEnded = () => {
            setIsPlaying(false);
            setTiempoActual(15);
        };
    
        const formatTime = (time: number) => {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        };
        return (
            
            <div className={styles.audioPlayerBar}>
                    <img
                        src={audio?.imagen}
                        alt={audio?.nombre}
                        className={styles.audioImgPlayer}
                    />
                    <div className={styles.audioPlayerInfo}>
                        <div className={styles.audioName}>{audio?.nombre}</div>
                        <div className={styles.audioArtist}>{audio?.artista}</div>
                    </div>
                    <button className={styles.playButton} onClick={handlePlayPause}>
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 5.25v13.5m10.5-13.5v13.5" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" width="24" height="24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.25 19.5 12 5.25 18.75V5.25z" />
                            </svg>
                        )}
                    </button>
                    <span className={styles.time}>{formatTime(tiempoActual)}</span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={tiempoActual}
                        onChange={handleSeek}
                        className={styles.progressBar}
                    />
                    <span className={styles.time}>{formatTime(duration)}</span>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={handleVolumeChange}
                        className={styles.volumeBar}
                    />
                    <audio
                        ref={audioRef}
                        src={audio?.src}
                        onLoadedMetadata={handleLoadedMetadata}
                        onEnded={handleAudioEnded}
                        style={{ display: 'none' }}
                    />
                </div>
        );
}
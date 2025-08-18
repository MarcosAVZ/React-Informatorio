// Librerías y hooks
import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

// Modelos
import type { Music } from "../models/music.tsx";

// Servicios
import { musicService } from "../data/service.ts";


interface ReproductorProviderProps {
    children: ReactNode;
}

interface ReproductorContextType {
    tiempoActual: number;
    setTiempoActual: (value: number) => void;
    audioActual: Music | null;
    setAudioActual: (value: Music | null) => void;
    showReproductor: boolean;
    setShowReproductor: (value: boolean) => void;
    song: Music | undefined;
    isLoading: boolean;
}

const loadSong = async (): Promise<Music | undefined> => {
    try {
        const data = await musicService.getAllSongs();
        return data[0];
    } catch (error) {
        console.error(error);
    }
};

const ReproductorContext = createContext<ReproductorContextType | null>(null);

const ReproductorProvider = ({ children }: ReproductorProviderProps) => {
    const [tiempoActual, setTiempoActual] = useState<number>(0);
    const [audioActual, setAudioActual] = useState<Music | null>(null);
    const [showReproductor, setShowReproductor] = useState<boolean>(false);

    const { data: song, isLoading } = useQuery<Music | undefined>({
        queryKey: ['song'],
        queryFn: loadSong,
    });

    return (
        <ReproductorContext.Provider value={{
            tiempoActual,
            setTiempoActual,
            audioActual,
            setAudioActual,
            showReproductor,
            setShowReproductor,
            song,
            isLoading,
        }}>
        {children}
        </ReproductorContext.Provider>
    );
};

export { ReproductorContext, ReproductorProvider };
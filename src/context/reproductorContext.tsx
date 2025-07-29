import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { musicList } from '../models/music';

const audio = musicList[0];

//La interfaz ReproductorProviderProps define el tipo de children como ReactNode, que es el tipo correcto para los elementos hijos de un componente.
interface ReproductorProviderProps {
    children: ReactNode;
}

interface ReproductorContextType {
    tiempoActual: number;
    setTiempoActual: (value: number) => void;
    audioActual: typeof audio | null;
    setAudioActual: (value: typeof audio) => void;
    showReproductor: boolean;
    setShowReproductor: (value: boolean) => void;
}


const ReproductorContext = createContext<ReproductorContextType | null>(null);

const ReproductorProvider = ({ children } : ReproductorProviderProps) => {
    const [tiempoActual, setTiempoActual] = useState(0);
    const [audioActual, setAudioActual] = useState<typeof musicList[0] | null>(null);
    const [showReproductor, setShowReproductor] = useState(false);

    return (
    <ReproductorContext.Provider value={{
        tiempoActual,
        setTiempoActual,
        audioActual,
        setAudioActual,
        showReproductor,
        setShowReproductor
    }}>
        {children}
    </ReproductorContext.Provider>
    );
};

export { ReproductorContext, ReproductorProvider };
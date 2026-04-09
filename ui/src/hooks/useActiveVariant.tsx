import React, {useContext, useMemo, useState} from 'react';
import {isEmpty} from "../utils/helpers.tsx";
import {ActiveVariantContext} from "../context/ActiveVariantContext.tsx";
import {useAudioPlayer} from "./useAudioContext.tsx";

interface Properties {
    children: React.ReactNode;
}

export const ActiveVariantContextProvider: React.FC<Properties> = ({children}) => {

    const {setIsPlaying} = useAudioPlayer();
    const [index, setIndex] = useState<number>(0);

    const handleIndexChange = (newIndex: number) => {
        setIndex(newIndex);
        setIsPlaying(false);
    }

    const context = useMemo(() => ({
        index, setIndex: handleIndexChange,
    }), [index]);

    return (
        <ActiveVariantContext.Provider value={context}>
            {children}
        </ActiveVariantContext.Provider>
    )
}

export const useActiveVariant = () => {
    const context = useContext(ActiveVariantContext);
    if (isEmpty(context)) {
        throw new Error('useActiveVariant must be used within a ActiveVariantContextProvider')
    }

    return context;
};

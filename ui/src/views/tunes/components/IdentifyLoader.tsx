import React from "react";
import {useTranslation} from "react-i18next";
import {useSimilarTunes} from "../../../hooks/useSimilarTunes.tsx";
import Loading from "../../../components/Loading.tsx";
import {LoadingState} from "../../../model/LoadingState.ts";

interface Properties {
    externalLoadingState?: LoadingState;
}

const IdentifyLoader: React.FC<Properties> = ({externalLoadingState}) => {

    const {t} = useTranslation();
    const {loadingState} = useSimilarTunes();

    return (
        <Loading
            isLoading={!!externalLoadingState || loadingState !== LoadingState.IDLE }
            text={t(`view.identify.${externalLoadingState || loadingState}`)}
        />
    );
}

export default IdentifyLoader;

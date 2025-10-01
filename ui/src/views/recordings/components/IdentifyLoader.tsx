import React from "react";
import {useTranslation} from "react-i18next";
import {useSimilarRecordings} from "../../../hooks/useSimilarRecordings.tsx";
import Loading from "../../../components/Loading.tsx";
import {LoadingState} from "../../../model/LoadingState.ts";

const IdentifyLoader: React.FC = () => {

    const {t} = useTranslation();
    const {loadingState} = useSimilarRecordings();

    return (
        <Loading
            isLoading={loadingState !== LoadingState.IDLE}
            text={t(`view.identify.${loadingState}`)}
        />
    );
}

export default IdentifyLoader;

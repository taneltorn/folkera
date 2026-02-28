import React, {useEffect} from "react";
import {Box} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import SimilarTunesTable from "./table/components/SimilarTunesTable.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import IdentifyLoader from "./components/IdentifyLoader.tsx";
import InfoMessage from "../../components/InfoMessage.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    tune: Tune;
}

const SIMILAR_TUNES_TO_FETCH = 50;

const TuneDetails: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {similarTunes, findSimilarTunes} = useSimilarTunes();

    useEffect(() => {
        if (!similarTunes.length && tune.audio) {
            findSimilarTunes(tune?.audio, SIMILAR_TUNES_TO_FETCH, tune.id, "folkera", false);
        }
    }, []);

    return (
        <Box pos={"relative"} mih={100}>
            {!tune.audio && <InfoMessage mx={"md"} color={"blue"} title={t("page.tunes.details.audioNotYetAdded")}/>}

            <SimilarTunesTable/>
            <IdentifyLoader/>
        </Box>
    );
}

export default TuneDetails;

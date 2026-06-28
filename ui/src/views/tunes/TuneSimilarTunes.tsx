import React, {useEffect} from "react";
import {Box} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import SimilarTunesTable from "./table/components/SimilarTunesTable.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import IdentifyLoader from "./components/IdentifyLoader.tsx";
import InfoMessage from "../../components/InfoMessage.tsx";
import {useTranslation} from "react-i18next";
import {SIMILAR_TUNES_TO_FETCH} from "../../utils/constants.ts";

interface Properties {
    tune: Tune;
}

const TuneDetails: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {similarTunes, isBusy, loadSimilarTunes} = useSimilarTunes();


    const loadData = () => {
        if (!tune.audio) {
            return;
        }
        loadSimilarTunes({
                filePath: tune.audio,
                top: SIMILAR_TUNES_TO_FETCH,
                selfRef: tune.id,
                dataset: "folkera",
            },
            tune);
    }
    useEffect(() => {
        if (tune.distances) {
            loadData();
        }
    }, []);

    return (
        <Box pos={"relative"} mih={100}>
            {!tune.audio && <InfoMessage mx={"md"} color={"blue"} title={t("page.tunes.details.audioNotYetAdded")}/>}

            <SimilarTunesTable onSave={loadData}/>

            {tune.audio && !isBusy && !similarTunes.length &&
                <InfoMessage mx={"md"} color={"blue"} title={t("page.tunes.details.noAnalysis")}/>}
            <IdentifyLoader/>
        </Box>
    );
}

export default TuneDetails;

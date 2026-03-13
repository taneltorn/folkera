import React, {useEffect} from "react";
import {Box, Center} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import SimilarTunesTable from "./table/components/SimilarTunesTable.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import IdentifyLoader from "./components/IdentifyLoader.tsx";
import InfoMessage from "../../components/InfoMessage.tsx";
import {useTranslation} from "react-i18next";
import {SIMILAR_TUNES_TO_FETCH} from "../../utils/constants.ts";
import LoadSimilarTunesButton from "./components/controls/LoadSimilarTunesButton.tsx";

interface Properties {
    tune: Tune;
}

const TuneDetails: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {similarTunes, loadSimilarTunes} = useSimilarTunes();

    useEffect(() => {
        if (tune.distances && tune.audio) {
            loadSimilarTunes({
                    filePath: tune.audio,
                    top: SIMILAR_TUNES_TO_FETCH,
                    selfRef: tune.id,
                    dataset: "folkera",
                },
                tune.distances);
        }
    }, []);

    return (
        <Box pos={"relative"} mih={100}>
            {!tune.audio && <InfoMessage mx={"md"} color={"blue"} title={t("page.tunes.details.audioNotYetAdded")}/>}

            <SimilarTunesTable/>

            {!tune.distances && !similarTunes.length &&
                <Center>
                    <LoadSimilarTunesButton tune={tune}/>
                </Center>}

            <IdentifyLoader/>
        </Box>
    );
}

export default TuneDetails;

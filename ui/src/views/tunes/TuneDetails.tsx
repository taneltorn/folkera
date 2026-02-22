import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Box} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import {useTuneService} from "../../services/useTuneService.ts";
import {ToastType} from "../../context/ToastContext.tsx";
import {useToasts} from "../../hooks/useToasts.tsx";
import SimilarTunesTable from "./table/components/SimilarTunesTable.tsx";
import TuneInfoTable from "./details/components/TuneInfoTable.tsx";
import TuneHeader from "./TuneHeader.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import {useModifications} from "../../hooks/useModifications.tsx";
import {useTuneSelection} from "../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../hooks/useControlState.tsx";
import {ControlState} from "../../model/ControlState.ts";
import IdentifyLoader from "./components/IdentifyLoader.tsx";
import MusicXmlViewer from "./details/components/MusicXmlViewer.tsx";
import ShowArchiveDocumentsButton from "./components/controls/ShowArchiveDocumentsButton.tsx";

const TuneDetails: React.FC = () => {

    const {t} = useTranslation();
    const {id} = useParams();
    const {notify} = useToasts();
    const dataService = useTuneService();
    const {setSimilarTunes} = useSimilarTunes();
    const {clearSelection} = useTuneSelection();
    const {clearModifications} = useModifications();
    const {setState} = useControlState();

    const [tune, setTune] = useState<Tune>();

    const fetchData = (id: string | undefined) => {
        if (!id) {
            return;
        }
        dataService.fetchTune(id)
            .then(data => {
                setTune(data);
            })
            .catch(error => {
                notify(t("toast.error.fetchData"), ToastType.ERROR, error);
            });
    }

    useEffect(() => {
        clearModifications();
        clearSelection();
        setSimilarTunes([]);
        setState(ControlState.IDLE);

        fetchData(id);

        return () => dataService.cancelSource.cancel();
    }, [id]);

    return (
        <Page title={t("page.title.tunes")}>

            {tune && <>
                <Box px={"md"} mb={"md"}>
                    <TuneHeader
                        tune={tune}
                        reloadData={() => fetchData(id)}
                    />
                    {tune.datatype === "NOOT" && <MusicXmlViewer tune={tune}/>}

                    {tune.notation &&
                        <ShowArchiveDocumentsButton tune={tune}>
                            {t("button.showArchiveItems")}
                        </ShowArchiveDocumentsButton>}


                    <TuneInfoTable tune={tune}/>
                </Box>

                <SimilarTunesTable/>
                <IdentifyLoader/>
            </>}
        </Page>
    );
}

export default TuneDetails;

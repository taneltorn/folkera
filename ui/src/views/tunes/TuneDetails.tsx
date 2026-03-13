import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Box, Divider, LoadingOverlay} from "@mantine/core";
import {Tune} from "../../model/Tune.ts";
import {useTuneService} from "../../services/useTuneService.ts";
import {ToastType} from "../../context/ToastContext.tsx";
import {useToasts} from "../../hooks/useToasts.tsx";
import TuneHeader from "./details/components/TuneHeader.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import {useModifications} from "../../hooks/useModifications.tsx";
import {useTuneSelection} from "../../hooks/useTuneSelection.tsx";
import {useControlState} from "../../hooks/useControlState.tsx";
import {ControlState} from "../../model/ControlState.ts";
import TuneDetailsControls from "./details/components/TuneDetailsControls.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import TuneDetailsInfo from "./details/components/TuneDetailsInfo.tsx";
import ClusterPlotView from "../admin/cluster/ClusterPlotView.tsx";
import TuneSimilarTunes from "./TuneSimilarTunes.tsx";
import InfoMessage from "../../components/InfoMessage.tsx";

const TuneDetails: React.FC = () => {

    const {t} = useTranslation();
    const {id} = useParams();
    const {notify} = useToasts();
    const dataService = useTuneService();
    const {setSimilarTunes} = useSimilarTunes();
    const {clearSelection} = useTuneSelection();
    const {clearModifications} = useModifications();
    const {setState} = useControlState();
    const {activeView, setActiveView} = useActiveView();
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
        setActiveView(View.DETAILS);

        fetchData(id);

        return () => dataService.cancelSource.cancel();
    }, [id]);

    return (
        <Page title={t("page.navigation.tunes")}>
            {tune &&
                <>
                    <LoadingOverlay visible={dataService.isLoading}/>

                    <Box px={"md"}>
                        <TuneHeader tune={tune}/>
                        <TuneDetailsControls tune={tune} reloadData={() => fetchData(id)}/>
                    </Box>

                    <Divider mt={"xs"} mb={"md"}/>

                {activeView === View.DETAILS && <TuneDetailsInfo tune={tune}/>}
                {activeView === View.SIMILAR_TUNES && <TuneSimilarTunes tune={tune}/>}

                    {activeView === View.CLUSTER && <>
                        {tune.audio
                            ? <ClusterPlotView needle={tune.ref}/>
                            : <InfoMessage mx={"md"} color={"blue"}
                                           title={t("page.tunes.details.audioNotYetAdded")}/>}
                    </>}
                </>}
        </Page>
    );
}

export default TuneDetails;

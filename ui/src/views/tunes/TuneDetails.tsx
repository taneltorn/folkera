import React, {useEffect, useState} from "react";
import Page from "../../Page.tsx";
import {Trans, useTranslation} from "react-i18next";
import {useParams} from "react-router";
import {Alert, Box, Divider, Group, LoadingOverlay, Stack, Text} from "@mantine/core";
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
import {IoMdAlert} from "react-icons/io";
import {Size} from "../../utils/constants.ts";
import {Link} from "react-router-dom";
import {PiCaretLeft} from "react-icons/pi";

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
    const [notFound, setNotFound] = useState(false);

    const fetchData = (id: string | undefined) => {
        if (!id) {
            return;
        }

        setNotFound(false);
        setTune(undefined);

        dataService.fetchTune(id)
            .then(data => {
                setTune(data);
            })
            .catch(error => {
                if (error?.response?.status === 404) {
                    setNotFound(true);
                    return;
                }
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
        <Page title={id}>
            {notFound && <Stack mx={"md"}>
                <Alert color={"blue"} icon={<IoMdAlert size={Size.icon.MD}/>}>
                    <Text size={"md"}><Trans i18nKey={"page.tunes.details.tuneNotFound"} values={{ref: id}}/></Text>
                </Alert>

                <Link to={"/tunes?view=table"}>
                    <Group wrap={"nowrap"} gap={"xs"}>
                        <PiCaretLeft size={Size.icon.MD}/>
                        <Text fw={"bold"}>{t("page.tunes.details.allTunes")}</Text>
                    </Group>
                </Link>
            </Stack>}

            {tune &&
                <>
                    <Box px={"md"}>
                        <TuneHeader tune={tune}/>
                        <TuneDetailsControls tune={tune} reloadData={() => fetchData(id)}/>
                    </Box>

                    <Divider my={"md"} color={"gray.1"}/>

                    {activeView === View.DETAILS && <TuneDetailsInfo tune={tune}/>}
                    {activeView === View.SIMILAR_TUNES && <TuneSimilarTunes tune={tune}/>}

                    {activeView === View.CLUSTER && <>
                        {tune.audio
                            ? <ClusterPlotView needle={tune.ref}/>
                            : <InfoMessage mx={"md"} color={"blue"}
                                           title={t("page.tunes.details.audioNotYetAdded")}/>}
                    </>}
                </>}

            <LoadingOverlay visible={dataService.isLoading}/>
        </Page>
    );
}

export default TuneDetails;

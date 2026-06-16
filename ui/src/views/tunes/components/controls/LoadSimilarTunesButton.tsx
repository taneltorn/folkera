import React from "react";
import {Button, ButtonProps, Text} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {useSimilarTunes} from "../../../../hooks/useSimilarTunes.tsx";
import {SIMILAR_TUNES_TO_FETCH, Size} from "../../../../utils/constants.ts";
import {TbZoomQuestion} from "react-icons/tb";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {useActiveView} from "../../../../hooks/useActiveView.tsx";
import {View} from "../../../../context/ActiveViewContext.tsx";
import {modals} from "@mantine/modals";
import ModalTitle from "./ModalTitle.tsx";

interface Properties extends ButtonProps {
    tune: Tune;
}

const LoadSimilarTunesButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {setActiveView} = useActiveView()
    const {loadSimilarTunes, isBusy} = useSimilarTunes();

    const handleSubmit = (distances?: string) => {
        if (tune.audio && !isBusy) {

            tune.distances = distances;
            loadSimilarTunes({
                    filePath: tune.audio,
                    top: SIMILAR_TUNES_TO_FETCH,
                    selfRef: tune.id,
                    dataset: "folkera",
                },
                distances);

            setActiveView(View.SIMILAR_TUNES);
            modals.closeAll();
        }
    }

    const openModal = () =>
        modals.openConfirmModal({
            title: <ModalTitle title={t("modal.reAnalyse.title")}/>,
            centered: true,
            children: (
                <Text size={"sm"}>
                    {t("modal.reAnalyse.content")}
                </Text>
            ),
            groupProps: {gap: 4},
            cancelProps: {radius: "xl", variant: "subtle", color: "gray"},
            confirmProps: {radius: "xl"},
            labels: {
                confirm: t("modal.reAnalyse.confirm"),
                cancel: t("modal.reAnalyse.cancel")
            },
            onCancel: () => modals.closeAll,
            onConfirm: () => handleSubmit(),
        });

    return (
        <Button
            radius={"xl"}
            size={"sm"}
            color={"gray"}
            disabled={isBusy || !currentUser?.isResearcher || !tune.audio}
            variant={"subtle"}
            leftSection={<TbZoomQuestion size={Size.icon.SM}/>}
            onClick={tune.distances ? openModal : () => handleSubmit(tune.distances)}
        >
            {t("button.loadSimilarTunes")}
        </Button>
    );
}

export default LoadSimilarTunesButton;

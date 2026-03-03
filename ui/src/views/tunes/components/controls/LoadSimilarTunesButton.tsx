import React from "react";
import {Button, ButtonProps} from '@mantine/core';
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {useSimilarTunes} from "../../../../hooks/useSimilarTunes.tsx";
import {SIMILAR_TUNES_TO_FETCH, Size} from "../../../../utils/constants.ts";
import {TbZoomQuestion} from "react-icons/tb";

interface Properties extends ButtonProps{
    tune: Tune;
}

const LoadSimilarTunesButton: React.FC<Properties> = ({tune, ...props}) => {

    const {t} = useTranslation();
    const {loadSimilarTunes, isBusy} = useSimilarTunes();


    const handleSubmit = () => {
        if (tune.audio) {
            loadSimilarTunes({
                    filePath: tune.audio,
                    top: SIMILAR_TUNES_TO_FETCH,
                    selfRef: tune.id,
                    dataset: "folkera",
                },
                undefined)
            ;
        }
    }

    return (
        <Button
            size={props.size || "sm"}
            color={props.color || "dark"}
            disabled={isBusy || !tune.audio}
            variant={props.variant || "subtle"}
            leftSection={<TbZoomQuestion size={Size.icon.SM} />}
            onClick={handleSubmit}
        >
            {t("button.loadSimilarTunes")}
        </Button>
    );
}

export default LoadSimilarTunesButton;

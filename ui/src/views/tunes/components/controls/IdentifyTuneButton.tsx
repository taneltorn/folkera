import React from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@mantine/core";
import {Tune} from "../../../../model/Tune.ts";
import {useSimilarTunes} from "../../../../hooks/useSimilarTunes.tsx";
import {Size} from "../../../../utils/constants.ts";
import {TbZoomQuestion} from "react-icons/tb";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

interface Properties {
    tune: Tune;
}

const SIMILAR_TUNES_TO_FETCH = 50;

const IdentifyTuneButton: React.FC<Properties> = ({tune}) => {

    const {t} = useTranslation();
    const {findSimilarTunes} = useSimilarTunes();
    const {state} = useControlState();

    const fetchData = () => {
        if (tune?.audio) {
            findSimilarTunes(tune?.audio, SIMILAR_TUNES_TO_FETCH, tune.id, "folkera", false);
        }
    }

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    variant={"subtle"}
                    color={"dark"}
                    leftSection={<TbZoomQuestion size={Size.icon.MD}/>}
                    onClick={fetchData}
                >
                    {t("view.tunes.details.similarTunes")}
                </Button>}
        </>
    );
}

export default IdentifyTuneButton;

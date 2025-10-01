import React from "react";
import {useTranslation} from "react-i18next";
import {Button} from "@mantine/core";
import {Recording} from "../../../../model/Recording.ts";
import {useSimilarRecordings} from "../../../../hooks/useSimilarRecordings.tsx";
import {Size} from "../../../../utils/constants.ts";
import {TbZoomQuestion} from "react-icons/tb";
import {useControlState} from "../../../../hooks/useControlState.tsx";
import {ControlState} from "../../../../model/ControlState.ts";

interface Properties {
    recording: Recording;
}

const SIMILAR_RECORDINGS_TO_FETCH = 100;

const IdentifyRecordingButton: React.FC<Properties> = ({recording}) => {

    const {t} = useTranslation();
    const {findSimilarRecordings} = useSimilarRecordings();
    const {state} = useControlState();

    const fetchSimilarRecordings = () => {
        if (recording?.file) {
            findSimilarRecordings(recording?.file, SIMILAR_RECORDINGS_TO_FETCH, recording.id, false);
        }
    }

    return (<>
            {state === ControlState.IDLE &&
                <Button
                    variant={"subtle"}
                    color={"dark"}
                    leftSection={<TbZoomQuestion size={Size.icon.MD}/>}
                    onClick={fetchSimilarRecordings}
                >
                    {t("view.recordings.details.similarRecordings")}
                </Button>}
        </>
    );
}

export default IdentifyRecordingButton;

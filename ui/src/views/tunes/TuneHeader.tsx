import React from "react";
import {Tune} from "../../model/Tune.ts";
import {Group} from "@mantine/core";
import ModifyTuneButton from "./components/controls/ModifyTuneButton.tsx";
import {useTranslation} from "react-i18next";
import {AiFillEdit} from "react-icons/ai";
import {Size} from "../../utils/constants.ts";
import SelectTunesButton from "./components/controls/SelectTunesButton.tsx";
import {useSimilarTunes} from "../../hooks/useSimilarTunes.tsx";
import IdentifyTuneButton from "./components/controls/IdentifyTuneButton.tsx";
import SaveModificationsButtons from "./components/controls/SaveModificationsButtons.tsx";
import BulkModifyTunesButtons from "./components/controls/BulkModifyTunesButtons.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import PlayAudioButton from "./table/components/controls/PlayAudioButton.tsx";
import TuneReference from "./TuneReference.tsx";
import NextTuneButton from "./components/controls/NextTuneButton.tsx";
import PreviousTuneButton from "./components/controls/PreviousTuneButton.tsx";

interface Properties {
    tune: Tune;
    reloadData: () => void;
}

const TuneHeader: React.FC<Properties> = ({tune, reloadData}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {similarTunes} = useSimilarTunes();

    return (
        <>
            <Group justify={"space-between"} mb={"md"}>
                <Group wrap={"nowrap"}>
                    {tune.audio && <PlayAudioButton tune={tune}/>}
                    <TuneReference tune={tune}/>
                </Group>

                <Group gap={4}>
                    {currentUser?.isAdmin && <>
                        <SaveModificationsButtons/>
                        <BulkModifyTunesButtons/>

                        {similarTunes.length > 0 && <SelectTunesButton/>}
                        <IdentifyTuneButton tune={tune}/>
                        <ModifyTuneButton
                            size={"sm"}
                            tune={tune}
                            leftSection={<AiFillEdit size={Size.icon.MD}/>}
                            onChange={reloadData}>
                            {t("button.modify")}
                        </ModifyTuneButton>
                    </>}

                    <Group gap={4}>
                        <PreviousTuneButton tune={tune}/>
                        <NextTuneButton tune={tune}/>
                    </Group>
                </Group>
            </Group>
        </>
    );
}

export default TuneHeader;

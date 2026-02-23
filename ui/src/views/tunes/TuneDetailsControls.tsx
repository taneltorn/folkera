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
import ShowArchiveDocumentsButton from "./components/controls/ShowArchiveDocumentsButton.tsx";

interface Properties {
    tune: Tune;
    reloadData: () => void;
}

const TuneDetailsControl: React.FC<Properties> = ({tune, reloadData}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {similarTunes} = useSimilarTunes();

    return (
        <Group gap={"xs"}>

            {tune.notation &&
                <ShowArchiveDocumentsButton tune={tune}>
                    {t("button.showArchiveItems")}
                </ShowArchiveDocumentsButton>}

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
        </Group>
    );
}

export default TuneDetailsControl;

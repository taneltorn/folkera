import React from "react";
import {Tune} from "../../model/Tune.ts";
import {Group} from "@mantine/core";
import ModifyTuneButton from "./components/controls/ModifyTuneButton.tsx";
import {useTranslation} from "react-i18next";
import {AiFillEdit} from "react-icons/ai";
import {Size} from "../../utils/constants.ts";
import SaveModificationsButtons from "./components/controls/SaveModificationsButtons.tsx";
import BulkModifyTunesButtons from "./components/controls/BulkModifyTunesButtons.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import ShowArchiveDocumentsButton from "./components/controls/ShowArchiveDocumentsButton.tsx";
import PlayAudioButton from "./table/components/controls/PlayAudioButton.tsx";
import ActiveViewButton from "../../components/buttons/ActiveViewButton.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import {FaTableList} from "react-icons/fa6";
import {MdScatterPlot} from "react-icons/md";
import {RiNodeTree} from "react-icons/ri";

interface Properties {
    tune: Tune;
    reloadData: () => void;
}

const TuneDetailsControl: React.FC<Properties> = ({tune, reloadData}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();

    return (
        <Group justify={"space-between"} mt={"xl"}>
            <Group gap={"xs"}>
                {tune.audio && <PlayAudioButton tune={tune}/>}

                {tune.notation &&
                    <ShowArchiveDocumentsButton tune={tune}>
                        {t("button.showArchiveItems")}
                    </ShowArchiveDocumentsButton>}

                {currentUser?.isAdmin && <>
                    <SaveModificationsButtons/>
                    <BulkModifyTunesButtons/>

                    <ModifyTuneButton
                        size={"sm"}
                        tune={tune}
                        leftSection={<AiFillEdit size={Size.icon.MD}/>}
                        onChange={reloadData}>
                        {t("button.modify")}
                    </ModifyTuneButton>
                </>}
            </Group>
            <Group gap={4}>
                <ActiveViewButton view={View.DETAILS} icon={<FaTableList size={Size.icon.SM}/>}/>

                {currentUser?.isResearcher && <>
                    <ActiveViewButton view={View.SIMILAR_TUNES} icon={<RiNodeTree size={Size.icon.SM}/>}/>
                    <ActiveViewButton view={View.CLUSTER} icon={<MdScatterPlot size={Size.icon.SM}/>}/>
                </>}
            </Group>
        </Group>
    );
}

export default TuneDetailsControl;

import React from "react";
import {Recording} from "../../model/Recording.ts";
import PlayRecordingButton from "./table/components/controls/PlayRecordingButton.tsx";
import {Group, Title} from "@mantine/core";
import ModifyRecordingButton from "./components/controls/ModifyRecordingButton.tsx";
import {useTranslation} from "react-i18next";
import {AiFillEdit} from "react-icons/ai";
import {Size} from "../../utils/constants.ts";
import SelectRecordingsButton from "./components/controls/SelectRecordingsButton.tsx";
import {useSimilarRecordings} from "../../hooks/useSimilarRecordings.tsx";
import IdentifyRecordingButton from "./components/controls/IdentifyRecordingButton.tsx";
import SaveModificationsButtons from "./components/controls/SaveModificationsButtons.tsx";
import BulkModifyRecordingsButtons from "./components/controls/BulkModifyRecordingsButtons.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";

interface Properties {
    recording: Recording;
    reloadData: () => void;
}

const RecordingHeader: React.FC<Properties> = ({recording, reloadData}) => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {similarRecordings} = useSimilarRecordings();

    return (
        <>
            <Group justify={"space-between"} mb={"md"}>
                <Group wrap={"nowrap"}>
                    <PlayRecordingButton
                        size={"lg"}
                        recording={recording}
                        variant={"light"}
                    />
                    <Title order={3}>{recording.ref}</Title>
                </Group>

                <Group gap={4}>
                    {currentUser?.isAdmin && <>
                        <SaveModificationsButtons/>
                        <BulkModifyRecordingsButtons/>

                        {similarRecordings.length > 0 && <SelectRecordingsButton/>}
                        <IdentifyRecordingButton recording={recording}/>
                        <ModifyRecordingButton
                            size={"sm"}
                            recording={recording}
                            leftSection={<AiFillEdit size={Size.icon.MD}/>}
                            onChange={reloadData}>
                            {t("button.modify")}
                        </ModifyRecordingButton>
                    </>}
                </Group>
            </Group>
        </>
    );
}

export default RecordingHeader;

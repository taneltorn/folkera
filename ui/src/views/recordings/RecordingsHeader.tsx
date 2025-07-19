import React from "react";
import {Recording} from "../../model/Recording.ts";
import PlayRecordingButton from "./table/components/controls/PlayRecordingButton.tsx";
import {Group, Title} from "@mantine/core";
import ModifyRecordingButton from "../admin/users/components/ModifyRecordingButton.tsx";
import FilterButtons from "./table/components/controls/FilterButtons.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {RiEdit2Fill} from "react-icons/ri";
import {Size} from "../../utils/constants.ts";
import {useTranslation} from "react-i18next";

interface Properties {
    recording: Recording;
    reloadData: () => void;
}

const RecordingHeader: React.FC<Properties> = ({recording, reloadData}) => {

    const {t} = useTranslation();
    const auth = useAuth();

    return (
        <>
            <Group justify={"space-between"}>
                <Title order={2}>{recording.ref}</Title>

                <Group gap={4}>
                    {auth.currentUser?.isAdmin &&
                        <ModifyRecordingButton
                            recording={recording}
                            variant={"outline"}
                            leftSection={<RiEdit2Fill size={Size.icon.SM}/>}
                            onChange={reloadData}>
                            {t("button.modify")}
                        </ModifyRecordingButton>}
                </Group>
            </Group>

            <Group mt={"xs"} mb={"md"} gap={"xs"}>
                <PlayRecordingButton
                    recording={recording}
                    variant={"light"}
                />
                {recording.content || "-"}
            </Group>
            
            {recording.tune &&
                <Group mb={"xs"}>
                    <FilterButtons
                        recording={recording}
                        field={"tune"}
                        returnHome
                        replace
                    />
                </Group>}
        </>
    );
}

export default RecordingHeader;

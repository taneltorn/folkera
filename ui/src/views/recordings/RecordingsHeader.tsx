import React from "react";
import {Recording} from "../../model/Recording.ts";
import PlayRecordingButton from "./table/components/controls/PlayRecordingButton.tsx";
import {Group, Title} from "@mantine/core";
import ModifyRecordingButton from "./components/ModifyRecordingButton.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
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
            <Group justify={"space-between"} mb={"md"}>
                <Group>
                    <PlayRecordingButton
                        size={"lg"}
                        recording={recording}
                        variant={"light"}
                    />
                    <Title order={2}>{recording.content}</Title>
                    
                </Group>

                <Group gap={4}>
                    {auth.currentUser?.isAdmin &&
                        <ModifyRecordingButton
                            size={"sm"}
                            recording={recording}
                            variant={"outline"}
                            onChange={reloadData}>
                            {t("button.modify")}
                        </ModifyRecordingButton>}
                </Group>
            </Group>
        </>
    );
}

export default RecordingHeader;

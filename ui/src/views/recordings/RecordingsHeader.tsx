import React from "react";
import {Recording} from "../../model/Recording.ts";
import PlayRecordingButton from "./table/components/controls/PlayRecordingButton.tsx";
import {Group, Title} from "@mantine/core";
import ModifyRecordingControls from "./components/controls/ModifyRecordingControls.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";
import {useTranslation} from "react-i18next";
import {AiFillEdit} from "react-icons/ai";
import {Size} from "../../utils/constants.ts";

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
                        <ModifyRecordingControls
                            size={"sm"}
                            color={"dark"}
                            recording={recording}
                            variant={"subtle"}
                            leftSection={<AiFillEdit size={Size.icon.MD}/>}
                            onChange={reloadData}>
                            {t("button.modify")}
                        </ModifyRecordingControls>}
                </Group>
            </Group>
        </>
    );
}

export default RecordingHeader;

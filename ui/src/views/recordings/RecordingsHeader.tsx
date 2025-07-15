import React from "react";
import {Recording} from "../../model/Recording.ts";
import PlayRecordingButton from "./table/components/controls/PlayRecordingButton.tsx";
import TableLink from "../../components/footer/TableLink.tsx";
import {Group, Title} from "@mantine/core";
import ModifyRecordingButton from "../admin/users/components/ModifyRecordingButton.tsx";
import FilterButtons from "./table/components/controls/FilterButtons.tsx";
import {useAuth} from "../../hooks/useAuth.tsx";

interface Properties {
    recording: Recording;
    reloadData: () => void;
}

const RecordingHeader: React.FC<Properties> = ({recording, reloadData}) => {

    const auth = useAuth();

    return (
        <>
            <Group justify={"space-between"}>
                <Group>
                    <Title order={1} style={{textAlign: "center"}}>{recording.ref}</Title>
                </Group>

                <Group gap={4}>
                    {auth.currentUser?.isAdmin &&
                        <ModifyRecordingButton recording={recording} onChange={reloadData}/>}
                    <TableLink field={"ref"} value={recording.ref}/>
                </Group>

            </Group>

            <Group mt={"xs"} mb={"md"} gap={"xs"}>
                <PlayRecordingButton
                    recording={recording}
                    variant={"light"}
                />
                {recording.content || "-"}
                {recording.tune &&
                    <FilterButtons
                        recording={recording}
                        field={"tune"}
                        returnHome
                        replace
                    />}
            </Group>
        </>
    );
}

export default RecordingHeader;

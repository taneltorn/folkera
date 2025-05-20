import React  from "react";
import {Recording} from "../../model/Recording.ts";
import PlayRecordingButton from "./table/components/controls/PlayRecordingButton.tsx";
import TableLink from "../../components/footer/TableLink.tsx";
import {Group, Title} from "@mantine/core";

interface Properties {
    recording: Recording;
}

const RecordingHeader: React.FC<Properties> = ({recording}) => {

    return (
        <>
            <Group justify={"space-between"}>
                <Title order={1} style={{textAlign: "center"}}>{recording.ref}</Title>
                <TableLink
                    field={"re"}
                    value={recording.ref}
                />
            </Group>

            <Group mt={"xs"} mb={"md"} gap={"xs"}>
                <PlayRecordingButton
                    recording={recording}
                    variant={"light"}
                />
                {recording.content || "-"}
            </Group>
        </>
    );
}

export default RecordingHeader;

import React from "react";
import {Group} from "@mantine/core";
import SubmitButton from "../../../../components/buttons/SubmitButton.tsx";
import CancelButton from "../../../../components/buttons/CancelButton.tsx";

interface Properties {
    isLoading?: boolean;
    onCancel: () => void;
}

const StandardFormControls: React.FC<Properties> = ({isLoading, onCancel}) => {

    return (
        <Group justify={"end"} gap={4}>
            <CancelButton onClick={onCancel}/>
            <SubmitButton isLoading={isLoading} />
        </Group>
    );
}

export default StandardFormControls;

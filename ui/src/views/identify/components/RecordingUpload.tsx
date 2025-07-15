import React from "react";
import {
    Button, FileButton, Text, Combobox, Group, Alert,
} from "@mantine/core";
import {useTranslation} from "react-i18next";
import ClearButton = Combobox.ClearButton;
import {useAuth} from "../../../hooks/useAuth.tsx";
import {IoAlertCircleOutline} from "react-icons/io5";
import {Size} from "../../../utils/constants.ts";

interface Properties {
    file: File | null;
    onChange: (file: File | null) => void;
    onClear: () => void;
}

const RecordingUpload: React.FC<Properties> = ({file, onChange, onClear}) => {

    const {t} = useTranslation();
    const auth = useAuth();

    return (<>
            {!auth.currentUser?.isUser 
            ?     <Alert icon={<IoAlertCircleOutline size={Size.icon.LG}/>}>
                    {t("view.identify.uploadUnauthorized")}
                </Alert>
            :  <Group>
                <FileButton  accept="audio/*" onChange={onChange}>
                    {(props) =>
                        <Button {...props} variant={"outline"}>
                            {t("view.identify.placeholder")}
                        </Button>}
                </FileButton>
                {!auth.currentUser?.isUser && <Text></Text>}

                {file && <>
                    <Text size="sm">{file.name}</Text>
                    <ClearButton onClear={onClear}/>
                </>}
            </Group> }

        </>
    );
};

export default RecordingUpload;

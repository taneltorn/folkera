import React from "react";
import {useTranslation} from "react-i18next";
import {Button, CopyButton, Text} from "@mantine/core";
import {Recording} from "../../model/Recording.ts";
import {fullRef} from "../../utils/helpers.tsx";
import {MdContentCopy} from "react-icons/md";
import {Size} from "../../utils/constants.ts";

interface Properties {
    recording: Recording;
}

const RecordingReference: React.FC<Properties> = ({recording}) => {

    const {t} = useTranslation();

    return (
        <Text px={8}>

            {fullRef(recording)}
            <CopyButton value={fullRef(recording)}>
                {({copied, copy}) => (
                    <Button
                        px={"xs"}
                        ml={"xs"}
                        title={t("button.copyToClipboard")}
                        variant={"subtle"}
                        color={copied ? 'teal' : 'blue'}
                        onClick={copy}
                    >
                        <MdContentCopy size={Size.icon.SM}/>
                    </Button>
                )}
            </CopyButton>
        </Text>
    );
}

export default RecordingReference;

import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button, Group, Menu, Switch} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {RecordingTableFields} from "../../../../utils/lists.ts";
import {Recording} from "../../../../model/Recording.ts";
import LabelValue from "../../../../components/LabelValue.tsx";
import ExportRecordingsCsvButton from "../../components/controls/ExportRecordingsCsvButton.tsx";
import SelectRecordingsButton from "../../components/controls/SelectRecordingsButton.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";
import {BiColumns} from "react-icons/bi";

const RecordingsTableControls: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {hiddenFields, toggleField, totalItems} = useDataContext();

    return (
        <Group gap={4}>
            <LabelValue
                label={t("view.recordings.table.results")}
                value={totalItems}
                mr={"md"}
            />

            {currentUser?.isAdmin && <SelectRecordingsButton/>}
            <ExportRecordingsCsvButton/>

            <Menu shadow="md" closeOnClickOutside={true} closeOnItemClick={false}>
                <Menu.Target>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        leftSection={<BiColumns size={Size.icon.MD}/>}
                    >
                        {t("view.recordings.controls.visibleFields")}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    {RecordingTableFields
                        .map((it, index) =>
                            <Menu.Item key={index}>
                                <Switch
                                    label={t(`recording.${it}`)}
                                    checked={!hiddenFields.includes(it as keyof Recording)}
                                    onClick={() => toggleField(it as keyof Recording)}
                                />
                            </Menu.Item>)}
                </Menu.Dropdown>
            </Menu>
        </Group>
    );
}

export default RecordingsTableControls;

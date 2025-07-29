import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button, Menu, Switch} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {RecordingTableFields} from "../../../../utils/lists.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {Recording} from "../../../../model/Recording.ts";
import LabelValue from "../../../../components/LabelValue.tsx";

const RecordingsTableControls: React.FC = () => {

    const {t} = useTranslation();
    const {hiddenFields, toggleField, totalItems} = useDataContext();

    return (
        <>
            <LabelValue label={t("view.recordings.table.results")} value={totalItems}/>

            <Menu shadow="md" closeOnClickOutside={true} closeOnItemClick={false}>
                <Menu.Target>
                    <Button
                        variant={"subtle"}
                        size={"sm"}
                        color={"dark"}
                        leftSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
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
        </>
    );
}

export default RecordingsTableControls;

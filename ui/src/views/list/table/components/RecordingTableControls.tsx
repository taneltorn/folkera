import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button, Menu} from "@mantine/core";
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {RecordingTableFields} from "../../../../utils/lists.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {Recording} from "../../../../../../domain/Recording.ts";

const RecordingTableControls: React.FC = () => {

    const {t} = useTranslation();
    const {hiddenFields, toggleField} = useDataContext();

    return (
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
                        <Menu.Item
                            key={index}
                            c={hiddenFields.includes(it as keyof Recording) ? "dark.1" : "dark.9"}
                            leftSection={hiddenFields.includes(it as keyof Recording)
                                ? <FaEyeSlash size={Size.icon.SM}/>
                                : <FaRegEye size={Size.icon.SM}/>}
                            onClick={() => toggleField(it as keyof Recording)}>
                            {t(`recording.${it}`)}
                        </Menu.Item>)}
            </Menu.Dropdown>
        </Menu>
    );
}

export default RecordingTableControls;

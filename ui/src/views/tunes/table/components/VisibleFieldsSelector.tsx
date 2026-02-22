import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Button, Divider, Menu, Switch} from "@mantine/core";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {BiColumns} from "react-icons/bi";
import {fields, technicalFields} from "../../../../hooks/useTableOrder.ts";

const VisibleFieldsSelector: React.FC = () => {

    const {t} = useTranslation();
    const {visibleFields, toggleField} = useDataContext();

    return (
        <Menu shadow="md" closeOnClickOutside={true} closeOnItemClick={false}>
            <Menu.Target>
                <Button
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    leftSection={<BiColumns size={Size.icon.MD}/>}
                >
                    {t("view.tunes.controls.visibleFields")}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {fields
                    .map(f => f.field)
                    .map((it, index) =>
                        <Menu.Item key={index}>
                            <Switch
                                label={t(`tune.${it}`)}
                                checked={visibleFields.includes(it as keyof Tune)}
                                onClick={() => toggleField(it as keyof Tune)}
                            />
                        </Menu.Item>)}

                <Menu.Item><Divider/></Menu.Item>
                {technicalFields
                    .map(f => f.field)
                    .map((it, index) =>
                        <Menu.Item key={index}>
                            <Switch
                                label={t(`tune.${it}`)}
                                checked={visibleFields.includes(it as keyof Tune)}
                                onClick={() => toggleField(it as keyof Tune)}
                            />
                        </Menu.Item>)}
            </Menu.Dropdown>
        </Menu>
    );
}

export default VisibleFieldsSelector;

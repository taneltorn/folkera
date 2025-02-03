import React from "react";
import {Button, Menu} from "@mantine/core";
import {Size} from "../../../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useMapOptions} from "../../../../hooks/useMapOptions.tsx";
import {MapType} from "../../../../model/MapOptions.ts";

const MapTypeSelector: React.FC = () => {

    const {t} = useTranslation();
    const {options, setOptions} = useMapOptions();

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    variant={"subtle"}
                    size={"xs"}
                    color={"dark"}
                    leftSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {t(`map.${options.type}`)}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {[MapType.PARISHES, MapType.COUNTIES]
                    .map(((it, index) => (
                            <Menu.Item key={index} onClick={() => setOptions({...options, type: it})}>
                                {t(`map.${it}`)}
                            </Menu.Item>)
                    ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default MapTypeSelector;

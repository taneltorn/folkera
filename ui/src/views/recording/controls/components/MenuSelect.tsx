import React from "react";
import {Button, Menu} from "@mantine/core";
import {Size} from "../../../../utils/common.constants.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {MenuSelectOption} from "../../../../model/MenuSelectOption.ts";

interface Properties {
    title?: string;
    label: string;
    options: MenuSelectOption[];
    onChange: (value: string) => void;
}

const MenuSelect: React.FC<Properties> = (props) => {

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    title={props.title}
                    variant={"subtle"}
                    size={"sm"}
                    color={"dark"}
                    leftSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {props.label}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {props.options
                    .map(((option, index) => (
                            <Menu.Item key={index} onClick={() => props.onChange(option.value)}>
                                {option.label}
                            </Menu.Item>)
                    ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default MenuSelect;

import React from "react";
import {Button, Divider, Menu} from "@mantine/core";
import {Size} from "../utils/constants.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {MenuSelectOption} from "../model/MenuSelectOption.ts";

interface Properties {
    title?: string;
    color?: string;
    variant?: string;
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
                    variant={props.variant || "subtle"}
                    size={"sm"}
                    color={props.color || "dark"}
                    leftSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {props.label}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {props.options
                    .map(((option, index) => (
                            option.value === ""
                                ? <Divider key={index} my={"xs"}/>
                                : <Menu.Item key={index} onClick={() => props.onChange(option.value)}>
                                    {option.label}
                                </Menu.Item>)
                    ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default MenuSelect;

import React from "react";
import {Button, Divider, Menu} from "@mantine/core";
import {Size} from "../utils/constants.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {MenuSelectOption} from "../model/MenuSelectOption.ts";

interface Properties {
    title?: string;
    size?: string;
    color?: string;
    variant?: string;
    label: string;
    value?: string;
    w?: number;
    options: MenuSelectOption[];
    onChange: (value: string) => void;
}

const MenuSelect: React.FC<Properties> = (props) => {

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    w={props.w || undefined}
                    title={props.title}
                    variant={props.variant || "subtle"}
                    size={props.size || "sm"}
                    color={props.color || "dark"}
                    rightSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {props.value || props.label}
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

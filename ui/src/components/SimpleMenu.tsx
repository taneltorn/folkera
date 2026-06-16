import React, {ReactNode} from "react";
import {Button, Divider, Menu} from "@mantine/core";
import {Size} from "../utils/constants.ts";
import {RiArrowDropDownLine} from "react-icons/ri";
import {MenuSelectOption} from "../model/MenuSelectOption.ts";
import CheckMark from "./CheckMark.tsx";
import useCurrentBreakpoint from "../hooks/useCurrentBreakPoint.tsx";

interface Properties {
    title?: string;
    size?: string;
    color?: string;
    variant?: string;
    label: string;
    value?: string;
    icon?: ReactNode;
    options: MenuSelectOption[];
    onChange: (value: string) => void;
}

const SimpleMenu: React.FC<Properties> = (props) => {

    const bp = useCurrentBreakpoint();

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    title={props.title}
                    variant={props.variant || "subtle"}
                    size={props.size || "sm"}
                    color={props.color || "dark.9"}
                    rightSection={(bp !== "xxs" || !props.icon) && <RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {props.icon && bp === "xxs" ? props.icon:  props.label}
                </Button>
            </Menu.Target>
            <Menu.Dropdown p={0}>
                {props.options
                    .map(((option, index) => (
                            option.value === ""
                                ? <Divider key={index} my={"xs"}/>
                                : <Menu.Item
                                    key={index}
                                    rightSection={<CheckMark show={props.value === option.value}/>}
                                    onClick={() => props.onChange(option.value)}
                                >
                                    {option.label}
                                </Menu.Item>)
                    ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default SimpleMenu;

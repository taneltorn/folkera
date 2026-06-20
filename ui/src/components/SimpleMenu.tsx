import React, {useState} from "react";
import {Divider, Menu} from "@mantine/core";
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri";
import {Size} from "../utils/constants.ts";
import {MenuSelectOption} from "../model/MenuSelectOption.ts";
import CheckMark from "./CheckMark.tsx";
import ResponsiveButton from "./buttons/ResponsiveButton.tsx";

interface Properties {
    title?: string;
    size?: string;
    color?: string;
    variant?: string;
    label: string;
    value?: string;
    leftSection?: React.ReactNode;
    alwaysShowLabel?: boolean;
    options: MenuSelectOption[];
    onChange: (value: string) => void;
}

const SimpleMenu: React.FC<Properties> = ({
                                              title,
                                              size = "sm",
                                              color = "dark.9",
                                              variant = "subtle",
                                              label,
                                              value,
                                              alwaysShowLabel,
                                              leftSection,
                                              options,
                                              onChange,
                                          }) => {

    const [opened, setOpened] = useState(false);

    return (
        <Menu opened={opened} onChange={setOpened} shadow="md" closeOnClickOutside>
            <Menu.Target>
                <ResponsiveButton
                    alwaysShowLabel={alwaysShowLabel}
                    title={title || label}
                    label={label}
                    leftSection={leftSection}
                    rightSection={opened
                        ? <RiArrowDropUpLine size={Size.icon.LG}/>
                        : <RiArrowDropDownLine size={Size.icon.LG}/>}
                    size={size}
                    color={color}
                    variant={variant}
                />
            </Menu.Target>

            <Menu.Dropdown p={0}>
                {options.map((option, index) =>
                    option.value === "" ? (
                        <Divider key={index} my="xs"/>
                    ) : (
                        <Menu.Item
                            key={index}
                            rightSection={<CheckMark show={value === option.value}/>}
                            onClick={() => onChange(option.value)}
                        >
                            {option.label}
                        </Menu.Item>
                    )
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export default SimpleMenu;
import React, {ReactNode, useState} from "react";
import {Center, Divider, Menu, useMantineTheme} from "@mantine/core";
import {RiArrowDropDownLine, RiArrowDropUpLine} from "react-icons/ri";
import {Size} from "../utils/constants.ts";
import ResponsiveButton from "./buttons/ResponsiveButton.tsx";

interface Properties {
    target: string | ReactNode;
    items: SelectMenuItem[];
    leftSection?: ReactNode;
    closeOnClickOutside?: boolean;
    closeOnItemClick?: boolean;
    onChange?: (value: string) => void;
}

export interface SelectMenuItem {
    leftSection?: ReactNode;
    rightSection?: ReactNode;
    value?: string;
    label?: string;
    disabled?: boolean;
    onClick?: () => void;
}

const AdvancedMenu: React.FC<Properties> = ({
                                                target,
                                                items,
                                                onChange,
                                                leftSection,
                                                closeOnClickOutside,
                                                closeOnItemClick,
                                            }) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);

    const handleSelect = (value: string, onClick?: () => void) => {
        onClick?.();
        onChange?.(value);
    };

    const menuTarget =
        typeof target === "string" ? (
            <ResponsiveButton
                label={target}
                leftSection={leftSection}
                rightSection={
                    opened
                        ? <RiArrowDropUpLine size={Size.icon.LG}/>
                        : <RiArrowDropDownLine size={Size.icon.LG}/>
                }
                size="sm"
                color="dark.9"
                variant="subtle"
            />
        ) : (
            target
        );

    return (
        <Menu
            opened={opened}
            onChange={setOpened}
            radius="md"
            position="bottom-end"
            closeOnItemClick={closeOnItemClick}
            closeOnClickOutside={closeOnClickOutside}
        >
            <Menu.Target>
                {menuTarget}
            </Menu.Target>

            <Menu.Dropdown p={0}>
                {items.map((item, index) =>
                    item.value ? (
                        <Menu.Item
                            key={`${index}-${item.value}`}
                            disabled={item.disabled}
                            leftSection={
                                item.leftSection ? (
                                    <Center w={30}>{item.leftSection}</Center>
                                ) : undefined
                            }
                            rightSection={
                                item.rightSection ? (
                                    <Center w={30}>{item.rightSection}</Center>
                                ) : undefined
                            }
                            onClick={() => handleSelect(item.value || "", item.onClick)}
                        >
                            {item.label}
                        </Menu.Item>
                    ) : (
                        <Divider key={index} my="xs" color={theme.colors.gray[1]}/>
                    )
                )}
            </Menu.Dropdown>
        </Menu>
    );
};

export default AdvancedMenu;
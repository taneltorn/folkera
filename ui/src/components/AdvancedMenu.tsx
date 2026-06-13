import React, {ReactNode} from "react";
import {Center, Divider, Menu, useMantineTheme} from "@mantine/core";

interface Properties {
    target: string | ReactNode;
    items: SelectMenuItem[];
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

const AdvancedMenu: React.FC<Properties> = ({target, items, onChange, ...props}) => {

    const theme = useMantineTheme();

    const handleSelect = (value: string, onClick?: () => void) => {
        if (onClick) {
            onClick();
        }
        if (onChange) {
            onChange(value);
        }
    }

    return (
        <Menu
            radius={"md"}
            position={"bottom-end"}
            closeOnItemClick={props.closeOnItemClick}
            closeOnClickOutside={props.closeOnClickOutside}
        >
            <Menu.Target>
                {target}
            </Menu.Target>
            <Menu.Dropdown p={0}>
                {items.map((item, index) => (
                    item.value
                        ? <Menu.Item
                            key={`${index}-${item.value}`}
                            disabled={item.disabled}
                            leftSection={item.leftSection ? <Center w={30}>{item.leftSection}</Center> : undefined}
                            rightSection={item.rightSection ? <Center w={30}>{item.rightSection}</Center> : undefined}
                            onClick={() => handleSelect(item.value || "", item.onClick)}
                        >
                            {item.label}
                        </Menu.Item>
                        : <Divider key={index} my={"xs"} color={theme.colors.gray[1]}/>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default AdvancedMenu;

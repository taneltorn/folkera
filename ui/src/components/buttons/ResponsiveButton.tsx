import React from "react";
import {Button, ButtonProps, ElementProps} from "@mantine/core";
import useCurrentBreakpoint from "../../hooks/useCurrentBreakPoint.tsx";

type ResponsiveButtonProps = ButtonProps &
    ElementProps<"button", keyof ButtonProps> & {
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
    label: string;
};

const ResponsiveButton: React.FC<ResponsiveButtonProps> = ({
                                                               leftSection,
                                                               label,
                                                               children,
                                                               ...props
                                                           }) => {
    const bp = useCurrentBreakpoint();
    const isIconOnly = bp === "xxs";

    return (
        <Button
            variant="subtle"
            size="sm"
            color="dark.9"
            title={label}
            px="xs"
            leftSection={!isIconOnly ? leftSection : undefined}
            {...props}
        >
            {isIconOnly ? leftSection : children ?? label}
        </Button>
    );
};

export default ResponsiveButton;
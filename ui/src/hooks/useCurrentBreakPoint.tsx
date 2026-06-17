import { useMatches } from "@mantine/core";

const useCurrentBreakpoint = (): "xxs" | "xs" | "sm" | "md" | "lg" | "xl" => {
    return useMatches({
        base: "xxs",
        xs: "xs",
        sm: "sm",
        md: "md",
        lg: "lg",
        xl: "xl",
    });
};

export default useCurrentBreakpoint;
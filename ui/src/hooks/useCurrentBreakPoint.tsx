import {useMantineTheme} from '@mantine/core';
import {useMediaQuery} from "@mantine/hooks";

const useCurrentBreakpoint = (): 'xs' | 'sm' | 'md' | 'lg' | 'xl' => {
    
    const theme = useMantineTheme();

    const isXl = useMediaQuery(`(min-width: ${theme.breakpoints.xl})`);
    const isLg = useMediaQuery(`(min-width: ${theme.breakpoints.lg}) `);
    const isMd = useMediaQuery(`(min-width: ${theme.breakpoints.md}) `);
    const isSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm})`);
    const isXs = useMediaQuery(`(min-width: 0px)`);

    if (isXl) return 'xl';
    if (isLg) return 'lg';
    if (isMd) return 'md';
    if (isSm) return 'sm';
    if (isXs) return 'xs';
    
    return 'xl';
};

export default useCurrentBreakpoint;
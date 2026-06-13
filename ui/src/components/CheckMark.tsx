import React from "react";
import {useMantineTheme} from "@mantine/core";
import {Size} from "../utils/constants.ts";
import {IoMdCheckmark} from "react-icons/io";

interface Properties {
    show?: boolean;
}

export const CheckMark: React.FC<Properties> = ({show}) => {

    const theme = useMantineTheme();

    return (<>
            {show && <IoMdCheckmark color={theme.colors[theme.primaryColor][9]} size={Size.icon.SM}/>}
        </>
    );
}

export default CheckMark;

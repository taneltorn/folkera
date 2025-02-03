import React from 'react';
import {Button, Text} from "@mantine/core";
import {BsDiscFill} from "react-icons/bs";
import {Size} from "../../utils/common.constants.ts";

const Logo: React.FC = () => {

    const size = 24;

    return (
        <Button
            px={0}
            variant={"transparent"}
            leftSection={<BsDiscFill size={Size.icon.LG}/>}
        >
            <Text fz={size} ff={"Roboto"}>
                Heli
            </Text>
            <Text fz={size} fw={"bold"} ff={"Roboto"}>
                arhiiv
            </Text>
        </Button>);
}

export default Logo;

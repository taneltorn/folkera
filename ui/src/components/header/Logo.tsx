import React from 'react';
import {Badge, Button, Text} from "@mantine/core";
import {BsDiscFill} from "react-icons/bs";
import {Size} from "../../utils/constants.ts";
import packageJson from '../../../package.json';

const Logo: React.FC = () => {

    const size = 24;

    return (
        <Button
            px={0}
            variant={"transparent"}
            leftSection={<BsDiscFill size={Size.icon.LG}/>}
        >
            <Text fz={size} ff={"Roboto"}>
                Folk
            </Text>
            <Text fz={size} fw={"bold"} ff={"Roboto"}>
                ERA
            </Text>
            <Badge size={"xs"} variant={"transparent"} pos={"absolute"} top={22} left={34}>
                {packageJson.version}
            </Badge>
        </Button>);
}

export default Logo;

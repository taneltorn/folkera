import React from 'react';
import { Button, Text} from "@mantine/core";
import {BsDiscFill} from "react-icons/bs";
import {Size} from "../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";


const Logo: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Button
            px={0}
            variant={"transparent"}
            leftSection={<BsDiscFill size={Size.icon.LG}/>}>
            <Text fz={24}  ff={"Roboto"} >
                Heli
            </Text>
            <Text fz={24} fw={"bold"} ff={"Roboto"}>
                arhiiv
            </Text>
        </Button>);
}

export default Logo;

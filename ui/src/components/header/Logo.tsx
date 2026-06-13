import React from 'react';
import {Button, Image} from "@mantine/core";

const Logo: React.FC = () => {

    return (
        <Button
            px={0}
            variant={"transparent"}
        >
            <Image src={"/logo.png"} h={110}/>
        </Button>);
}

export default Logo;

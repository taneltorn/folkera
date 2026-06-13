import React from 'react';
import {Button} from "@mantine/core";

const Logo: React.FC = () => {

    return (
        <Button
            px={0}
            variant={"transparent"}
        >
            <img src={"/logo.png"} alt={"logo"} height={38}/>
        </Button>);
}

export default Logo;

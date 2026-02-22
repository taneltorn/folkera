import React from "react";
import {Button, Text} from '@mantine/core';
import {modals} from '@mantine/modals';
import {Tune} from "../../../../model/Tune.ts";
import NotationViewer from "../../details/components/NotationViewer.tsx";
import {RiArchiveStackLine} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";

interface Properties {
    tune: Tune;
    children?: React.ReactNode;
}

const ShowArchiveDocumentsButton: React.FC<Properties> = ({tune, children}) => {

    const open = () =>
        modals.open({
            title:   <Text size={"xl"} fw={"bold"}>{tune.notation}</Text>,
            size: "70%",
            children: <NotationViewer tune={tune}/>,
        });

    return (
        <Button
            size={"sm"}
            mt={"xs"}
            mb={"md"}
            leftSection={<RiArchiveStackLine size={Size.icon.MD}/>}
            onClick={open}
        >
            {children}
        </Button>
    );
}

export default ShowArchiveDocumentsButton;

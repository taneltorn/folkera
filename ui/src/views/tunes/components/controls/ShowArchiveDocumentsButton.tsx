import React from "react";
import {Button} from '@mantine/core';
import {Tune} from "../../../../model/Tune.ts";
import {RiArchiveStackLine} from "react-icons/ri";
import {Size} from "../../../../utils/constants.ts";
import NotationViewer from "../../details/components/NotationViewer.tsx";

interface Properties {
    tune: Tune;
    children?: React.ReactNode;
}

const ShowArchiveDocumentsButton: React.FC<Properties> = ({tune, children}) => {
    return (
        <NotationViewer tune={tune}>
            {(open) => (
                <Button
                    size="sm"
                    color="dark.9"
                    radius="xl"
                    variant="subtle"
                    leftSection={<RiArchiveStackLine size={Size.icon.MD}/>}
                    onClick={open}
                >
                    {children}
                </Button>
            )}
        </NotationViewer>
    );
};

export default ShowArchiveDocumentsButton;

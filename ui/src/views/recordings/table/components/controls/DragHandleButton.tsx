import React from "react";
import {Button, Group} from "@mantine/core";
import {Size} from "../../../../../utils/constants.ts";
import {RxDragHandleDots2} from "react-icons/rx";

interface Properties {
}

const DragHandleButton: React.FC<Properties> = () => {

    return (
        <Group>
            <Button
                px={0}
                size={"compact-xs"}
                color={"dark.1"}
                variant="transparent"
            >
                <RxDragHandleDots2 size={Size.icon.MD}/>
            </Button>
        </Group>
    );
};

export default DragHandleButton;

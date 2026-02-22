import React from "react";
import {Button, Group} from "@mantine/core";
import {Size} from "../../../../../utils/constants.ts";
import {RxDragHandleDots2} from "react-icons/rx";
import {useTranslation} from "react-i18next";

const DragHandleButton: React.FC = () => {

    const {t} = useTranslation();
    
    return (
        <Group>
            <Button
                title={t("view.tunes.table.drag")}
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

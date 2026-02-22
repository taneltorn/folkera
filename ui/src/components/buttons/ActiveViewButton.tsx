import React, {ReactNode} from "react";
import {Button} from "@mantine/core";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    view: View;
    icon: ReactNode;
}

const ActiveViewButton: React.FC<Properties> = ({view, icon}) => {

    const {t} = useTranslation();
    const {activeView, setActiveView} = useActiveView();

    return (
        <Button
            title={t(`view.tunes.viewSelection.${view}`)}
            px={"sm"}
            variant={view === activeView ? "light" : "subtle"}
            color={"dark"}
            size={"sm"}
            onClick={() => setActiveView(view)}
        >
            {icon}
        </Button>
    );
}

export default ActiveViewButton;

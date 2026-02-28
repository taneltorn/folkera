import React, {ReactNode} from "react";
import {Button} from "@mantine/core";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {View} from "../../context/ActiveViewContext.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    view: View;
    icon: ReactNode;
    disabled?: boolean;
}

const ActiveViewButton: React.FC<Properties> = ({view, icon, disabled}) => {

    const {t} = useTranslation();
    const {activeView, setActiveView} = useActiveView();

    return (
        <Button
            title={t(`page.tunes.viewSelection.${view}`)}
            px={"sm"}
            variant={view === activeView ? "light" : "subtle"}
            color={"dark"}
            disabled={disabled}
            size={"sm"}
            onClick={() => setActiveView(view)}
        >
            {icon}
        </Button>
    );
}

export default ActiveViewButton;

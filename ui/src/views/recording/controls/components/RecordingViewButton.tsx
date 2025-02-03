import React, {ReactNode} from "react";
import {Button} from "@mantine/core";
import {useActiveView} from "../../../../hooks/useActiveView.tsx";
import {View} from "../../../../context/ActiveViewContext.tsx";

interface Properties {
    view: View;
    icon: ReactNode;
}

const RecordingViewButton: React.FC<Properties> = ({view, icon}) => {

    const {activeView, setActiveView} = useActiveView();

    return (
        <Button
            px={"xs"}
            variant={view === activeView ? "light" : "subtle"}
            color={"dark"}
            size={"xs"}
            onClick={() => setActiveView(view)}
        >
            {icon}
        </Button>
    );
}

export default RecordingViewButton;

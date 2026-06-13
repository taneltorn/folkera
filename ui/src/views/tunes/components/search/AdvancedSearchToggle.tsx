import React from "react";
import {Button} from "@mantine/core";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useTranslation} from "react-i18next";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";

const AdvancedSearchToggle: React.FC = () => {

    const {t} = useTranslation();
    const {visible, setVisible} = useAdvancedFilteringContext();

    return (
        <Button
            px={"xs"}
            color={"dark.9"}
            title={t(`filtering.advanced.${visible ? "close" : "open"}`)}
            onClick={() => setVisible(!visible)}
            variant={"transparent"}
        >

            {t(`filtering.advanced.${visible ? "close" : "open"}`)}
            {visible ? <FaCaretUp/> :<FaCaretDown/>}
        </Button>
    );
}

export default AdvancedSearchToggle;

import React from "react";
import {Button} from "@mantine/core";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {Size} from "../../../../utils/constants.ts";
import {LiaSlidersHSolid} from "react-icons/lia";
import {useTranslation} from "react-i18next";

const AdvancedSearchToggle: React.FC = () => {

    const {t} = useTranslation();
    const {visible, setVisible} = useAdvancedFilteringContext();

    return (
        <Button
            px={2}
            size={"md"}
            title={t(`filtering.advanced.${visible ? "close" : "open"}`)}
            onClick={() => setVisible(!visible)}
            variant={visible ? "filled" : "subtle"}
        >
            <LiaSlidersHSolid size={Size.icon.XL}/>
        </Button>
    );
}

export default AdvancedSearchToggle;

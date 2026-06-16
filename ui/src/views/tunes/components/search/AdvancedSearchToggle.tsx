import React from "react";
import {Button} from "@mantine/core";
import {useAdvancedFilteringContext} from "../../../../hooks/useAdvancedFilteringContext.tsx";
import {useTranslation} from "react-i18next";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";
import {LuSlidersHorizontal} from "react-icons/lu";
import {Size} from "../../../../utils/constants.ts";

const AdvancedSearchToggle: React.FC = () => {

    const {t} = useTranslation();
    const {visible, setVisible} = useAdvancedFilteringContext();
    const bp = useCurrentBreakpoint();

    return (
        <>
            <Button
                px={"xs"}
                color={"dark.9"}
                size={bp === "xxs" ? "md" : "sm"}
                title={t(`filtering.advanced.${visible ? "close" : "open"}`)}
                onClick={() => setVisible(!visible)}
                variant={bp === "xxs" && visible ? "filled" : "transparent"}
            >
                {bp === "xxs"
                    ? <LuSlidersHorizontal size={Size.icon.MD}/>
                    : <>
                {t(`filtering.advanced.${visible ? "close" : "open"}`)}
                {visible ? <FaCaretUp/> : <FaCaretDown/>}
                    </>}
            </Button>
        </>
    );
}

export default AdvancedSearchToggle;

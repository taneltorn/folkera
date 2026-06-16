import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {BiColumns} from "react-icons/bi";
import {fields, technicalFields} from "../../../../utils/fields.ts";
import AdvancedMenu, {SelectMenuItem} from "../../../../components/AdvancedMenu.tsx";
import {Button} from "@mantine/core";
import CheckMark from "../../../../components/CheckMark.tsx";
import useCurrentBreakpoint from "../../../../hooks/useCurrentBreakPoint.tsx";

const VisibleFieldsSelector: React.FC = () => {

    const {t} = useTranslation();
    const {visibleFields, toggleField} = useDataContext();
    const bp = useCurrentBreakpoint();

    const getOptions = () => {
        const items: SelectMenuItem[] = fields
            .map(f => f.field)
            .map(it => ({
                label: t(`tune.${it}`),
                value: it,
                rightSection: <CheckMark show={visibleFields.includes(it as keyof Tune)}/>,
                onClick: () => toggleField(it as keyof Tune)
            }));

        items.push({});

        const technical: SelectMenuItem[] = technicalFields
            .map(f => f.field)
            .map(it => ({
                label: t(`tune.${it}`),
                value: it,
                rightSection: <CheckMark show={visibleFields.includes(it as keyof Tune)}/>,
                onClick: () => toggleField(it as keyof Tune)
            }));

        return [...items, ...technical];
    }

    const items = getOptions();
    const icon = <BiColumns size={Size.icon.MD}/>;

    return (
        <AdvancedMenu
            target={
                <Button
                    variant={"subtle"}
                    title={t("page.tunes.controls.visibleFields")}
                    size={"sm"}
                    color={"dark.9"}
                    leftSection={bp !== "xxs" && icon}
                >
                    {bp === "xxs" ? icon : t("page.tunes.controls.visibleFields")}
                </Button>}
            closeOnItemClick={false}
            items={items}
        />
    );
}

export default VisibleFieldsSelector;

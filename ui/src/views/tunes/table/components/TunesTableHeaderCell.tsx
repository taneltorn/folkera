import React, {useState} from "react";
import {Group, Popover, Table, Text} from "@mantine/core";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Tune} from "../../../../model/Tune.ts";
import {useTranslation} from "react-i18next";
import {SortDirection} from "../../../../model/Pagination.ts";
import {FaCaretDown, FaCaretUp} from "react-icons/fa";
import {Size} from "../../../../utils/constants.ts";
import AdvancedMenu from "../../../../components/AdvancedMenu.tsx";
import {RiSortAsc, RiSortDesc} from "react-icons/ri";
import {useTableColumnOrderContext} from "../../../../hooks/useTableColumnOrderContext.tsx";
import {useHover} from "@mantine/hooks";
import {RxArrowLeft, RxArrowRight, RxDoubleArrowLeft, RxDoubleArrowRight, RxDragHandleDots2} from "react-icons/rx";
import FilterInput from "./controls/FilterInput.tsx";
import FilterSelect from "./controls/FilterSelect.tsx";
import {GoSearch} from "react-icons/go";
import {BiHide} from "react-icons/bi";

interface Properties {
    field: keyof Tune;
    sortField?: keyof Tune;
    colSpan?: number;
    type: "input" | "select";
}

const TunesTableHeaderCell: React.FC<Properties> = ({field, sortField, colSpan, type}) => {

    const {t} = useTranslation();

    const {pagination, sortBy, visibleFields, toggleField} = useDataContext();
    const {shiftField, shiftToStart, shiftToEnd} = useTableColumnOrderContext();
    const {hovered, ref} = useHover();

    const [filterOpened, setFilterOpened] = useState(false);

    return (
        <Table.Th
            py={"md"}
            className={"hover-parent"}
            hidden={!visibleFields.includes(field)}
            colSpan={colSpan || 1}
        >
            <Popover
                opened={filterOpened}
                onChange={setFilterOpened}
                position="bottom-start"
                withinPortal
                shadow={"xl"}
            >
                <Popover.Target>
                    <div ref={ref}>
                        <Group justify={"space-between"} wrap={"nowrap"}>
                            <Group gap={"xs"} wrap={"nowrap"} className="header-left">
                                <Text
                                    className={"hover-pointer"}
                                    fw={600}
                                    onClick={() => sortBy(sortField || field)}
                                >
                                    {t(`tune.${field}`)}
                                </Text>

                                {(pagination.sortField === sortField || pagination.sortField === field) && <>
                                    {pagination.sortDirection === SortDirection.ASC
                                        ? <FaCaretDown size={Size.icon.SM}/>
                                        : <FaCaretUp size={Size.icon.SM}/>
                                    }
                                </>}

                            </Group>

                            <Group style={{visibility: hovered || filterOpened ? "visible" : "hidden"}} gap={4}
                                   align={"flex-start"} wrap={"nowrap"}>
                                <GoSearch
                                    title={t("button.search")}
                                    className={"hover-pointer"}
                                    size={Size.icon.MD}
                                    onClick={() => setFilterOpened(true)}
                                />

                                <AdvancedMenu
                                    target={
                                        <RxDragHandleDots2
                                            title={t("button.settings")}
                                            className={"hover-pointer"}
                                            // color={theme.colors.gray[3]}
                                            size={Size.icon.MD}
                                        />}
                                    items={[
                                        {
                                            leftSection: <RiSortDesc size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.sortAsc"),
                                            value: "sortAsc",
                                            onClick: () => sortBy(field, SortDirection.ASC)
                                        },
                                        {
                                            leftSection: <RiSortAsc size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.sortDesc"),
                                            value: "sortDesc",
                                            onClick: () => sortBy(field, SortDirection.DESC)
                                        },
                                        {},
                                        {
                                            leftSection: <BiHide size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.hideColumn"),
                                            value: "hideColumn",
                                            onClick: () => toggleField(field)
                                        },
                                        {},
                                        {
                                            leftSection: <RxArrowLeft size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.shiftLeft"),
                                            value: "shiftLeft",
                                            onClick: () => shiftField(field, -1)
                                        },
                                        {
                                            leftSection: <RxArrowRight size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.shiftRight"),
                                            value: "shiftRight",
                                            onClick: () => shiftField(field, 1)
                                        },
                                        {
                                            leftSection: <RxDoubleArrowLeft size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.shiftToStart"),
                                            value: "shiftToStart",
                                            onClick: () => shiftToStart(field)
                                        },
                                        {
                                            leftSection: <RxDoubleArrowRight size={Size.icon.MD}/>,
                                            label: t("page.tunes.table.shiftToEnd"),
                                            value: "shiftToEnd",
                                            onClick: () => shiftToEnd(field)
                                        },
                                    ]}
                                />
                            </Group>
                        </Group>
                    </div>
                </Popover.Target>

                <Popover.Dropdown p={0} >
                    {type === "input" &&
                        <FilterInput autoFocus={filterOpened} field={field} placeholder={t(`tune.${field}`)}/>}
                    {type === "select" &&
                        <FilterSelect autoFocus={filterOpened} field={field} placeholder={t(`tune.${field}`)}/>}
                </Popover.Dropdown>
            </Popover>
        </Table.Th>
    );
};

export default TunesTableHeaderCell;

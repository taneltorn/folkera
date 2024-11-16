import React from "react";
import {Button, Menu} from "@mantine/core";
import {Size} from "../../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useStatsOptions} from "../../../hooks/useStatsOptions.tsx";
import {GroupBy} from "../../../model/Stats.ts";

const StatsTypeSelector: React.FC = () => {

    const {t} = useTranslation();
    const {groupBy, setGroupBy} = useStatsOptions();

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    variant={"subtle"}
                    size={"xs"}
                    color={"dark"}
                    leftSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {t(`stats.${groupBy}`)}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {[GroupBy.GROUP_BY_YEAR,
                    GroupBy.GROUP_BY_INSTRUMENT,
                    GroupBy.GROUP_BY_PARISH,
                    GroupBy.GROUP_BY_PIECE,
                    GroupBy.GROUP_BY_QUALITY,
                ].map(((it, index) => (
                        <Menu.Item key={index} onClick={() => setGroupBy(it)}>
                            {t(`stats.${it}`)}
                        </Menu.Item>)
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default StatsTypeSelector;

import React from "react";
import {Button, Menu} from "@mantine/core";
import {Size} from "../../../../utils/common.constants.ts";
import {useTranslation} from "react-i18next";
import {RiArrowDropDownLine} from "react-icons/ri";
import {useStats} from "../../../../hooks/useStats.tsx";
import {ChartType} from "../../../../model/Stats.ts";

const StatsChartTypeSelector: React.FC = () => {

    const {t} = useTranslation();
    const {chartType, setChartType} = useStats();

    return (
        <Menu shadow="md" closeOnClickOutside={true}>
            <Menu.Target>
                <Button
                    variant={"subtle"}
                    size={"xs"}
                    color={"dark"}
                    leftSection={<RiArrowDropDownLine size={Size.icon.LG}/>}
                >
                    {t(`stats.${chartType}`)}
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                {[ChartType.BAR, ChartType.PIE]
                    .map(((it, index) => (
                            <Menu.Item key={index} onClick={() => setChartType(it)}>
                                {t(`stats.${it}`)}
                            </Menu.Item>)
                    ))}
            </Menu.Dropdown>
        </Menu>
    );
}

export default StatsChartTypeSelector;

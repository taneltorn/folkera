import React, {useMemo} from "react";
import { Group} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {StatsItem} from "../../../model/Stats.ts";
import NumberCard from "../../../components/NumberCard.tsx";

interface Properties {
    stats?: StatsItem[];
}

const StatsCount: React.FC<Properties> = ({stats}) => {

    const {t} = useTranslation();

    const [total, unique] = useMemo<number[]>(() => {
        const values = Object.values(stats || []);

        return [
            values.reduce((a, b) => a + b, 0),
            values.length
        ];
    }, [stats]);

    return (
        <Group mb={"md"} gap={"xl"}>
            <NumberCard value={total} label={"VÄÄRTUSEGA"}/>
            <NumberCard value={unique} label={"UNIKAALSEID"}/>
        </Group>

    );
}

export default StatsCount;

import React, {useMemo} from "react";
import {Group, Text} from "@mantine/core";
import {useTranslation} from "react-i18next";
import {StatsItem} from "../../../model/Stats.ts";

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
        <Text>
            {total} | {unique}
        </Text>

    );
}

export default StatsCount;

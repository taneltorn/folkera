import React, {useEffect, useState} from "react";
import {useStatsService} from "../../../hooks/useStatsService.tsx";
import {Recording} from "../../../model/Recording.ts";
import {isEmpty} from "../../../utils/common.helpers.tsx";
import BarChart from "../../../components/BarChart.tsx";
import {Box, Button, Group, Menu, Select} from "@mantine/core";
import Dropdown = Menu.Dropdown;
import {FaEyeSlash, FaRegEye} from "react-icons/fa";
import {Size} from "../../../utils/common.constants.ts";
import {RecordingTableFields} from "../../../utils/common.lists.ts";
import {MdArrowDropDown} from "react-icons/md";

interface Properties {
    data: Recording[]
}

const RecordingStats: React.FC<Properties> = ({data}) => {

    const {fetchStats} = useStatsService();

    const [stats, setStats] = useState<Map<string, number>>(new Map());
    const [options, setOptions] = useState({key: "year", transformer: "number"});


    useEffect(() => {
        if (isEmpty(data)) {
            return;
        }
        fetchStats(data, options)
            .then(data => setStats(data as Map<string, number>));
    }, [data, options]);

    return (
        <Box px={"md"}>
            <Group justify={"start"}>

            <Menu shadow="md" closeOnClickOutside={true}>
                <Menu.Target>
                    <Button
                        variant={"outline"}
                        size={"xs"}
                        color={"dark"}
                        leftSection={<MdArrowDropDown  size={Size.icon.SM} />}
                        // leftSection={<FaEyeSlash size={Size.icon.SM}/>}
                    >
                        {options.key}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={() => setOptions({key: "year", transformer: "number"})}>
                        Aasta
                    </Menu.Item>
                    <Menu.Item onClick={() => setOptions({transformer: "", key: "instrument"})}>
                        Pill
                    </Menu.Item>
                    <Menu.Item onClick={() => setOptions({transformer: "", key: "piece"})}>
                        Lugu
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            </Group>

            <BarChart data={stats}/>
        </Box>
    );
}

export default RecordingStats;

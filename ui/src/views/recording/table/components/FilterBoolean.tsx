import React, {useState} from "react";
import {Box, Checkbox, MultiSelect, useMantineTheme} from "@mantine/core";
import {useDataFiltering} from "../../../../hooks/useDataFiltering.tsx";
import {Recording} from "../../../../../../domain/Recording.ts";
import {LuFilterX} from "react-icons/lu";
import {PiSpeakerHigh, PiSpeakerHighFill, PiSpeakerSlashLight} from "react-icons/pi";
import {Size} from "../../../../utils/common.constants.ts";

interface Properties {
    field: keyof Recording;
}

const FilterBoolean: React.FC<Properties> = ({field}) => {

    const theme = useMantineTheme();
    const {filters, addFilter, removeFilter} = useDataFiltering();

    return (
        <Box >

            {!!filters.find(f => f.field === "file")
            ?
                <PiSpeakerHighFill
                    color={ theme.colors.red[9]}
                    size={Size.icon.SM}
                    onClick={() => removeFilter("file")}
                />
                :
                <PiSpeakerSlashLight
                    color={ theme.colors.dark[1]}
                    size={Size.icon.SM}
                    onClick={() =>  addFilter(field, ["_not_blank"])}
                />}

         
          
        </Box>
    );
}

export default FilterBoolean;

import React from "react";
import {Tune} from "../../../../model/Tune.ts";
import TunesTableHeader from "./TunesTableHeader.tsx";
import FilterInput from "./controls/FilterInput.tsx";
import FilterSelect from "./controls/FilterSelect.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    field: keyof Tune;
    type: "input" | "select";
    sortField?: keyof Tune;
}

const DraggableHeaderWrapper: React.FC<Properties> = ({field, sortField, type}) => {

    const {t} = useTranslation();

    return (
        <TunesTableHeader field={field} sortField={sortField}>
            {type === "input" &&
                <FilterInput field={field} placeholder={t(`tune.${field}`)}/>}
            {type === "select" &&
                <FilterSelect field={field} placeholder={t(`tune.${field}`)}/>}
        </TunesTableHeader>
    );
};

export default DraggableHeaderWrapper;

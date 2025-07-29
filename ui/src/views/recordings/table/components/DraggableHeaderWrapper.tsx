import React from "react";
import {Recording} from "../../../../model/Recording";
import RecordingsTableHeader from "./RecordingsTableHeader.tsx";
import FilterInput from "./controls/FilterInput.tsx";
import FilterSelect from "./controls/FilterSelect.tsx";
import {useTranslation} from "react-i18next";

interface Properties {
    field: keyof Recording;
    type: "input" | "select";
    sortField?: keyof Recording;
}

const DraggableHeaderWrapper: React.FC<Properties> = ({field, sortField, type}) => {

    const {t} = useTranslation();

    return (
        <RecordingsTableHeader field={field} sortField={sortField}>
            {type === "input" &&
                <FilterInput field={field} placeholder={t(`recording.${field}`)}/>}
            {type === "select" &&
                <FilterSelect field={field} placeholder={t(`recording.${field}`)}/>}
        </RecordingsTableHeader>
    );
};

export default DraggableHeaderWrapper;

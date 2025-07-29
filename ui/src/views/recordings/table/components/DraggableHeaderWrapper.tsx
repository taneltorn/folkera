import React from "react";
import {Recording} from "../../../../model/Recording";
import RecordingTableHeader from "./RecordingTableHeader.tsx";
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
            <RecordingTableHeader field={field} sortField={sortField}>
                {type === "input" && (
                    <FilterInput field={field} placeholder={t(`recording.${field}`)} />
                )}
                {type === "select" && (
                    <FilterSelect field={field} placeholder={t(`recording.${field}`)} />
                )}
            </RecordingTableHeader>
    );
};

export default DraggableHeaderWrapper;

import React from 'react';
import {Button} from "@mantine/core";
import {View} from "../../context/ActiveViewContext.tsx";
import {useDataContext} from "../../hooks/useDataContext.tsx";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {useNavigate} from "react-router-dom";
import {TbTableSpark} from "react-icons/tb";
import { useTranslation } from 'react-i18next';
import {IconSize} from "../../utils/mappers.ts";

interface Properties {
    field: string;
    value: string;
    size?: string;
}

const TableLink: React.FC<Properties> = (props) => {

    const {t} = useTranslation();
    
    const {useFilter} = useDataContext();
    const {setActiveView} = useActiveView();
    const navigate = useNavigate();

    const openTable = () => {
        if (props.value) {
            navigate("/", {replace: false});
            useFilter(props.field, [props.value]);
            setActiveView(View.TABLE);
        }
    }

    return (
        <Button
            title={t("page.navigation.showTable")}
            px={"xs"}
            size={props.size || "sm"}
            variant={"subtle"}
            onClick={openTable}
            style={{ flexShrink: 0 }}
        >
            <TbTableSpark size={IconSize.get(props?.size || "sm")}/>
        </Button>
    );
}

export default TableLink;

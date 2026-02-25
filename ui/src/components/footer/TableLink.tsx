import React, {ReactNode} from 'react';
import {Button} from "@mantine/core";
import {View} from "../../context/ActiveViewContext.tsx";
import {useDataContext} from "../../hooks/useDataContext.tsx";
import {useActiveView} from "../../hooks/useActiveView.tsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from 'react-i18next';

interface Properties {
    field: string;
    value: string;
    size?: string;
    replace?: boolean;
    children?: ReactNode;
}

const TableLink: React.FC<Properties> = (props) => {

    const {t} = useTranslation();
    const {useFilter, replaceFilters} = useDataContext();
    const {setActiveView} = useActiveView();
    const navigate = useNavigate();

    const openTable = () => {
        if (props.value) {
            navigate("/", {replace: true});
            setActiveView(View.TABLE);

            if (props.replace) {
                replaceFilters([{field: props.field, value: props.value}]);
                return;
            }
            useFilter({field: props.field, value: props.value});
        }
    }

    return (
        <Button
            title={t("page.navigation.showTable")}
            px={0}
            size={props.size || "sm"}
            variant={"transparent"}
            onClick={openTable}
            style={{borderRadius: 0}}
        >
            {props.children}
        </Button>
    );
}

export default TableLink;

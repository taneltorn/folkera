import React from "react";
import {useDataContext} from "../../../../hooks/useDataContext.tsx";
import {Size} from "../../../../utils/constants.ts";
import {useTranslation} from "react-i18next";
import {Tune} from "../../../../model/Tune.ts";
import {BiColumns} from "react-icons/bi";
import {fields} from "../../../../utils/fields.ts";
import AdvancedMenu from "../../../../components/AdvancedMenu.tsx";
import CheckMark from "../../../../components/CheckMark.tsx";
import {useAuth} from "../../../../hooks/useAuth.tsx";

const VisibleFieldsSelector: React.FC = () => {

    const {t} = useTranslation();
    const {currentUser} = useAuth();
    const {visibleFields, toggleField} = useDataContext();

    const getOptions = () => {
        return fields
            .filter(f => currentUser?.isAdmin || !f.technical)
            .map(f => f.field)
            .map(it => ({
                label: t(`tune.${it}`),
                value: it,
                rightSection: <CheckMark show={visibleFields.includes(it as keyof Tune)}/>,
                onClick: () => toggleField(it as keyof Tune)
            }));
    }

    const items = getOptions();

    return (
        <AdvancedMenu
            target={t("page.tunes.controls.visibleFields")}
            leftSection={<BiColumns size={Size.icon.MD}/>}
            closeOnItemClick={false}
            items={items}
        />
    );
}

export default VisibleFieldsSelector;

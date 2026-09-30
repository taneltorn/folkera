import React from "react";
import {Alert} from "@mantine/core";
import {useTranslation} from "react-i18next";

import {Size} from "../utils/constants.ts";
import {FaInfo} from "react-icons/fa";

const PrototypeAlert: React.FC = () => {

    const {t} = useTranslation();

    return (
        <Alert
            mb={"md"}
            variant="light"
            color="blue"
            title={t("page.identify.alert")}
            icon={<FaInfo size={Size.icon.MD}/>}
        />
    );
};

export default PrototypeAlert;

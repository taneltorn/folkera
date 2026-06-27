import React from "react";
import {useTranslation} from "react-i18next";
import {useForm} from "@mantine/form";
import {Tune} from "../../../../model/Tune.ts";
import {BulkModifyFields} from "../../../../model/BulkModifyFields.ts";
import FormInput from "../../../../components/form/FormInput.tsx";
import StandardFormControls from "../../../admin/notifications/components/StandardFormControls.tsx";

interface Properties {
    selection: Tune[];
    onSubmit: (values: BulkModifyFields) => void;
    onCancel: () => void;
}


const BulkModifyTunesForm: React.FC<Properties> = ({onSubmit, onCancel}) => {

    const {t} = useTranslation();

    const form = useForm<BulkModifyFields>({
        mode: 'uncontrolled',
        initialValues: {
            melody: "",
            trainset: "",
        },
        validate: {},
    });


    return (
        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
            <FormInput
                name={"melody"}
                type={"text"}
                label={t("tune.melody")}
                placeholder={t("tune.melody")}
                form={form}
            />

            <FormInput
                name={"trainset"}
                type={"select"}
                label={t("tune.trainset")}
                placeholder={t("tune.trainset")}
                options={[
                    {value: "", label: ""},
                    {value: "TR", label: "TR"},
                    {value: "TE", label: "TE"},
                ]}
                form={form}
            />

            <StandardFormControls onCancel={onCancel}/>
        </form>
    );
}

export default BulkModifyTunesForm;

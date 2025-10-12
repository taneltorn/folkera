import React from "react";
import {UseFormReturnType} from "@mantine/form";
import {Input, Textarea, TextInput} from "@mantine/core";
import {DateTimePicker} from "@mantine/dates";

interface Properties {
    name: string;
    label: string;
    type: "text" | "textarea" | "datetime" | "select";
    placeholder?: string;
    form: UseFormReturnType<any>;
}

const FormInput: React.FC<Properties> = ({form, type, name, label, placeholder}) => {

    return (
        <Input.Wrapper
            mb={"md"}
            label={label}
            labelProps={{ms: "xs", fw: "bold"}}
        >
            {type === "text" &&
                <TextInput
                    placeholder={placeholder}
                    key={form.key(name)}
                    size={"md"}
                    {...form.getInputProps(name)}
                />}
            {type === "textarea" &&
                <Textarea
                    placeholder={placeholder}
                    rows={4}
                    key={form.key(name)}
                    size={"md"}
                    {...form.getInputProps(name)}
                />}
            {type === "datetime" &&
                <DateTimePicker
                    locale={"et"}
                    valueFormat={"DD.MM.YYYY HH:mm"}
                    clearable
                    placeholder={placeholder}
                    key={form.key(name)}
                    size={"md"}
                    timePickerProps={{
                        format: '24h',
                    }}
                    {...form.getInputProps(name)}
                />}
        </Input.Wrapper>
    );
}

export default FormInput;

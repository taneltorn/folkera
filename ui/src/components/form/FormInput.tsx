import React from "react";
import {UseFormReturnType} from "@mantine/form";
import {
    Input,
    MantineRadius,
    MantineSize,
    PasswordInput,
    Radio,
    Select,
    Switch,
    Textarea,
    TextInput
} from "@mantine/core";
import {DateTimePicker} from "@mantine/dates";

interface Properties {
    name: string;
    label: string;
    radius?: MantineRadius;
    size?: MantineSize;
    type: "text" | "textarea" | "datetime" | "select" | "password" | "radio" | "switch";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
    form: UseFormReturnType<any>;
}

const FormInput: React.FC<Properties> = ({form, type, size, name, radius, label, options, placeholder}) => {

    return (
        <Input.Wrapper
            mb={"md"}
            label={label}
            labelProps={{mb: 4, fw: "bold"}}
        >
            {type === "text" &&
                <TextInput
                    placeholder={placeholder}
                    key={form.key(name)}
                    variant={"filled"}
                    size={size || "md"}
                    radius={radius}
                    {...form.getInputProps(name)}
                />}
            {type === "switch" &&
                <Switch
                    key={form.key(name)}
                    {...form.getInputProps(name, {type: "checkbox"})}
                />}
            {type === "radio" &&
                <Radio.Group
                    key={form.key(name)}
                    size={size || "md"}
                    {...form.getInputProps(name)}
                >
                    {options?.map((option) => (
                        <Radio mt={"xs"} value={option.value} label={option.label} key={option.value}/>
                    ))}
                </Radio.Group>}

            {type === "password" &&
                <PasswordInput
                    type={"password"}
                    radius={radius}
                    variant={"filled"}
                    placeholder={placeholder}
                    key={form.key(name)}
                    size={size || "md"}
                    {...form.getInputProps(name)}
                />}

            {type === "textarea" &&
                <Textarea
                    placeholder={placeholder}
                    variant={"filled"}
                    rows={4}
                    key={form.key(name)}
                    size={size || "md"}
                    {...form.getInputProps(name)}
                />}
            
            {type === "datetime" &&
                <DateTimePicker
                    locale={"et"}
                    valueFormat={"DD.MM.YYYY HH:mm"}
                    variant={"filled"}
                    clearable
                    placeholder={placeholder}
                    key={form.key(name)}
                    size={size || "md"}
                    timePickerProps={{
                        format: '24h',
                    }}
                    {...form.getInputProps(name)}
                />}
            
            {type === "select" &&
                <Select
                    placeholder={placeholder}
                    variant={"filled"}
                    key={form.key(name)}
                    size={size || "md"}
                    clearable
                    data={options || []}
                    {...form.getInputProps('trainset')}
                />}
        </Input.Wrapper>
    );
}

export default FormInput;

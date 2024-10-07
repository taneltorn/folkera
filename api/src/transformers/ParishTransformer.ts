import DataTransformer from "./DataTransformer";

class ParishTransformer extends DataTransformer {

    transform = (value: string) => {
        const values: string[] = [];
        value.split(",").forEach((it: string) => {
            values.push(it.split("<")[0].trim());
        });

        return values;
    }
}

export default ParishTransformer;

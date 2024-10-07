import DataTransformer from "../transformers/DataTransformer";
import ParishTransformer from "../transformers/ParishTransformer";
import NumberTransformer from "../transformers/NumberTransformer";

class DataTransformerFactory {

    private static transformers = new Map<string, DataTransformer>([
        ["base", new DataTransformer()],
        ["parish", new ParishTransformer()],
        ["number", new NumberTransformer()],
    ]);

    static create = <T extends DataTransformer = DataTransformer>(name: string): T => {
        return (DataTransformerFactory.transformers.get(name) as T) || (new DataTransformer() as T);
    }
}

export default DataTransformerFactory;
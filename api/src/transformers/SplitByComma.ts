import DataTransformer from "./DataTransformer";

class SplitByComma extends DataTransformer {

    transform = (value: string): string[] => {
        return value.split(",").map(v => v.trim());
    }
}

export default SplitByComma;

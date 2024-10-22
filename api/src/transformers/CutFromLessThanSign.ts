import DataTransformer from "./DataTransformer";

class CutAfterParentheses extends DataTransformer {

    transform = (value: string): string[] => {
        return [value.split("<")[0].trim()];
    }
}

export default CutAfterParentheses;

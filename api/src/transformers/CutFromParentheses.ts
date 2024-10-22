import DataTransformer from "./DataTransformer";

class CutFromParentheses extends DataTransformer {

    transform = (value: string): string[] => {
        return [value.split("(")[0].trim()];
    }
}

export default CutFromParentheses;

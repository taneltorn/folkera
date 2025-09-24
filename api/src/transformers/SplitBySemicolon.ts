import DataTransformer from "./DataTransformer";

class SplitBySemicolon extends DataTransformer {

    transform = (value: string): string[] => {
        return value.split(";").map(v => v.trim());
    }
}

export default SplitBySemicolon;

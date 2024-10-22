import DataTransformer from "../transformers/DataTransformer";
import SplitByComma from "../transformers/SplitByComma";
import CutFromParentheses from "../transformers/CutFromParentheses";
import CutFromLessThanSign from "../transformers/CutFromLessThanSign";
import ParishToCounty from "../transformers/ParishToCounty";

class DataTransformerFactory {

    transformers = new Map<string, DataTransformer>([
        ["SplitByComma", new SplitByComma()],
        ["CutFromParentheses", new CutFromParentheses()],
        ["CutFromLessThanSign", new CutFromLessThanSign()],
        ["ParishToCounty", new ParishToCounty()],
    ]);

    get = <T extends DataTransformer = DataTransformer>(name: string): T => {
        return (this.transformers.get(name) as T) || (new DataTransformer() as T);
    }
}

export default DataTransformerFactory;
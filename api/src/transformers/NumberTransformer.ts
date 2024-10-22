import DataTransformer from "./DataTransformer";

class NumberTransformer extends DataTransformer {

    private generateRange = (start: number, end: number): number[] => {
        const range: number[] = [];
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
        return range;
    }

    // transform = (value: string) => {
    //     // const values: string[] = [];
    //     // value.split(",").forEach((it: string) => {
    //     //     if (it.includes("-")) {
    //     //         const [start, end] = it.split("-").map(v => Number.parseInt(v.trim()));
    //     //         const range: string[] = this.generateRange(start, end).map(v => `${v}`);
    //     //         values.push(...range);
    //     //     } else {
    //     //         values.push(it.trim());
    //     //     }
    //     //
    //     // });
    //
    //     return value;
    // }
}

export default NumberTransformer;

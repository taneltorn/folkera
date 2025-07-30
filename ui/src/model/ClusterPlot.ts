export interface ClusterPlot {
    name: string;
    version: string;
    file: string;
    testFile: string;
    mAP: number;
    rank1: number;
    works: number | undefined;
    perfs: number | undefined;
    testWorks: number;
    testPerfs: number;
    newWorks?: string[];
}
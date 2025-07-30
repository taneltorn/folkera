export interface ClusterPlot {
    name: string;
    version: string;
    file: string;
    testFile: string;
    mAP: number;
    rank1: number;
    works: number | string;
    perfs: number | string;
    testWorks: number | string;
    testPerfs: number | string;
    newWorks?: string[];
}
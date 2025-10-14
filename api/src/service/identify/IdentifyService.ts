interface IdentifyService {
    identify: (file: string, top?: number, selfRef?: string, dataset?: string) => Promise<any>
}

export default IdentifyService;

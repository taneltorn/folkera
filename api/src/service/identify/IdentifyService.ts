interface IdentifyService {
    identify: (file: string, top?: number, selfRef?: string) => Promise<any>
}

export default IdentifyService;

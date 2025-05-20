interface IdentifyService {
    identify: (file: string, top?: number, skipFirstResult?: string) => Promise<any>
}

export default IdentifyService;

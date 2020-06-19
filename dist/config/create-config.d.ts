export interface CreateConfig {
    headless?: boolean;
    devtools?: boolean;
    useChrome?: boolean;
    debug?: boolean;
    browserArgs?: string[];
    logQR?: boolean;
    refreshQR?: number;
}
export declare const defaultOptions: CreateConfig;

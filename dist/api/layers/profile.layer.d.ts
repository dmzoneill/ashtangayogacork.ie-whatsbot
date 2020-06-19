import { Page } from 'puppeteer';
import { HostLayer } from './host.layer';
export declare class ProfileLayer extends HostLayer {
    page: Page;
    constructor(page: Page);
    /**
     * Sets current user profile status
     * @param status
     */
    setProfileStatus(status: string): Promise<void>;
    /**
     * Sets current user profile name
     * @param name
     */
    setProfileName(name: string): Promise<void>;
}

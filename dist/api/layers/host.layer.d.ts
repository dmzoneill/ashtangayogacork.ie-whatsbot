import { Page } from 'puppeteer';
import { HostDevice } from '../model';
import { SocketState } from '../model/enum';
export declare class HostLayer {
    page: Page;
    constructor(page: Page);
    /**
     * @returns Current host device details
     */
    getHostDevice(): Promise<HostDevice>;
    /**
     * Retrieves WA version
     */
    getWAVersion(): Promise<string>;
    /**
     * Retrieves the connecction state
     */
    getConnectionState(): Promise<SocketState>;
    /**
     * Retrieves if the phone is online. Please note that this may not be real time.
     */
    isConnected(): Promise<boolean>;
    /**
     * Retrieves Battery Level
     */
    getBatteryLevel(): Promise<number>;
}

import { Page } from 'puppeteer';
import { CreateConfig } from '../config/create-config';
export declare function initWhatsapp(session: string, options: CreateConfig): Promise<Page>;
export declare function injectApi(page: Page): Promise<Page>;

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChromeLauncher = require("chrome-launcher");
var path = require("path");
var puppeteer_extra_1 = require("puppeteer-extra");
var puppeteer_config_1 = require("../config/puppeteer.config");
var StealthPlugin = require("puppeteer-extra-plugin-stealth");
function initWhatsapp(session, options) {
    return __awaiter(this, void 0, void 0, function () {
        var browser, waPage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, initBrowser(session, options)];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, getWhatsappPage(browser)];
                case 2:
                    waPage = _a.sent();
                    return [4 /*yield*/, waPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, waPage.goto(puppeteer_config_1.puppeteerConfig.whatsappUrl)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, waPage];
            }
        });
    });
}
exports.initWhatsapp = initWhatsapp;
function injectApi(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForFunction(function () {
                        // @ts-ignore
                        return webpackJsonp !== undefined;
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.addScriptTag({
                            path: require.resolve(path.join(__dirname, '../lib/wapi', 'wapi.js')),
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.addScriptTag({
                            path: require.resolve(path.join(__dirname, '../lib/middleware', 'middleware.js')),
                        })];
                case 3:
                    _a.sent();
                    // Make sure WAPI is initialized
                    return [4 /*yield*/, page.waitForFunction(function () {
                            // @ts-ignore
                            return !!WAPI.getWAVersion;
                        })];
                case 4:
                    // Make sure WAPI is initialized
                    _a.sent();
                    return [2 /*return*/, page];
            }
        });
    });
}
exports.injectApi = injectApi;
/**
 * Initializes browser, will try to use chrome as default
 * @param session
 */
function initBrowser(session, options, extras) {
    if (extras === void 0) { extras = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var chromePath, browser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (options.useChrome) {
                        chromePath = getChrome();
                        if (chromePath) {
                            extras = __assign(__assign({}, extras), { executablePath: chromePath });
                        }
                        else {
                            console.log('Chrome not found, using chromium');
                            extras = {};
                        }
                    }
                    // Use stealth plugin to avoid being detected as a bot
                    puppeteer_extra_1.default.use(StealthPlugin());
                    return [4 /*yield*/, puppeteer_extra_1.default.launch(__assign({ 
                            // headless: true,
                            headless: options.headless, devtools: options.devtools, userDataDir: path.join(process.cwd(), session), args: options.browserArgs
                                ? options.browserArgs
                                : __spreadArrays(puppeteer_config_1.puppeteerConfig.chroniumArgs) }, extras))];
                case 1:
                    browser = _a.sent();
                    return [2 /*return*/, browser];
            }
        });
    });
}
function getWhatsappPage(browser) {
    return __awaiter(this, void 0, void 0, function () {
        var pages;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, browser.pages()];
                case 1:
                    pages = _a.sent();
                    console.assert(pages.length > 0);
                    return [2 /*return*/, pages[0]];
            }
        });
    });
}
/**
 * Retrieves chrome instance path
 */
function getChrome() {
    try {
        var chromeInstalations = ChromeLauncher.Launcher.getInstallations();
        return chromeInstalations[0];
    }
    catch (error) {
        return undefined;
    }
}

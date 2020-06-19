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
Object.defineProperty(exports, "__esModule", { value: true });
var latest_version_1 = require("latest-version");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var whatsapp_1 = require("../api/whatsapp");
var create_config_1 = require("../config/create-config");
var semver_1 = require("../utils/semver");
var auth_1 = require("./auth");
var browser_1 = require("./browser");
var chalk = require("chalk");
var boxen = require("boxen");
var version = require('../../package.json').version;
var path = require("path");
// Global
var updatesChecked = false;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
/**
 * Should be called to initialize whatsapp client
 */
function create(session, catchQR, options) {
    if (session === void 0) { session = 'session'; }
    return __awaiter(this, void 0, void 0, function () {
        var attempts, mergedOptions, waPage, tryInitWhatsApp, e_1, authenticated, currentCode_1, login, tryInject, e_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Check for updates if needed
                    if (!updatesChecked) {
                        //spinnies.add('sulla-version-spinner', { text: 'Checking for updates...' });
                        //checkSullaVersion(spinnies);
                        updatesChecked = true;
                    }
                    attempts = 0;
                    mergedOptions = __assign(__assign({}, create_config_1.defaultOptions), options);
                    waPage = null;
                    tryInitWhatsApp = true;
                    _a.label = 1;
                case 1:
                    if (!tryInitWhatsApp) return [3 /*break*/, 10];
                    attempts++;
                    if (!(attempts < 5)) return [3 /*break*/, 8];
                    console.log(session + ": Creating whatsapp instace");
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, browser_1.initWhatsapp(session, mergedOptions)];
                case 3:
                    waPage = _a.sent();
                    tryInitWhatsApp = false;
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _a.sent();
                    console.log(session + ": InitWhatsapp error - " + e_1.toString());
                    return [3 /*break*/, 5];
                case 5:
                    if (!tryInitWhatsApp) return [3 /*break*/, 7];
                    return [4 /*yield*/, sleep(5000)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8: throw 'Error creating whatsapp';
                case 9: return [3 /*break*/, 1];
                case 10:
                    console.log(session + ": Authenticating");
                    return [4 /*yield*/, auth_1.isAuthenticated(waPage)];
                case 11:
                    authenticated = _a.sent();
                    if (!authenticated) return [3 /*break*/, 12];
                    // Wait til inside chat
                    //await isInsideChat(waPage).toPromise();
                    console.log(session + ": Authenticated");
                    return [3 /*break*/, 14];
                case 12:
                    currentCode_1 = '';
                    login = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var check, result, codes, e_3, element, e_4;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    check = true;
                                    result = false;
                                    _a.label = 1;
                                case 1:
                                    if (!check) return [3 /*break*/, 18];
                                    codes = { code: null, data: null };
                                    _a.label = 2;
                                case 2:
                                    _a.trys.push([2, 6, , 7]);
                                    return [4 /*yield*/, waPage.waitForSelector('canvas', { timeout: 2000 })];
                                case 3:
                                    _a.sent();
                                    return [4 /*yield*/, waPage.addScriptTag({
                                            path: require.resolve(path.join(__dirname, '../lib/jsQR', 'jsQR.js')),
                                        })];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, waPage.evaluate(function () {
                                            var canvas = document.querySelector('canvas');
                                            var context = canvas.getContext('2d');
                                            // @ts-ignore
                                            var code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
                                            return { code: code.data, data: canvas.toDataURL() };
                                        })];
                                case 5:
                                    codes = _a.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    e_3 = _a.sent();
                                    codes = { code: null, data: null };
                                    return [3 /*break*/, 7];
                                case 7:
                                    if (!(codes.data == currentCode_1)) return [3 /*break*/, 14];
                                    _a.label = 8;
                                case 8:
                                    _a.trys.push([8, 12, , 13]);
                                    return [4 /*yield*/, waPage.waitForXPath("//div[contains(text(), 'Click to reload QR code')]", { timeout: 10000 })];
                                case 9:
                                    element = _a.sent();
                                    if (!element) return [3 /*break*/, 11];
                                    return [4 /*yield*/, element.click()];
                                case 10:
                                    _a.sent();
                                    _a.label = 11;
                                case 11: return [3 /*break*/, 13];
                                case 12:
                                    e_4 = _a.sent();
                                    return [3 /*break*/, 13];
                                case 13: return [3 /*break*/, 17];
                                case 14:
                                    currentCode_1 = codes.data;
                                    return [4 /*yield*/, catchQR(codes.data, '')];
                                case 15:
                                    check = _a.sent();
                                    if (!check) return [3 /*break*/, 17];
                                    return [4 /*yield*/, rxjs_1.from(waPage
                                            .waitForFunction("\n                  (document.getElementsByClassName('app')[0] &&\n                  document.getElementsByClassName('app')[0].attributes &&\n                  !!document.getElementsByClassName('app')[0].attributes.tabindex) || \n                  (document.getElementsByClassName('two')[0] && \n                  document.getElementsByClassName('two')[0].attributes && \n                  !!document.getElementsByClassName('two')[0].attributes.tabindex)\n              ", {
                                            timeout: 20000,
                                        })
                                            .then(function () { return true; })
                                            .catch(function () { return false; })).toPromise()];
                                case 16:
                                    result = _a.sent();
                                    if (result)
                                        check = false;
                                    _a.label = 17;
                                case 17: return [3 /*break*/, 1];
                                case 18:
                                    if (!result) return [3 /*break*/, 19];
                                    resolve();
                                    return [3 /*break*/, 23];
                                case 19: return [4 /*yield*/, waPage.close()];
                                case 20:
                                    _a.sent();
                                    if (!waPage.browser) return [3 /*break*/, 22];
                                    return [4 /*yield*/, waPage.browser().close()];
                                case 21:
                                    _a.sent();
                                    waPage.browser().process().kill();
                                    _a.label = 22;
                                case 22:
                                    reject('LoginCanceled');
                                    _a.label = 23;
                                case 23: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, login];
                case 13:
                    _a.sent();
                    console.log(session + ": Authenticated");
                    _a.label = 14;
                case 14:
                    attempts = 0;
                    tryInject = true;
                    _a.label = 15;
                case 15:
                    if (!tryInject) return [3 /*break*/, 24];
                    attempts++;
                    if (!(attempts < 5)) return [3 /*break*/, 22];
                    console.log(session + ": Try Injecting api");
                    _a.label = 16;
                case 16:
                    _a.trys.push([16, 18, , 19]);
                    return [4 /*yield*/, browser_1.injectApi(waPage)];
                case 17:
                    waPage = _a.sent();
                    tryInject = false;
                    return [3 /*break*/, 19];
                case 18:
                    e_2 = _a.sent();
                    console.log(session + ": Injecting api error - " + e_2.toString());
                    return [3 /*break*/, 19];
                case 19:
                    if (!tryInject) return [3 /*break*/, 21];
                    return [4 /*yield*/, sleep(5000)];
                case 20:
                    _a.sent();
                    _a.label = 21;
                case 21: return [3 /*break*/, 23];
                case 22: throw 'Error Try Injecting api';
                case 23: return [3 /*break*/, 15];
                case 24:
                    console.log(session + ": Injected");
                    return [2 /*return*/, new whatsapp_1.Whatsapp(waPage)];
            }
        });
    });
}
exports.create = create;
function grabQRUntilInside(waPage, options, session, catchQR) {
    console.log('A:1');
    var isInside = auth_1.isInsideChat(waPage);
    console.log('A:2');
    rxjs_1.timer(0, options.refreshQR)
        .pipe(operators_1.takeUntil(isInside), operators_1.switchMap(function () { return auth_1.retrieveQR(waPage); }))
        .subscribe(function (_a) {
        var data = _a.data, asciiQR = _a.asciiQR;
        console.log('A:3');
        if (catchQR) {
            catchQR(data, asciiQR);
        }
        if (options.logQR) {
            console.clear();
            console.log("Scan QR for: " + session + "                ");
            console.log(asciiQR);
        }
    });
    console.log('A:4');
}
/**
 * Checs for a new versoin of sulla and logs
 */
function checkSullaVersion(spinnies) {
    latest_version_1.default('sulla').then(function (latest) {
        if (!semver_1.upToDate(version, latest)) {
            logUpdateAvailable(version, latest);
        }
        spinnies.succeed('sulla-version-spinner', { text: 'Checking for updates' });
    });
}
/**
 * Logs a boxen of instructions to update
 * @param current
 * @param latest
 */
function logUpdateAvailable(current, latest) {
    // prettier-ignore
    var newVersionLog = "There is a new version of " + chalk.bold("sulla") + " " + chalk.gray(current) + " \u279C  " + chalk.bold.green(latest) + "\n" +
        "Update your package by running:\n\n" +
        (chalk.bold('\>') + " " + chalk.blueBright('npm update sulla'));
    console.log(boxen(newVersionLog, { padding: 1 }));
    console.log("For more info visit: " + chalk.underline('https://github.com/danielcardeenas/sulla/blob/master/UPDATES.md') + "\n");
}

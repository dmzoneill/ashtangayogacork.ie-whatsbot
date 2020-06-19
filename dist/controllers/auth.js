"use strict";
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
var path = require("path");
var qrcode = require("qrcode-terminal");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Validates if client is authenticated
 * @returns true if is authenticated, false otherwise
 * @param waPage
 */
exports.isAuthenticated = function (waPage) {
    return rxjs_1.merge(exports.needsToScan(waPage), exports.isInsideChat(waPage))
        .pipe(operators_1.take(1))
        .toPromise();
};
exports.needsToScan = function (waPage) {
    return rxjs_1.from(waPage
        .waitForSelector('body > div > div > .landing-wrapper', {
        timeout: 0,
    })
        .then(function () { return false; }));
};
exports.isInsideChat = function (waPage) {
    return rxjs_1.from(waPage
        .waitForFunction("\n        (document.getElementsByClassName('app')[0] &&\n        document.getElementsByClassName('app')[0].attributes &&\n        !!document.getElementsByClassName('app')[0].attributes.tabindex) || \n        (document.getElementsByClassName('two')[0] && \n        document.getElementsByClassName('two')[0].attributes && \n        !!document.getElementsByClassName('two')[0].attributes.tabindex)\n        ", {
        timeout: 0,
    })
        .then(function () { return true; }));
};
function retrieveQR(page) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, code, data, asciiQR;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, decodeQR(page)];
                case 1:
                    _a = _b.sent(), code = _a.code, data = _a.data;
                    return [4 /*yield*/, asciiQr(code)];
                case 2:
                    asciiQR = _b.sent();
                    return [2 /*return*/, { code: code, data: data, asciiQR: asciiQR }];
            }
        });
    });
}
exports.retrieveQR = retrieveQR;
function asciiQr(code) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    qrcode.generate(code, { small: true }, function (qrcode) {
                        resolve(qrcode);
                    });
                })];
        });
    });
}
function decodeQR(page) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, page.waitForSelector('canvas', { timeout: 0 })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, page.addScriptTag({
                            path: require.resolve(path.join(__dirname, '../lib/jsQR', 'jsQR.js')),
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function () {
                            var canvas = document.querySelector('canvas');
                            var context = canvas.getContext('2d');
                            // @ts-ignore
                            var code = jsQR(context.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height);
                            return { code: code.data, data: canvas.toDataURL() };
                        })];
                case 3: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

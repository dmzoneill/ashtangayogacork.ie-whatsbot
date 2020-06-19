"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sleep async function
 * @param time
 */
function sleep(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
exports.sleep = sleep;

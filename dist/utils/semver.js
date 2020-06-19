"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VPAT = /^\d+(\.\d+){0,2}$/;
/**
 * Compares two versions
 * @return true if local is up to date, false otherwise
 * @param local
 * @param remote
 */
function upToDate(local, remote) {
    if (!local || !remote || local.length === 0 || remote.length === 0)
        return false;
    if (local == remote)
        return true;
    if (VPAT.test(local) && VPAT.test(remote)) {
        var lparts = local.split('.');
        while (lparts.length < 3)
            lparts.push('0');
        var rparts = remote.split('.');
        while (rparts.length < 3)
            rparts.push('0');
        for (var i = 0; i < 3; i++) {
            var l = parseInt(lparts[i], 10);
            var r = parseInt(rparts[i], 10);
            if (l === r)
                continue;
            return l > r;
        }
        return true;
    }
    else {
        return local >= remote;
    }
}
exports.upToDate = upToDate;

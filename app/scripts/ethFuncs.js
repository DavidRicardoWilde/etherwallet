'use strict';
var moacFuncs = function() {}
moacFuncs.gasAdjustment = 40;
moacFuncs.validateMoacAddress = function(address) {
    if (address.substring(0, 2) != "0x") return false;
    else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) return false;
    else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) return true;
    else
        return this.isChecksumAddress(address);
}
moacFuncs.isChecksumAddress = function(address) {
    return address == ethUtil.toChecksumAddress(address);
}
moacFuncs.validateHexString = function(str) {
    if (str == "") return true;
    str = str.substring(0, 2) == '0x' ? str.substring(2).toUpperCase() : str.toUpperCase();
    var re = /^[0-9A-F]+$/g;
    return re.test(str);
}
moacFuncs.sanitizeHex = function(hex) {
    hex = hex.substring(0, 2) == '0x' ? hex.substring(2) : hex;
    if (hex == "") return "";
    return '0x' + this.padLeftEven(hex);
}
moacFuncs.trimHexZero = function(hex) {
    if (hex == "0x00" || hex == "0x0") return "0x0";
    hex = this.sanitizeHex(hex);
    hex = hex.substring(2).replace(/^0+/, '');
    return '0x' + hex;
}
moacFuncs.padLeftEven = function(hex) {
    hex = hex.length % 2 != 0 ? '0' + hex : hex;
    return hex;
}
moacFuncs.addTinyMoreToGas = function(hex) {
    hex = this.sanitizeHex(hex);
    return new BigNumber(moacFuncs.gasAdjustment * moacUnits.getValueOfUnit('gsha')).toString(16);
}
moacFuncs.decimalToHex = function(dec) {
    return new BigNumber(dec).toString(16);
}
moacFuncs.hexToDecimal = function(hex) {
    return new BigNumber(this.sanitizeHex(hex)).toString();
}
moacFuncs.contractOutToArray = function(hex) {
    hex = hex.replace('0x', '').match(/.{64}/g);
    for (var i = 0; i < hex.length; i++) {
        hex[i] = hex[i].replace(/^0+/, '');
        hex[i] = hex[i] == "" ? "0" : hex[i];
    }
    return hex;
}
moacFuncs.getNakedAddress = function(address) {
    return address.toLowerCase().replace('0x', '');
}
moacFuncs.getDeteministicContractAddress = function(address, nonce) {
    nonce = new BigNumber(nonce).toString();
    address = address.substring(0, 2) == '0x' ? address : '0x' + address;
    return '0x' + ethUtil.generateAddress(address, nonce).toString('hex');
}
moacFuncs.padLeft = function(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
moacFuncs.getDataObj = function(to, func, arrVals) {
    var val = "";
    for (var i = 0; i < arrVals.length; i++) val += this.padLeft(arrVals[i], 64);
    return {
        to: to,
        data: func + val
    };
}
moacFuncs.getFunctionSignature = function(name) {
    return ethUtil.sha3(name).toString('hex').slice(0, 8);
};
moacFuncs.estimateGas = function(dataObj, callback) {
    var adjustGas = function(gasLimit) {
        if (gasLimit == "0x5209") return "21000";
        if (new BigNumber(gasLimit).gt(4000000)) return "-1";
        return new BigNumber(gasLimit).toString();
    }
    ajaxReq.getEstimatedGas(dataObj, function(data) {
        if (data.error) {
            callback(data);
            return;
        } else {
            callback({
                "error": false,
                "msg": "",
                "data": adjustGas(data.data)
            });
        }
    });
}
module.exports = moacFuncs;

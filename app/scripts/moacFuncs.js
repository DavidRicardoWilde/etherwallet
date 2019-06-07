'use strict';
var moacFuncs = function() {}
moacFuncs.gasAdjustment = 40;
//MOAC address is the same as ETH address.
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
    return new BigNumber(moacFuncs.gasAdjustment * etherUnits.getValueOfUnit('gwei')).toString(16);
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
//Sign the rawTX with input private key
moacFuncs.signTransaction = function (tx, privateKey) {

    //Check the input fiels of the tx
          if (tx.chainId < 1) {
              return new Error('"Chain ID" is invalid');
          }
  
          if (!tx.gas && !tx.gasLimit) {
             return new Error('"gas" is missing');
          }
  
          if (tx.nonce  < 0 ||
              tx.gasLimit  < 0 ||
              tx.gasPrice  < 0 ||
              tx.chainId  < 0) {
              return new Error('Gas, gasPrice, nonce or chainId is lower than 0');
          }
  
  
          //Sharding Flag only accept the 
          //If input has not sharding flag, set it to 0 as global TX.
          if (tx.shardingFlag == undefined){
              // console.log("Set default sharding to 0");
              tx.shardingFlag = 0;
          }
  
          // if (tx.shardingFlag != 0 && tx.shardingFlag != 1){
          //     return new Error('"Sharding Flag" is invalid');
          // }
  
          try {
              //Make sure all the number fields are in HEX format
  
              var transaction = tx;
              transaction.to = tx.to || '0x';//Can be zero, for contract creation
              transaction.data = tx.data || '0x';//can be zero for general TXs
              transaction.value = tx.value || '0x';//can be zero for contract call
              transaction.chainId = tx.chainId;//ethUtil.numberToHex(tx.chainId);
              transaction.shardingFlag = tx.shardingFlag;//ethUtil.numberToHex(tx.shardingFlag);
              transaction.systemContract = '0x';//System contract flag, always = 0
              transaction.via = tx.via || '0x'; //Sharding subchain address
  
              //Encode the TX for signature
              //   type txdata struct {
              // AccountNonce uint64          `json:"nonce"    gencodec:"required"`
              // SystemContract uint64          `json:"syscnt" gencodec:"required"`
              // Price        *big.Int        `json:"gasPrice" gencodec:"required"`
              // GasLimit     *big.Int        `json:"gas"      gencodec:"required"`
              // Recipient    *common.Address `json:"to"       rlp:"nil"` // nil means contract creation
              // Amount       *big.Int        `json:"value"    gencodec:"required"`
              // Payload      []byte          `json:"input"    gencodec:"required"`
              // ShardingFlag uint64 `json:"shardingFlag" gencodec:"required"`
              // Via            *common.Address `json:"to"       rlp:"nil"`
  
              // // Signature values
              // V *big.Int `json:"v" gencodec:"required"`
              // R *big.Int `json:"r" gencodec:"required"`
              // S *big.Int `json:"s" gencodec:"required"`
  
              var rlpEncoded = ethUtil.rlp.encode([
                  Bytes.fromNat(transaction.nonce),
                  Bytes.fromNat(transaction.systemContract),
                  Bytes.fromNat(transaction.gasPrice),
                  Bytes.fromNat(transaction.gasLimit),
                  transaction.to.toLowerCase(),
                  Bytes.fromNat(transaction.value),
                  transaction.data,
                  Bytes.fromNat(transaction.shardingFlag),
                  transaction.via.toLowerCase(),
                  Bytes.fromNat(transaction.chainId || "0x1"),
                  "0x",
                  "0x"]);
  
            //   var hash = Hash.keccak256(rlpEncoded);
  
              var hash2 = ethUtil.rlphash([
                Bytes.fromNat(transaction.nonce),
                Bytes.fromNat(transaction.systemContract),
                Bytes.fromNat(transaction.gasPrice),
                Bytes.fromNat(transaction.gasLimit),
                transaction.to.toLowerCase(),
                Bytes.fromNat(transaction.value),
                transaction.data,
                Bytes.fromNat(transaction.shardingFlag),
                transaction.via.toLowerCase(),
                Bytes.fromNat(transaction.chainId || "0x1"),
                "0x",
                "0x"]);

              // for MOAC, keep 9 fields instead of 6
              var vPos = 9;
              //Sign the hash with the private key to produce the
              //V, R, S
              var newsign = ethUtil.ecsign(hash, privateKey);
              var rawTx = ethUtil.rlp.decode(rlpEncoded).slice(0,vPos+3);
  
              //Replace the V field with chainID info
              var newV = newsign.v + 8 + transaction.chainId *2;
  
              // rawTx[vPos] = makeEven(bufferToHex(newsign.v));
              rawTx[vPos] = makeEven(bufferToHex(newV));
              rawTx[vPos+1] = makeEven(bufferToHex(newsign.r));
              rawTx[vPos+2] = makeEven(bufferToHex(newsign.s));
  
              var rawTransaction = rlpEncoded;//RLP.encode(rawTx);
  
  
          } catch(e) {
  
              return e;
          }
  
          return rawTransaction;
    };
module.exports = moacFuncs;

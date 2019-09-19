'use strict';
// const txutil = require('./txutils')//use Ethutils
const fees = {
  "genesisGasLimit": {
    "v": 5000,
    "d": "Gas limit of the Genesis block."
  },
  "genesisDifficulty": {
    "v": 17179869184,
    "d": "Difficulty of the Genesis block."
  },
  "genesisNonce": {
    "v": "0x0000000000000042",
    "d": "the geneis nonce"
  },
  "genesisExtraData": {
    "v": "0x11bbe8db4e347b4e8c937c1c8370e4b5ed33adb3db69cbdb7a38e1e50b1b82fa",
    "d": "extra data "
  },
  "genesisHash": {
    "v": "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
    "d": "genesis hash"
  },
  "genesisStateRoot": {
    "v": "0xd7f8974fb5ac78d9ac099b9ad5018bedc2ce0a72dad1827a1709da30580f0544",
    "d": "the genesis state root"
  },
  "minGasLimit": {
    "v": 5000,
    "d": "Minimum the gas limit may ever be."
  },
  "gasLimitBoundDivisor": {
    "v": 1024,
    "d": "The bound divisor of the gas limit, used in update calculations."
  },
  "minimumDifficulty": {
    "v": 131072,
    "d": "The minimum that the difficulty may ever be."
  },
  "difficultyBoundDivisor": {
    "v": 2048,
    "d": "The bound divisor of the difficulty, used in the update calculations."
  },
  "durationLimit": {
    "v": 13,
    "d": "The decision boundary on the blocktime duration used to determine whether difficulty should go up or not."
  },
  "maximumExtraDataSize": {
    "v": 32,
    "d": "Maximum size extra data may be after Genesis."
  },
  "epochDuration": {
    "v": 30000,
    "d": "Duration between proof-of-work epochs."
  },
  "stackLimit": {
    "v": 1024,
    "d": "Maximum size of VM stack allowed."
  },
  "callCreateDepth": {
    "v": 1024,
    "d": "Maximum depth of call/create stack."
  },

  "tierStepGas": {
    "v": [0, 2, 3, 5, 8, 10, 20],
    "d": "Once per operation, for a selection of them."
  },
  "expGas": {
    "v": 10,
    "d": "Once per EXP instuction."
  },
  "expByteGas": {
    "v": 10,
    "d": "Times ceil(log256(exponent)) for the EXP instruction."
  },

  "sha3Gas": {
    "v": 30,
    "d": "Once per SHA3 operation."
  },
  "sha3WordGas": {
    "v": 6,
    "d": "Once per word of the SHA3 operation's data."
  },
  "sloadGas": {
    "v": 50,
    "d": "Once per SLOAD operation."
  },
  "sstoreSetGas": {
    "v": 20000,
    "d": "Once per SSTORE operation if the zeroness changes from zero."
  },
  "sstoreResetGas": {
    "v": 5000,
    "d": "Once per SSTORE operation if the zeroness does not change from zero."
  },
  "sstoreRefundGas": {
    "v": 15000,
    "d": "Once per SSTORE operation if the zeroness changes to zero."
  },
  "jumpdestGas": {
    "v": 1,
    "d": "Refunded gas, once per SSTORE operation if the zeroness changes to zero."
  },

  "logGas": {
    "v": 375,
    "d": "Per LOG* operation."
  },
  "logDataGas": {
    "v": 8,
    "d": "Per byte in a LOG* operation's data."
  },
  "logTopicGas": {
    "v": 375,
    "d": "Multiplied by the * of the LOG*, per LOG transaction. e.g. LOG0 incurs 0 * c_txLogTopicGas, LOG4 incurs 4 * c_txLogTopicGas."
  },

  "createGas": {
    "v": 32000,
    "d": "Once per CREATE operation & contract-creation transaction."
  },

  "callGas": {
    "v": 40,
    "d": "Once per CALL operation & message call transaction."
  },
  "callStipend": {
    "v": 2300,
    "d": "Free gas given at beginning of call."
  },
  "callValueTransferGas": {
    "v": 9000,
    "d": "Paid for CALL when the value transfor is non-zero."
  },
  "callNewAccountGas": {
    "v": 25000,
    "d": "Paid for CALL when the destination address didn't exist prior."
  },

  "suicideRefundGas": {
    "v": 24000,
    "d": "Refunded following a suicide operation."
  },

  "memoryGas": {
    "v": 3,
    "d": "Times the address of the (highest referenced byte in memory + 1). NOTE: referencing happens on read, write and in instructions such as RETURN and CALL."
  },
  "quadCoeffDiv": {
    "v": 512,
    "d": "Divisor for the quadratic particle of the memory cost equation."
  },

  "createDataGas": {
    "v": 200,
    "d": ""
  },
  "txGas": {
    "v": 1000,
    "d": "Per transaction. NOTE: Not payable on data of calls between transactions."
  },
  "txCreation": {
    "v": 32000,
    "d": "the cost of creating a contract via tx"
  },
  "txDataZeroGas": {
    "v": 4,
    "d": "Per byte of data attached to a transaction that equals zero. NOTE: Not payable on data of calls between transactions."
  },
  "txDataNonZeroGas": {
    "v": 68,
    "d": "Per byte of data attached to a transaction that is not equal to zero. NOTE: Not payable on data of calls between transactions."
  },

  "copyGas": {
    "v": 3,
    "d": "Multiplied by the number of 32-byte words that are copied (round up) for any *COPY operation and added."
  },

  "ecrecoverGas": {
    "v": 3000,
    "d": ""
  },
  "sha256Gas": {
    "v": 60,
    "d": ""
  },
  "sha256WordGas": {
    "v": 12,
    "d": ""
  },
  "ripemd160Gas": {
    "v": 600,
    "d": ""
  },
  "ripemd160WordGas": {
    "v": 120,
    "d": ""
  },
  "identityGas": {
    "v": 15,
    "d": ""
  },
  "identityWordGas": {
    "v": 3,
    "d": ""
  },
  "freeBlockPeriod": {
    "v": 2
  }
};
const BN = ethUtil.BN
// var BigNumber = require('bignumber.js');


// secp256k1n/2
const N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16)
const SystemFlag  = 0x80
const QueryFlag  = 0x40
const ShardingFlag  = 0x20

// var N_DIV_2 = new BigNumber('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16)

/**
 * Creates a new transaction object.
 *
 * @example
 * var rawTx = {
 *   nonce: '00',
 *   gasPrice: '09184e72a000',
 *   gasLimit: '2710',
 *   to: '0000000000000000000000000000000000000000',
 *   value: '00',
 *   data: '7f7465737432000000000000000000000000000000000000000000000000000000600057',
 *   v: '1c',
 *   r: '5e1d3a76fbf824220eafc8c79ad578ad2b67d01b0c2425eb1f1347e8f50882ab',
 *   s: '5bd428537f05f9830e93792f90ea6a3e2d1ee84952dd96edbae9f658f831ab13',
 *   shardingFlag: 0,
 *   via: '',
 *
 * };
 * var tx = new Transaction(rawTx);
 *
 * @class
 * @param {Buffer | Array | Object} data a transaction can be initiailized with either a buffer containing the RLP serialized transaction or an array of buffers relating to each of the tx Properties, listed in order below in the exmple.
 *
 * Or lastly an Object containing the Properties of the transaction like in the Usage example.
 *
 * For Object and Arrays each of the elements can either be a Buffer, a hex-prefixed (0x) String , Number, or an object with a toBuffer method such as Bignum
 *
 * @property {Buffer} raw The raw rlp encoded transaction
 * @param {Buffer} data.nonce nonce number
 * @param {Buffer} data.systemContract Default = 0, don't change
 * @param {Buffer} data.gasLimit transaction gas limit
 * @param {Buffer} data.gasPrice transaction gas price
 * @param {Buffer} data.to to the to address
 * @param {Buffer} data.value the amount of ether sent
 * @param {Buffer} data.data this will contain the data of the message or the init of a contract
 * @param {Buffer} data.v EC signature parameter
 * @param {Buffer} data.r EC signature parameter
 * @param {Buffer} data.s EC recovery ID
 * @param {Number} data.chainId EIP 155 chainId - mainnet: 1, ropsten: 3
 * @param {Buffer} data.nonce nonce number
 * @param {Buffer} data.via via address
 * */

class moacTx {
  constructor (data) {
    data = data || {}

    // Define Properties,
    // The properties need to follow the data structure in MOAC
    // core/type/
    // Added two more fields
    // systemFlag, range (0,1), should always be 0
    // shardingFlag, ranger (0,1)

    const fields = [{
      name: 'nonce',
      length: 32,
      allowLess: true,
      default: new Buffer([])
    }, {name: 'systemContract',
      length: 32,
      allowLess: true,
      // allowZero: true,
      default: new Buffer([0])
    }, {
      name: 'gasPrice',
      length: 32,
      allowLess: true,
      default: new Buffer([])
    }, {
      name: 'gasLimit',
      alias: 'gas',
      length: 32,
      allowLess: true,
      default: new Buffer([])
    }, {
      name: 'to',
      allowZero: true,
      length: 20,
      default: new Buffer([])
    }, {
      name: 'value',
      length: 32,
      allowLess: true,
      default: new Buffer([])
    }, {
      name: 'data',
      alias: 'input',
      allowZero: true,
      default: new Buffer([])
    }, { name: 'shardingFlag',
      length: 32,
      allowLess: true,
      default: new Buffer([0])
      // allowZero: true,
      // default: new Buffer([0])
    }, {
      name: 'via',
      allowZero: true,
      length: 20,
      default: new Buffer([])
    },{
      name: 'v',
      allowZero: true,
      // FOR ETH before, v = 27 (0x1B) or v = 28 (0x1c)
      // default: new Buffer([0x25])
      // FOR EIP155, v = CHAIN_ID * 2 + 35 or v = CHAIN_ID * 2 + 36
      // mainnet: 37 or 0x25, testnet: 38 or 0x26,
      default: new Buffer([0x1B])
    }, {
      name: 'r',
      length: 32,
      allowZero: true,
      allowLess: true,
      default: new Buffer([])
    }, {
      name: 's',
      length: 32,
      allowZero: true,
      allowLess: true,
      default: new Buffer([])
    }]

    /**
     * Returns the rlp encoding of the transaction
     * @method serialize
     * @return {Buffer}
     * @memberof Transaction
     * @name serialize
     */
    // attached serialize
    ethUtil.defineProperties(this, fields, data)

//Set default values for system flag and sharding flag
    /**
     * @property {Buffer} from (read only) sender address of this transaction, mathematically derived from other parameters.
     * @name from
     * @memberof Transaction
     */
    Object.defineProperty(this, 'from', {
      enumerable: true,
      configurable: true,
      get: this.getSenderAddress.bind(this)
    })

    //Set system flag to 0, this value should not be changed
    Object.defineProperty(this, 'systemContract', {
      value: 0,
      writable: false
    })


    //Set sharding flag to 0 as default
    Object.defineProperty(this, 'shardingFlag', {
      value: 0,
      writable: true
    })

    // calculate chainId from signature
    // with EIP155
    let sigV = ethUtil.bufferToInt(this.v)
    let chainId = Math.floor((sigV - 35) / 2)
    if (chainId < 0) chainId = 0

    // set chainId as default
    // this chainID can be set with the right chain
    this._chainId = chainId || data.chainId || 0
    this._pangu = true
// console.log("In constructor:", this.v, sigV);

  }

  /**
   * Set the chain id and
   * update the V default value
   *
   * @return {Buffer}
   */
  setChainId (inValue) {
    if (typeof inValue != "number"){
      // console.log("Not number!!!")
      inValue = parseInt(inValue)
    }
    if (inValue > 0)
    this._chainId = inValue;
    else
    throw new Error('Invalid chainID');
  }

  /**
   * Set the control flag value
   * @return {Boolean}
   */
  setShardingFlag (inValue) {
    if ( inValue == 1 || inValue == 0){
      this.shardingFlag = inValue
      return true
    }
    throw new Error('Invalid shardingFlag');
  }
  /**
   * Display the TX in JSON format
   * @return {JSON string}
   */
  toJSON () {
    var outJson = {
            'nonce':this.nonce,
      'from': this.from,
      'to': this.to,
      'gasLimit':this.gasLimit,
      'gasPrice':this.gasPrice,
      'shardingFlag':this.shardingflag,
      'via':this.via
    };

    return outJson;
  }


  /**
   * If the tx's `to` is to the creation address
   * @return {Boolean}
   */
  toCreationAddress () {
    return this.to.toString('hex') === ''
  }

  /**
   * Computes a sha3-256 hash of the serialized tx
   * The tx need to be the same
   * @param {Boolean} [includeSignature=true] whether or not to inculde the signature
   * @return {Buffer}
   * MOAC, added SystemContract, QueryFlag and ShardingFlag items for signing
   * if the transaction structure changesm, this follows the definition in
   *
   * MoacCore\core\types\transaction.go
   * Updated 2018/03/25
   *
   type txdata struct {
  AccountNonce uint64          `json:"nonce"    gencodec:"required"`
  SystemContract uint64          `json:"syscnt" gencodec:"required"`
  Price        *big.Int        `json:"gasPrice" gencodec:"required"`
  GasLimit     *big.Int        `json:"gas"      gencodec:"required"`
  Recipient    *common.Address `json:"to"       rlp:"nil"` // nil means contract creation
  Amount       *big.Int        `json:"value"    gencodec:"required"`
  Payload      []byte          `json:"input"    gencodec:"required"`
  ShardingFlag uint64 `json:"shardingFlag" gencodec:"required"`
  Via            *common.Address `json:"via"       rlp:"nil"`

  // Signature values
  V *big.Int `json:"v" gencodec:"required"`
  R *big.Int `json:"r" gencodec:"required"`
  S *big.Int `json:"s" gencodec:"required"`

  // This is only used when marshaling to JSON.
  Hash *common.Hash `json:"hash" rlp:"-"`
  }
   * The hash process should follow the same procedure as in the
   * /core/types/transaction_signing.go
   *
   */
  hash (includeSignature) {
    if (includeSignature === undefined) includeSignature = true

    // EIP155 spec:
    // when computing the hash of a transaction for purposes of signing or recovering,
    //
    // instead of hashing the elements (ie. nonce, systemcontract,
    // gasprice, startgas, to, value, data, queryflag, shardingflag),
    // hash the elements with three more fields, with v replaced by CHAIN_ID, r = 0 and s = 0

    // chainid SHOULD BE non-zero for the valid network and EIP155
    //MOAC has 8 items
    //
    const min_items = 8;

    let items
    if (includeSignature) {
      items = this.raw
    } else {


      if (this._chainId > 0) {
        // console.log("Sign TX with chain id:", this._chainId)
        const raw = this.raw.slice()
        this.v = this._chainId
        this.r = 0
        this.s = 0
        items = this.raw
        this.raw = raw
      } else {
        //Enforced the signature process
        // console.log("chainID = 0 min slice")
        throw new Error('Invalid chainID')
        // items = this.raw.slice(0, min_items)
      }
    }
 // console.log("items to seri", items);
 // console.log("===before rlphash===========", this.v);

    // create hash
    return ethUtil.rlphash(items)
  }

  /**
   * returns the chain id,
   * @return {Buffer}
   */
  getChainId () {
    return this._chainId
  }


  /**
   * returns the fields name and value,
   * @return {Buffer}
   */
  getFields () {
    return this._fields
  }

  /**
   * returns shardingFlag value,
   * @return {Buffer}
   */
  getShardingFlag () {
    return this._shardingFlag;
  }

  getViaAddress () {
    return this._via;
  }

  /**
   * returns the sender's address
   * @return {Buffer}
   */
  getSenderAddress () {
    if (this._from) {
      return this._from
    }
    const pubkey = this.getSenderPublicKey()
    this._from = ethUtil.publicToAddress(pubkey)

    //add for MOAC encoding

    return this._from
  }

  /**
   * returns the public key of the sender
   * @return {Buffer}
   */
  getSenderPublicKey () {
    if (!this._senderPubKey || !this._senderPubKey.length) {
      if (!this.verifySignature()) throw new Error('Invalid Signature')
    }
    return this._senderPubKey
  }

  /**
   * Determines if the signature is valid
   * @return {Boolean}
   */
  verifySignature () {
    const msgHash = this.hash(false)

    // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
    if (this._pangu && new BN(this.s).cmp(N_DIV_2) === 1) {
    // if (this._pangu && new BigNumber(this.s).cmp(N_DIV_2) === 1) {
      return false
    }


    try {
      let v = ethUtil.bufferToInt(this.v)
          // console.log("v value:", v);
      if (this._chainId > 0) {
        v -= this._chainId * 2 + 8
      }

      this._senderPubKey = ethUtil.ecrecover(msgHash, v, this.r, this.s)

      // console.log('public key:', this._senderPubKey.toString('hex'))

    } catch (e) {
      return false
    }

    return !!this._senderPubKey
  }

  /**
   * sign a transaction with a given a private key
   * @param {Buffer} privateKey
   */
  sign (privateKey) {
    const msgHash = this.hash(false)
    console.warn("privatekey is: ", privateKey)
    // console.log("Sign the hash with  chainID", this._chainId)

    const sig = ethUtil.ecsign(msgHash, privateKey)

    if (this._chainId > 0) {
      sig.v += this._chainId * 2 + 8
    }
    // console.log("Signed sig:", sig.toString('hex'));

    Object.assign(this, sig)
  }

  /**
   * The amount of gas paid for the data in this tx
   * @return {BN}
   */
  getDataFee () {
    const data = this.raw[5]
    const cost = new BN(0)
    // const cost = new BigNumber(0)
    for (let i = 0; i < data.length; i++) {
      data[i] === 0 ? cost.iaddn(fees.txDataZeroGas.v) : cost.iaddn(fees.txDataNonZeroGas.v)
    }
    return cost
  }

  /**
   * the minimum amount of gas the tx must have (DataFee + TxFee + Creation Fee)
   * @return {BN}
   */
  getBaseFee () {
    const fee = this.getDataFee().iaddn(fees.txGas.v)
    if (this._pangu && this.toCreationAddress()) {
      fee.iaddn(fees.txCreation.v)
    }
    return fee
  }

  /**
   * the up front amount that an account must have for this transaction to be valid
   * @return {BN}
   */
  getUpfrontCost () {
    return new BN(this.gasLimit)
      .imul(new BN(this.gasPrice))
      .iadd(new BN(this.value))
    // return new BigNumber(this.gasLimit)
    //     .times(new BigNumber(this.gasPrice))
    //     .plus(new BigNumber(this.value))
  }

  /**
   * validates the signature and checks to see if it has enough gas
   * @param {Boolean} [stringError=false] whether to return a string with a dscription of why the validation failed or return a Bloolean
   * @return {Boolean|String}
   */
  validate (stringError) {
    const errors = []
    if (!this.verifySignature()) {
      errors.push('Invalid Signature')
    }

    if (this.getBaseFee().cmp(new BN(this.gasLimit)) > 0) {
    // if (this.getBaseFee().cmp(new BigNumber(this.gasLimit)) > 0) {

      errors.push([`gas limit is too low. Need at least ${this.getBaseFee()}`])
    }

    if (stringError === undefined || stringError === false) {
      return errors.length === 0
    } else {
      return errors.join(' ')
    }
  }
}

module.exports = moacTx

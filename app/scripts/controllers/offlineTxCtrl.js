'use strict';
var offlineTxCtrl = function($scope, $sce, walletService) {
    $scope.gpDropdown = false;
    $scope.gasPriceDef = globalFuncs.localStorage.getItem('gasPriceDef') || 'WEI';
    $scope.ajaxReq = ajaxReq;
    walletService.wallet = null;
    walletService.password = '';
    $scope.unitReadable = ajaxReq.type;
    $scope.valueReadable = "";
    $scope.showAdvance = false;
    $scope.dropdownEnabled = true;
    $scope.showRaw = false;
    $scope.showWalletInfo = false;
    $scope.gasPriceDec = 0;
    $scope.nonceDec = 0;
    $scope.tokens = Token.popTokens;
    $scope.Validator = Validator;
    $scope.tx = {
        gasLimit: globalFuncs.defaultTxGasLimit,
        from: "",
        data: "",
        to: "",
        unit: "mc",
        value: '',
        nonce: null,
        gasPrice: null,
        donate: false
    }
    $scope.tokenTx = {
        to: '',
        value: 0,
        id: 'mc',
        gasLimit: 150000
    };
    $scope.localToken = {
        contractAdd: "",
        symbol: "",
        decimals: "",
        type: "custom",
    };
    $scope.$watch(function() {
        if (walletService.wallet == null) return null;
        return walletService.wallet.getAddressString();
    }, function() {
        if (walletService.wallet == null) return;
        $scope.wallet = walletService.wallet;
    });

    $scope.changePrice = function(price) {
      $scope.gasPriceDef = price;
      globalFuncs.localStorage.setItem('gasPriceDef', price);
      $scope.gpDropdown = false;
    }

    $scope.convertPrice = function(gasPrice) {
      if($scope.gasPriceDef === 'GSHA') {
        return moacUnits.toSha(gasPrice,$scope.gasPriceDef.toLowerCase());
      } return gasPrice;
    }

    $scope.setTokens = function() {
        $scope.tokenObjs = [];
        for (var i = 0; i < $scope.tokens.length; i++) {
            $scope.tokenObjs.push(new Token($scope.tokens[i].address, '', $scope.tokens[i].symbol, $scope.tokens[i].decimal, $scope.tokens[i].type));
        }
        var storedTokens = globalFuncs.localStorage.getItem("localTokens", null) != null ? JSON.parse(globalFuncs.localStorage.getItem("localTokens")) : [];
        for (var i = 0; i < storedTokens.length; i++) {
            $scope.tokenObjs.push(new Token(storedTokens[i].contractAddress, '', globalFuncs.stripTags(storedTokens[i].symbol), storedTokens[i].decimal, storedTokens[i].type));
        }
    }
    $scope.setTokens();
    $scope.getWalletInfo = function() {
        if (moacFuncs.validateMoacAddress($scope.tx.from)) {
            ajaxReq.getTransactionData($scope.tx.from, function(data) {
                if (data.error) throw data.msg;
                data = data.data;
                $scope.gasPriceDec = moacFuncs.hexToDecimal(moacFuncs.sanitizeHex(moacFuncs.addTinyMoreToGas(data.gasprice)));
                $scope.nonceDec = moacFuncs.hexToDecimal(data.nonce);
                $scope.showWalletInfo = true;
            });
        }
    }
    $scope.$watch('gasPriceDef', function(newValue, oldValue) {
        if(newValue == "SHA" && oldValue == "GSHA") $scope.gasPriceDec = moacUnits.toSha($scope.gasPriceDec, 'gsha');
        else if(newValue == "GSHA" && oldValue == "SHA") $scope.gasPriceDec = moacUnits.toGsha($scope.gasPriceDec,'sha');
        else $scope.gasPriceDec = 0;
    });
    $scope.$watch('tx', function() {
        $scope.showRaw = false;

    }, true);
    $scope.$watch('tokenTx.id', function() {
        if ($scope.tokenTx.id != 'mc') {
            $scope.tx.gasLimit = 150000;
        } else {
            $scope.tx.gasLimit = globalFuncs.defaultTxGasLimit;
        }
    });
    $scope.$watch('[tx.to]', function() {
        // if golem crowdfund address
        if ($scope.tx.to == "0xa74476443119A942dE498590Fe1f2454d7D4aC0d") {
            $scope.setSendMode('mc')
            $scope.dropdownEnabled = false
            $scope.tx.data = '0xefc81a8c'
            $scope.tx.gasLimit = 70000
        } else {
            $scope.dropdownEnabled = true
        }
    }, true);
    $scope.setSendMode = function(index, tokensymbol = '') {
        $scope.tokenTx.id = index;
        if (index == 'mc') {
            $scope.unitReadable = ajaxReq.type;
        } else {
            $scope.unitReadable = tokensymbol;
        }
        $scope.dropdownAmount = false;
    }
    $scope.validateAddress = function(address, status) {
        $scope.customGasMsg = ''
        if (moacFuncs.validateMoacAddress(address)) {
            for (var i in CustomGasMessages) {
                if ($scope.tx.to.toLowerCase() == CustomGasMessages[i].to.toLowerCase()) {
                    $scope.customGasMsg = CustomGasMessages[i].msg != '' ? CustomGasMessages[i].msg : ''
                }
            }
            return true;
        } else {
          return false;
        }
    }
    $scope.generateTx = function() {
        if (!moacFuncs.validateMoacAddress($scope.tx.to)) {
            $scope.notifier.danger(globalFuncs.errorMsgs[5]);
            return;
        }
        var txData = uiFuncs.getTxData($scope);

        console.log("token id", $scope.tokenTx.id);
        txData.isOffline = true;
        txData.nonce = moacFuncs.sanitizeHex(moacFuncs.decimalToHex($scope.nonceDec));
        txData.gasPrice = moacFuncs.sanitizeHex(moacFuncs.decimalToHex($scope.convertPrice($scope.gasPriceDec)));
        console.log("txdata:", txData);
        console.log("scope.gasPriceDec", $scope.gasPriceDec);
        if ($scope.tokenTx.id != 'mc') {
            txData.data = $scope.tokenObjs[$scope.tokenTx.id].getData($scope.tx.to, $scope.tx.value).data;
            txData.to = $scope.tokenObjs[$scope.tokenTx.id].getContractAddress();
            txData.value = '0x00';
        }
        //generate the signed TX

        uiFuncs.generateTx(txData, function(rawTx) {
            if (!rawTx.isError) {
                $scope.rawTx = rawTx.rawTx;
                $scope.signedTx = rawTx.signedTx;
                $scope.showRaw = true;
            } else {
                $scope.showRaw = false;
                $scope.notifier.danger(rawTx.error);
            }
            if (!$scope.$$phase) $scope.$apply();
        });
    }
    $scope.confirmSendTx = function() {
        try {
            
            if ($scope.signedTx == "" || !moacFuncs.validateHexString($scope.signedTx)) throw globalFuncs.errorMsgs[12];
            var eTx = new ethUtil.Tx($scope.signedTx);
            //This may need to be changed to moacTX
            if (eTx.data.length && Token.transferHex == moacFuncs.sanitizeHex(eTx.data.toString('hex').substr(0, 8))) {
                var token = Token.getTokenByAddress(moacFuncs.sanitizeHex(eTx.to.toString('hex')));
                var decoded = ethUtil.solidityCoder.decodeParams(["address", "uint256"], moacFuncs.sanitizeHex(eTx.data.toString('hex').substr(10)));
                $scope.tx.sendMode = 'token';
                $scope.tokenTx.value = decoded[1].div(new BigNumber(10).pow(token.decimal)).toString();
                $scope.tokenTx.to = decoded[0];
                $scope.unitReadable = token.symbol;
                $scope.tokenTx.from = moacFuncs.sanitizeHex(eTx.getSenderAddress().toString('hex'));
            } else {
                $scope.tx.sendMode = 'mc';
                $scope.tx.value = eTx.value.length ? moacUnits.toMc(moacFuncs.sanitizeHex(eTx.value.toString('hex')), 'sha') : 0;
                $scope.unitReadable = ajaxReq.type;
                $scope.tx.from = moacFuncs.sanitizeHex(eTx.getSenderAddress().toString('hex'));
                $scope.tx.to = moacFuncs.sanitizeHex(eTx.to.toString('hex'));
            }
            new Modal(document.getElementById('sendTransactionOffline')).open();
        } catch (e) {
            $scope.notifier.danger(e);
        }
    }
    $scope.sendTx = function() {
        new Modal(document.getElementById('sendTransactionOffline')).close();
        ajaxReq.sendRawTx($scope.signedTx, function(data) {
            if (data.error) {
                $scope.notifier.danger(data.msg);
            } else {
                $scope.notifier.success(globalFuncs.successMsgs[2] + "<a href='http://explorer.moac.io/tx/" + data.data + "' target='_blank' rel='noopener'>" + data.data + "</a>");
            }
        });
    }
};
module.exports = offlineTxCtrl;

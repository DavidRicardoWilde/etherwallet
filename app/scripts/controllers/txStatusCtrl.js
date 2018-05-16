'use strict';
var txStatusCtrl = function($scope) {
    $scope.Validator = Validator;
    $scope.checkTxPage = true;
    $scope.checkTxReadOnly = true;
    $scope.txStatus = {
        found: 0,
        notFound: 1,
        mined: 2
    }
    var MIN_GAS = 41;
    $scope.txInfo = {
        status: null, // notFound foundInPending foundOnChain
        hash: globalFuncs.urlGet('txHash') == null ? "" : globalFuncs.urlGet('txHash'),
        from: '',
        to: '',
        value: '',
        valueStr: '',
        gasLimit: '',
        gasPrice: '',
        data: '',
        nonce: ''
    }

    var applyScope = function() {
        if (!$scope.$$phase) $scope.$apply();
    }
    var setUSDvalues = function() {
        ajaxReq.getMOACvalue(function(data) {
            $scope.txInfo.gasPrice.usd = new BigNumber(data.usd).mul(new BigNumber($scope.txInfo.gasPrice.mc)).toString();
            applyScope();
        });
    }
    var txToObject = function(tx) {
        var txStatus = $scope.txStatus;
        if (tx) {
            console.log('txToObject')
            console.log(tx)
            $scope.txInfo = {
                status: tx.blockNumber ? txStatus.mined : txStatus.found,
                hash: tx.hash,
                from: ethUtil.toChecksumAddress(tx.from),
                to: tx.to ? ethUtil.toChecksumAddress(tx.to) : '',
                value: new BigNumber(tx.value).toString(),
                valueStr: moacUnits.toMc(tx.value, 'sha') + " MC",
                gasLimit: new BigNumber(tx.gas).toString(),
                gasPrice: {
                    sha: new BigNumber(tx.gasPrice).toString(),
                    gsha: new BigNumber(tx.gasPrice).div(moacUnits.getValueOfUnit('gsha')).toString(),
                    mc: moacUnits.toMc(tx.gasPrice, 'sha')
                },
                data: tx.input == '0x' ? '' : tx.input,
                nonce: new BigNumber(tx.nonce).toString()
            }
            if ($scope.txInfo.status == txStatus.found) {
                var _gasPrice = new BigNumber($scope.txInfo.gasPrice.sha).mul(1.1).floor();
                if (_gasPrice.lt(moacUnits.getValueOfUnit('gsha') * MIN_GAS)) _gasPrice = new BigNumber(moacUnits.getValueOfUnit('gsha') * MIN_GAS)
                $scope.parentTxConfig = {
                    to: $scope.txInfo.from,
                    value: '0',
                    sendMode: 'mc',
                    tokensymbol: '',
                    readOnly: false,
                    gasPrice: _gasPrice.toString(),
                    gasLimit: '1000',
                    data: '',
                    nonce: $scope.txInfo.nonce
                }
                new Modal(document.getElementById('sendTransaction'));
            }
            setUSDvalues();
        } else {
            $scope.txInfo.status = txStatus.notFound;
        }
    }
    $scope.checkTxStatus = function() {
        var txInfo = $scope.txInfo;
        try {
            if (!Validator.isValidTxHash(txInfo.hash)) throw globalFuncs.errorMsgs[36];
            ajaxReq.getTransaction(txInfo.hash, function(data) {
                if (data.error) $scope.notifier.danger(data.msg);
                else {
                    txToObject(data.data);
                }
            });
        } catch (e) {
            $scope.notifier.danger(e);
        }
    }

    globalFuncs.urlGet('txHash') == null ? '' : $scope.checkTxStatus();

};
module.exports = txStatusCtrl;

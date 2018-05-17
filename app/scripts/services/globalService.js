'use strict'
var globalService = function($http, $httpParamSerializerJQLike) {

  globalFuncs.checkAndRedirectHTTPS()
  ajaxReq.http = $http
  ajaxReq.postSerializer = $httpParamSerializerJQLike
  ajaxReq.getETHvalue = nodes.ethPrice.getETHvalue
  ajaxReq.getRates = nodes.ethPrice.getRates

  var tabs = {
  generateWallet: {
    id: 0,
    name: "NAV_GenerateWallet_alt",
    url: "generate-wallet",
    mew: true,
    cx: false,
    moac: true
  },
  myWallet: {
    id: 1,
    name: "NAV_MyWallets",
    url: "my-wallet",
    mew: false,
    cx: true,
    moac: false
  },
  addWallet: {
    id: 2,
    name: "NAV_AddWallet",
    url: "add-wallet",
    mew: false,
    cx: true,
    moac: false
  },
  sendTransaction: {
    id: 3,
    name: "NAV_SendEther",
    url: "send-transaction",
    mew: true,
    cx: true,
    moac: true
  },
  swap: {
    id: 4,
    name: "NAV_Swap",
    url: "swap",
    mew: true,
    cx: true,
    moac: false
  },
  offlineTransaction: {
    id: 5,
    name: "NAV_Offline",
    url:"offline-transaction",
    mew: true,
    cx: false,
    moac: true
  },
  contracts: {
    id: 6,
    name: "NAV_Contracts",
    url: "contracts",
    mew: true,
    cx: true,
    moac: false
  },
  ens: {
    id:7,
    name: "NAV_ENS",
    url: "ens",
    mew: true,
    cx: true,
    moac: false
  },
  domainsale: {
    id: 8,
    name: "NAV_DomainSale",
    url: "domainsale",
    mew: true,
    cx: true,
    moac: false
  },
  txStatus: {
    id: 9,
    name: "NAV_CheckTxStatus",
    url: "check-tx-status",
    mew: true,
    cx: true,
    moac: true
  },
  viewWalletInfo: {
    id: 10,
    name: "NAV_ViewWallet",
    url: "view-wallet-info",
    mew: true,
    cx: false,
    moac: true
  },
  signMsg: {
    id: 11,
    name: "NAV_SignMsg",
    url: "sign-message",
    mew: false,
    cx: false,
    moac: false
  },
  bulkGenerate: {
    id: 12,
    name: "NAV_BulkGenerate",
    url: "bulk-generate",
    mew: false,
    cx: false,
    moac: false
  }
  }

  var currentTab = 0
  if(typeof chrome != 'undefined')
    currentTab = chrome.windows === undefined ? 0 : 3
  return {
    tabs: tabs,
    currentTab: currentTab
  }

  var tokensLoaded = false

}

module.exports = globalService



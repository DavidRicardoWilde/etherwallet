'use strict';
var nodes = function() {}
nodes.customNode = require('./nodeHelpers/customNode');
nodes.infuraNode = require('./nodeHelpers/infura');
nodes.metamaskNode = require('./nodeHelpers/metamask');
nodes.nodeTypes = {
    MOAC: "MOAC",
    MOAC_TEST: "MOAC TestNet",
    Custom: "CUSTOM ETH"
};
nodes.ensNodeTypes = [nodes.nodeTypes.ETH, nodes.nodeTypes.Ropsten];
nodes.ensSubNodeTypes = [nodes.nodeTypes.ETH];
nodes.domainsaleNodeTypes = [nodes.nodeTypes.ETH, nodes.nodeTypes.Ropsten];
nodes.customNodeObj = {
    'name': 'CUS',
    'blockExplorerTX': '',
    'blockExplorerAddr': '',
    'type': nodes.nodeTypes.Custom,
    'eip155': false,
    'chainId': '',
    'tokenList': [],
    'abiList': [],
    'service': 'Custom',
    'lib': null
};
nodes.nodeList = {
    'moac': {
        'name': 'MOAC',
        'blockExplorerTX': 'http://explorer.moac.io/tx/[[txHash]]',
        'blockExplorerAddr': 'http://explorer.moac.io/addr/[[address]]',
        'type': nodes.nodeTypes.MOAC,
        'eip155': true,
        'chainId': 99,
        'tokenList': require('./tokens/moacTokens.json'),
        'abiList': require('./abiDefinitions/moacAbi.json'),
        'service': 'myetherapi.com',
        'lib': new nodes.customNode('https://api.myetherapi.com/eth', '')
    },
    'moac_test': {
        'name': 'MOAC TestNet',
        'blockExplorerTX': 'https://ropsten.etherscan.io/tx/[[txHash]]',
        'blockExplorerAddr': 'https://ropsten.etherscan.io/address/[[address]]',
        'type': nodes.nodeTypes.MOAC_TEST,
        'eip155': true,
        'chainId': 101,
        'tokenList': require('./tokens/moacTestTokens.json'),
        'abiList': require('./abiDefinitions/moacTestAbi.json'),
        'service': 'infura.io',
        'lib': new nodes.customNode('https://api.myetherapi.com/eth', '')
    }
};


nodes.ethPrice = require('./nodeHelpers/ethPrice');
module.exports = nodes;

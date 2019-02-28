'use strict';
var nodes = function() {}
nodes.customNode = require('./nodeHelpers/customNode');
nodes.infuraNode = require('./nodeHelpers/infura');
nodes.metamaskNode = require('./nodeHelpers/metamask');
nodes.nodeTypes = {
    MOAC: "MC",
    MOAC_TEST: "MC",
    Custom: "MC"
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
        'service': 'MOAC MAIN',
        'lib': new nodes.customNode('https://gateway.moac.io/mainnet', '')
    },
    'moac_test': {
        'name': 'MOAC TestNet',
        'blockExplorerTX': 'http://47.75.144.55:3000/tx/[[txHash]]',
        'blockExplorerAddr': 'http://47.75.144.55:3000/addr/[[address]]',
        'type': nodes.nodeTypes.MOAC_TEST,
        'eip155': true,
        'chainId': 101,
        'tokenList': require('./tokens/moacTestTokens.json'),
        'abiList': require('./abiDefinitions/moacTestAbi.json'),
        'service': 'MOAC TEST',
        'lib': new nodes.customNode('https://gateway.moac.io/testnet', '')
    }
};


nodes.ethPrice = require('./nodeHelpers/ethPrice');
module.exports = nodes;

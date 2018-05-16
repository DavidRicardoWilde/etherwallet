'use strict';
var nodes = function() {}
nodes.customNode = require('./nodeHelpers/customNode');
nodes.infuraNode = require('./nodeHelpers/infura');
nodes.metamaskNode = require('./nodeHelpers/metamask');
nodes.nodeTypes = {
    MOAC: "MOAC",
    MOAC_TEST: "MOAC TestNet",
    ETH: "ETH"
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
        'service': 'https://moacwalletonline.com/moac_api',
        'lib': new nodes.customNode('https://moacwalletonline.com/moac_api', '')
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
        'service': 'https://moacwalletonline.com/moac_test_api',
        'lib': new nodes.customNode('https://moacwalletonline.com/moac_test_api', '')
    }
};


nodes.ethPrice = require('./nodeHelpers/ethPrice');
module.exports = nodes;

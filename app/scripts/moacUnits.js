'use strict';
var moacUnits = function() {};
moacUnits.unitMap = {
	'nomc':      '0',
	'sha':       '1',
	'ksha':      '1000',
	'Ksha':      '1000',
	'femtomc':   '1000',
	'msha':      '1000000',
	'Msha':      '1000000',
	'picomc':    '1000000',
	'gsha':      '1000000000',
	'Gsha':      '1000000000',
	'nanomc':    '1000000000',
	'nano':      '1000000000',
	'xiao':      '1000000000',
	'micromc':   '1000000000000',
	'micro':     '1000000000000',
	'sand':      '1000000000000',
	'millimc':   '1000000000000000',
	'milli':     '1000000000000000',
	'mc':        '1000000000000000000',
	'moac':        '1000000000000000000',	
	'kmc':       '1000000000000000000000',
	'grand':     '1000000000000000000000',
	'mmc':       '1000000000000000000000000',
	'gmc':       '1000000000000000000000000000',
	'tmc':       '1000000000000000000000000000000'
};
moacUnits.getValueOfUnit = function(unit) {
	unit = unit ? unit.toLowerCase() : 'mc';
	var unitValue = this.unitMap[unit];
	if (unitValue === undefined) {
		throw new Error(globalFuncs.errorMsgs[4] + JSON.stringify(this.unitMap, null, 2));
	}
	return new BigNumber(unitValue, 10);
};
moacUnits.fiatToSha = function(number, pricePerMc) {
	var returnValue = new BigNumber(String(number)).div(pricePerMc).times(this.getValueOfUnit('mc')).round(0);
	return returnValue.toString(10);
};

moacUnits.toFiat = function(number, unit, multi) {
	var returnValue = new BigNumber(this.toMc(number, unit)).times(multi).round(5);
	return returnValue.toString(10);
};

moacUnits.toMc = function(number, unit) {
	var returnValue = new BigNumber(this.toSha(number, unit)).div(this.getValueOfUnit('mc'));
	return returnValue.toString(10);
};
moacUnits.toGwei = function(number, unit) {
	var returnValue = new BigNumber(this.toSha(number, unit)).div(this.getValueOfUnit('gsha'));
	return returnValue.toString(10);
};
moacUnits.toSha = function(number, unit) {
	var returnValue = new BigNumber(String(number)).times(this.getValueOfUnit(unit));
	return returnValue.toString(10);
};

moacUnits.unitToUnit = function(number, from, to) {
	var returnValue = new BigNumber(String(number)).times(this.getValueOfUnit(from)).div(this.getValueOfUnit(to));
	return returnValue.toString(10);
};

module.exports = moacUnits;

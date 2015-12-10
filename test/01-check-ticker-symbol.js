var tap = require('tap');
var cts = require('../check-ticker-symbol');

var iterateThroughStocks = function(valid, stocks, t) {
	var c = stocks.length;

	for(var i = 0; i < c; i++) {
		var da = cts.disassemble(stocks[i][0])

		if(valid === true) {
			t.notEqual(da, null, 'disassemble should not return null');

			t.equal(da.search, stocks[i][0], 'disassemble should return the correct search');
			t.equal(da.prefixedExchangeCode, stocks[i][1], 'disassemble should return no prefixed exchange code');
			t.equal(da.stock, stocks[i][2], 'disassemble should return the correct symbol');
			t.equal(da.suffixedExchangeCode, stocks[i][3], 'disassemble should return no suffixed exchange code');
		} else {
			t.equal(da, null, 'disassemble should return null');
		}

		t.equal(cts.valid(stocks[i][0]), valid, 'valid should return ' + valid);
	}
}

tap.test('disassemble and validate valid stocks', function (t) {
	var stocks = [
		[ 'GOOG', undefined, 'GOOG', undefined ],
		[ 'NYSE:C', 'NYSE', 'C', undefined ],
		[ 'GOOG.BY', undefined, 'GOOG', 'BY' ],
		[ '97263', undefined, '97263', undefined ],
		[ '123.AB', undefined, '123', 'AB' ]
	];

	iterateThroughStocks(true, stocks, t);

	t.end()
});

tap.test('disassemble and validate invalid stocks', function (t) {
	var stocks = [
		[ 'K2!1#$C' ],
		[ '42' ],
		[ '9.99' ],
		[ '$100' ]
	];

	iterateThroughStocks(false, stocks, t);

	t.end()
});

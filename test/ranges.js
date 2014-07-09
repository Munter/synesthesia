var expect = require('unexpected');
var ranges = require('../lib/ranges');

function createRange(min, max) {
    var range = new Array(max - min);

    return range.map(function (_, idx) {
        return idx + min;
    });
}

describe('percentage range', function () {
    it('should match the range 0-100', function (done) {
        expect(createRange(0, 100), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', ranges['100']);
        });

        done();
    });

    it('should not match numbers outside the range of 0-100', function (done) {
        expect('-1', 'not to match', ranges['100']);
        expect('101', 'not to match', ranges['100']);

        done();
    });
});

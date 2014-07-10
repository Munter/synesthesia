var expect = require('unexpected');
var ranges = require('../lib/ranges');

function createRange(min, max) {
    var range = new Array(max - min);

    return range.map(function (_, idx) {
        return idx + min;
    });
}

describe('percentage range', function () {
    // Clamp the regex as it will only occur as a partial in the final regex
    var percentage = new RegExp('^' + ranges['100'] + '$');

    it('should match the range 0-100', function (done) {
        expect(createRange(0, 100), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', percentage);
        });

        done();
    });

    it('should not match numbers outside the range of 0-100', function (done) {
        expect('-1', 'not to match', percentage);
        expect('101', 'not to match', percentage);
        expect('00', 'not to match', percentage);

        expect('abc', 'not to match', percentage);
        expect('0.1', 'not to match', percentage);
        expect('.05', 'not to match', percentage);
        expect('999', 'not to match', percentage);
        expect('123456', 'not to match', percentage);
        expect('&%¤#', 'not to match', percentage);

        done();
    });
});

describe('8bit range', function () {
    // Clamp the regex as it will only occur as a partial in the final regex
    var eightbit = new RegExp('^' + ranges['255'] + '$');

    it('should match the range 0-255', function (done) {
        expect(createRange(0, 255), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', eightbit);
        });

        done();
    });

    it('should not match numbers outside the range of 0-255', function (done) {
        expect('-1', 'not to match', eightbit);
        expect('256', 'not to match', eightbit);
        expect('00', 'not to match', eightbit);

        expect('abc', 'not to match', eightbit);
        expect('0.1', 'not to match', eightbit);
        expect('.05', 'not to match', eightbit);
        expect('999', 'not to match', eightbit);
        expect('123456', 'not to match', eightbit);
        expect('&%¤#', 'not to match', eightbit);

        done();
    });
});

describe('hue range', function () {
    // Clamp the regex as it will only occur as a partial in the final regex
    var hue = new RegExp('^' + ranges['360'] + '$');

    it('should match the range 0-360', function (done) {
        expect(createRange(0, 360), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', hue);
        });

        done();
    });

    it('should not match numbers outside the range of 0-360', function (done) {
        expect('-1', 'not to match', hue);
        expect('361', 'not to match', hue);
        expect('00', 'not to match', hue);

        expect('abc', 'not to match', hue);
        expect('0.1', 'not to match', hue);
        expect('.05', 'not to match', hue);
        expect('999', 'not to match', hue);
        expect('123456', 'not to match', hue);
        expect('&%¤#', 'not to match', hue);

        done();
    });
});

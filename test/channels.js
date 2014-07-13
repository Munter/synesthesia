var expect = require('unexpected');
var channels = require('../lib/channels');

function createRange(min, max) {
    var range = new Array(max - min);

    return range.map(function (_, idx) {
        return idx + min;
    });
}

describe('alpha channel', function () {
    var channel = new RegExp('^' + channels.alpha.source + '$'); // Clamp channel as it is supposed to be used in a wider setting later

    it('should match the range 0-1', function (done) {
        expect(createRange(0, 1), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', channel);
            expect('  ' + i + '  ', 'to match', channel);
        });

        done();
    });

    it('should match decimals on everything but the max number', function (done) {
        expect('0.1', 'to match', channel);
        expect('0.01', 'to match', channel);
        expect('0.001', 'to match', channel);
        expect('0.0001', 'to match', channel);
        expect('0.00001', 'to match', channel);
        expect('.1', 'to match', channel);
        expect('.01', 'to match', channel);
        expect('.001', 'to match', channel);
        expect('.0001', 'to match', channel);
        expect('.00001', 'to match', channel);

        expect('1.1', 'not to match', channel);
        expect('-0.1', 'not to match', channel);

        done();
    });
});

describe('percentage channel', function () {
    var channel = new RegExp('^' + channels.percentage.source + '$'); // Clamp channel as it is supposed to be used in a wider setting later

    it('should match the range 0-100', function (done) {
        expect(createRange(0, 100), 'to be an array whose items satisfy', function (i) {
            expect(i + '%', 'to match', channel);
            expect('  ' + i + '%  ', 'to match', channel);
        });

        done();
    });

    it('should not match the range 0-100 with a missing percentage', function (done) {
        expect(createRange(0, 100), 'to be an array whose items satisfy', function (i) {
            expect(i, 'not to match', channel);
        });

        done();
    });

    it('should match the range 0-99 with decimals', function (done) {
        expect(createRange(0, 99), 'to be an array whose items satisfy', function (i) {
            expect(i + '.01%', 'to match', channel);
        });

        done();
    });

    it('should not match the range 0-99 with decimals, but with missing percentage', function (done) {
        expect(createRange(0, 99), 'to be an array whose items satisfy', function (i) {
            expect(i + '.01', 'to match', channel);
        });

        done();
    });

    it('should match decimals without a leading zero', function (done) {
        expect('.001%', 'to match', channel);

        done();
    });

    it('should not match on numbers outside the channel range', function (done) {
        expect('100.1%', 'not to match', channel);
        expect('-0.1%', 'not to match', channel);

        done();
    });
});

describe('8-bit channel', function () {
    var channel = new RegExp('^' + channels.eightBit.source + '$'); // Clamp channel as it is supposed to be used in a wider setting later

    it('should match the range 0-255', function (done) {
        expect(createRange(0, 255), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', channel);
            expect('  ' + i + '  ', 'to match', channel);
        });

        done();
    });

    it('should match the range 0-254 with decimals', function (done) {
        expect(createRange(0, 254), 'to be an array whose items satisfy', function (i) {
            expect(i + '.01', 'to match', channel);
        });

        done();
    });

    it('should match decimals without a leading zero', function (done) {
        expect('.001', 'to match', channel);

        done();
    });

    it('should not match on numbers outside the channel range', function (done) {
        expect('255.1', 'not to match', channel);
        expect('-0.1', 'not to match', channel);

        done();
    });
});

describe('hue channel', function () {
    var channel = new RegExp('^' + channels.hue.source + '$'); // Clamp channel as it is supposed to be used in a wider setting later

    it('should match the range 0-360', function (done) {
        expect(createRange(0, 360), 'to be an array whose items satisfy', function (i) {
            expect(i, 'to match', channel);
            expect('  ' + i + '  ', 'to match', channel);
        });

        done();
    });

    it('should match the range 0-359 with decimals', function (done) {
        expect(createRange(0, 359), 'to be an array whose items satisfy', function (i) {
            expect(i + '.01', 'to match', channel);
        });

        done();
    });

    it('should match decimals without a leading zero', function (done) {
        expect('.001', 'to match', channel);

        done();
    });

    it('should not match on numbers outside the channel range', function (done) {
        expect('360.1', 'not to match', channel);
        expect('-0.1', 'not to match', channel);

        done();
    });
});

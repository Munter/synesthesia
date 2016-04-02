module.exports = function createRange(min, max) {
    var range = new Array(max - min).join('.').split('.');

    return range.map(function (_, idx) {
        return '' + (idx + min);
    });
};

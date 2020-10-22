const {
    jsonify
} = require('./jsonify.js');

describe('Testing jsonify', () => {
    test('Test to see if jsonify works', () => {
        const input = [{'name': 'foo', 'value': '1'}];
        expect(jsonify(input)).toEqual({foo: '1'});
    });

    test('Test to see if jsonify works for a more complicated example', () => {
        const input = [{'name': 'foo', 'value': '1'}, {'name': 'bar', 'value': 'some string'}];
        expect(jsonify(input)).toEqual({foo: '1', bar:'some string'});
    });
});
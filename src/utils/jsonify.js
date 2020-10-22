/* eslint-disable camelcase */

function jsonify(json_array) {
    return json_array.reduce((prev, curr) =>
        ({...prev, [curr.name]: curr.value}), {});
};

module.exports = { jsonify };
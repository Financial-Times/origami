module.exports = function({ dictionary }) {
    return '{\n' + dictionary.allTokens.map(function (token) {
        return `  "${token.name}": ${JSON.stringify({
            value: token.value,
            attributes: token.attributes,
            path: token.path,
        })}`;
    }).join(',\n') + '\n}';
};

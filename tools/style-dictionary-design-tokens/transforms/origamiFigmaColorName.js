module.exports = {
    type: `name`,
    matcher: (token) => token.attributes.category === `color`,
    transformer: (token) => {
        const paletteColor = token.palette;
        const paletteToneColor = token.attributes.item && !isNaN(token.attributes.item);
        if (paletteColor) {
            return `${token.palette}/${token.name}`
        }
        if (paletteToneColor) {
            return `${token.attributes.type} tones/${token.name}`
        }
        return `usecase/${token.name}`;
    }
};

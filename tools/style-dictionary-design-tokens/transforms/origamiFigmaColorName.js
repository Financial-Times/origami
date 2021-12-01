module.exports = {
    type: `name`,
    matcher: (token) => token.attributes.category === `color`,
    transformer: (token) => {
        const paletteColor = token.palette;
        // @todo don't forget this project is a questionable proof of concept,
        // here a colour is deemed a tone if it's token name is a number
        const paletteToneColor = token.attributes.item && !isNaN(token.attributes.item);
        if (paletteColor) {
            return `${token.palette}/${token.name}`
        } else if (paletteToneColor) {
            return `${token.attributes.type} tones/${token.name}`
        }
        const figmaPath = token.path.slice(2, token.path.length - 1).join('/');
        return `usecase/${figmaPath}/${token.name}`;
    }
};

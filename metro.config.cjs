const { getDefaultConfig } = require('@expo/metro-config');

module.exports = (async () => {
    const defaultConfig = getDefaultConfig(__dirname);
    return {
        ...defaultConfig,
    };
})();

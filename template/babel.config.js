module.exports = function (api) {
    api.cache(true);

    const plugins = [
        "@babel/plugin-proposal-object-rest-spread",
        [ "@babel/plugin-proposal-class-properties", { "loose": true } ]
      ];

    const presets = [ "@babel/env", "@babel/react" ];

    return { presets, plugins };
}

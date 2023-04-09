// const webpack = require("webpack");

module.exports = {
  webpack: (config, { webpack, isServer }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.externals['node:fs'] = 'commonjs node:fs';
    config.externals = {
        typeorm: 'typeorm',
        'react-native-sqlite-storage': 'react-native-sqlite-storage',
        replicate: 'replicate',
        // add others here
    };
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.output.webassemblyModuleFilename = (isServer ? "../" : "") + "static/wasm/[modulehash].wasm";
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );

    return config;
  },
}



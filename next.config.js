// const webpack = require("webpack");

// module.exports = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     config.experiments = { ...config.experiments, topLevelAwait: true };
//     config.externals['node:fs'] = 'commonjs node:fs';
//     config.externals = {
//         // typeorm: 'typeorm',
//         // 'react-native-sqlite-storage': 'react-native-sqlite-storage',
//         replicate: 'replicate',
//         // add others here
//     };
//     config.experiments = {
//       asyncWebAssembly: true,
//       layers: true,
//     };
//     config.output.webassemblyModuleFilename = (isServer ? "../" : "") + "static/wasm/[modulehash].wasm";
//     if (!isServer) {
//       config.resolve.fallback = {
//         ...config.resolve.fallback,
//         fs: false
//       };
//     }
//     config.plugins.push(
//       new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
//         resource.request = resource.request.replace(/^node:/, "");
//       })
//     );

//     return config;
//   },
// }



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (webpackConfig, {isServer, webpack }) => {
    webpackConfig.experiments = { ...webpackConfig.experiments, topLevelAwait: true, asyncWebAssembly: true, syncWebAssembly: true };
    webpackConfig.externals["node:fs"] = "commonjs node:fs";
    if (!isServer) {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false
      };
    }

    webpackConfig.plugins.push(
      // Remove node: from import specifiers, because Next.js does not yet support node: scheme
      // https://github.com/vercel/next.js/issues/28774
      new webpack.NormalModuleReplacementPlugin(
        /^node:/,
        (resource) => {
          resource.request = resource.request.replace(/^node:/, '');
        },
      ),
    );

    return webpackConfig;
  }
}

module.exports = nextConfig;



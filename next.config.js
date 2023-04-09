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



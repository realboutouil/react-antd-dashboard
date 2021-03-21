const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const zlib = require("zlib");

const CracoAntDesignPlugin = require("craco-antd");
const CracoAliasPlugin = require("craco-alias");

const path = require("path");

process.env.BROWSER = "none"; // optional, disables auto-open every time you restart

module.exports = {
  jest: {
    configure(config) {
      config.transformIgnorePatterns = [
        "/node_modules/(?!antd|rc-pagination|rc-calendar|rc-tooltip)/.+\\.js$",
      ];
      return config;
    },
  },
  webpack: {
    plugins: [
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(js|css|html|svg)$/,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
      }),
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {
            drop_console: process.env.NODE_ENV === "production", // Remove all contents of the console in the production environment
            drop_debugger: false, // remove breakpoint
            pure_funcs:
              process.env.NODE_ENV === "production" ? ["console.log"] : "", // remove console in production environment
          },
        },
      }),
    ],
  },
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeThemeLessPath: path.join(
          __dirname,
          "src/assets/style/antd.customize.less"
        ),
      },
    },
    {
      plugin: CracoAliasPlugin,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "@assets": "./src/assets",
          "@routes": "./src/routes",
          "@pages": "./src/pages",
          "@locales": "./src/locales",
          "@stores": "./src/stores",
        },
      },
    },
  ],
};

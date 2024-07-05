import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import devConfig from './dev';
import prodConfig from './prod';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig(async (merge) => {
    const baseConfig: UserConfigExport = {
        projectName: 'fq-service-weapp',
        date: '2024-7-1',
        designWidth: 750,
        deviceRatio: {
            640: 2.34 / 2,
            750: 1,
            375: 2,
            828: 1.81 / 2,
        },
        sourceRoot: 'src',
        outputRoot: 'dist',
        plugins: [],
        defineConstants: {
        },
        copy: {
            patterns: [
            ],
            options: {
            },
        },
        framework: 'react',
        compiler: 'webpack5',
        cache: {
            enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
        },
        mini: {
            postcss: {
                pxtransform: {
                    enable: true,
                    config: {

                    },
                },
                url: {
                    enable: true,
                    config: {
                        limit: 1024, // 设定转换尺寸上限
                    },
                },
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]',
                    },
                },
            },
            webpackChain(chain) {
                chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
                chain.plugin('eslint-webpack-plugin')
                .use(EslintWebpackPlugin, [{
                    extensions: ['js', 'jsx', 'ts', 'tsx'],
                    exclude: ['node_modules'],
                    failOnError: true, // 发现错误时中断构建
                }]);
                chain.plugin('fork-ts-checker-webpack-plugin')
                .use(ForkTsCheckerWebpackPlugin, [{
                    async: true, // 设置为同步模式，以确保在构建过程中进行类型检查
                    typescript: {
                        diagnosticOptions: {
                            semantic: true,
                            syntactic: true,
                        },
                        // reportFiles: ["src/**/*.{ts,tsx}", "!src/skip-folder/**/*"], // 配置报错文件范围
                    },
                    // eslint: {
                    //     files: "./src/**/*.{ts,tsx,js,jsx}", // 配置ESLint报错文件范围
                    // },
                }]);        
            },
        },
        h5: {
            publicPath: '/',
            staticDirectory: 'static',
            output: {
                filename: 'js/[name].[hash:8].js',
                chunkFilename: 'js/[name].[chunkhash:8].js',
            },
            miniCssExtractPluginOption: {
                ignoreOrder: true,
                filename: 'css/[name].[hash].css',
                chunkFilename: 'css/[name].[chunkhash].css',
            },
            postcss: {
                autoprefixer: {
                    enable: true,
                    config: {},
                },
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                    config: {
                        namingPattern: 'module', // 转换模式，取值为 global/module
                        generateScopedName: '[name]__[local]___[hash:base64:5]',
                    },
                },
            },
            webpackChain(chain) {
                chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);
                chain.plugin('eslint-webpack-plugin')
                .use(EslintWebpackPlugin, [{
                    extensions: ['js', 'jsx', 'ts', 'tsx'],
                    exclude: ['node_modules'],
                    failOnError: true, // 发现错误时中断构建
                }]);
                chain.plugin('fork-ts-checker-webpack-plugin')
                .use(ForkTsCheckerWebpackPlugin, [{
                    async: false, // 设置为同步模式，以确保在构建过程中进行类型检查
                    typescript: {
                        diagnosticOptions: {
                            semantic: true,
                            syntactic: true,
                        },
                        // reportFiles: ["src/**/*.{ts,tsx}", "!src/skip-folder/**/*"], // 配置报错文件范围
                    },
                    // eslint: {
                    //     files: "./src/**/*.{ts,tsx,js,jsx}", // 配置ESLint报错文件范围
                    // },
                }]);   
            },
        },
        rn: {
            appName: 'taroDemo',
            postcss: {
                cssModules: {
                    enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
                },
            },
        },
    };
    if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
        return merge({}, baseConfig, devConfig);
    }
    // 生产构建配置（默认开启压缩混淆等）
    return merge({}, baseConfig, prodConfig);
});

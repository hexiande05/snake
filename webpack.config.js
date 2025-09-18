const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    //指定打包环境
    mode: 'development',
    //入口文件
    entry: './src/index.ts',
    //指定打包文件所在目录
    output: {
        path: path.resolve(__dirname, 'public'),
        //指定打包后的文件名
        filename: 'boundle.js',

        //告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false,
            const: false
        }
    },
    //指定打包模式
    module: {
        //指定要加载的规则
        rules: [
            {
                //指定规则生效的文件
                test: /\.ts$/,
                use: [
                    //配置babel
                    {
                        loader: "babel-loader",
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        targets: {
                                            "chrome": "88",
                                        },
                                        //指定corejs的版本
                                        "corejs": "3",
                                        //使用corejs的方式 "usage"表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            //less文件的处理
            {
                test: /\.less$/,
                //从下往上 执行
                use: [
                    "style-loader",
                    "css-loader",
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]

                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }

        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}
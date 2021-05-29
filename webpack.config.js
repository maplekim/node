const path = require('path');

module.exports = {
    entry: {
        index: [
            path.join(__dirname, "src", "reactivex.js")
        ]
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },

    resolve: {
        extensions: [".js"],
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/
            }
        ],
    },

    devtool: "source-map",

    devServer: {
        contentBase: path.join(__dirname, "view"),
        hot: true,
        // 존재하지 않는 URL인 경우 404 응답(Response)을 내보내는 것이 아니라 index.html을 응답(Response)하도록 설정
        // TODO. 서버에서 특정경로로 들어올 경우 처리가 필요함
        historyApiFallback: true
    }
};

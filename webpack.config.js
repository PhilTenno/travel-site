const path = require('path');

const postCSSPlugins = [
    require['postcss-mixins'],
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('postcss-nested'),
    require('autoprefixer')
];

module.exports = {
    entry: './app/assets/scripts/App.js',
    output: {
        filename: 'bundled.js',
        path: path.resolve(__dirname, 'app')
    },
    devServer: {
        /*automatischer Reload des Browser: localhost*/
        //HTML->vollständiger Reload
        before: function(app,server){
            server._watch('./app/**/*.html')
        },
        //JS & CSS -> update ohne reload
        contentBase: path.join(__dirname, 'app'),
        //hot (hot module replacement) -> update ohne reload
        hot: true,
        port: 3000,
        //Zugang für Smartphones -> lokale IP:3000
        host: '0.0.0.0'
    },
    mode: 'development',
    //watch: true,
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader?url=false', {loader: 'postcss-loader',options:{postcssOptions:{plugins: postCSSPlugins}}}]
            }
        ]
    }
}
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: "production",
    entry: './src/script.js',
    output: {
        filename: 'script.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new Dotenv()
    ]
}
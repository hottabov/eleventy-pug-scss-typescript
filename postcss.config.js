module.exports = {
    plugins: [
        require('css-mqpacker')(),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
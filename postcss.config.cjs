module.exports = {
    plugins: [
        require('postcss-sort-media-queries')({
            sort: 'mobile-first', // or 'desktop-first'
        }),
        require('cssnano')({
            preset: 'default',
        }),
    ],
};
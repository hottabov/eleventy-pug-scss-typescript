import pugPlugin from "@11ty/eleventy-plugin-pug";
import eleventyNavigation from "@11ty/eleventy-navigation";
import {DateTime} from "luxon";
import {eleventyImageTransformPlugin} from '@11ty/eleventy-img';
import path from 'path';
import htmlMinifier from 'html-minifier';
import cssnano from 'cssnano';
import postcss from 'postcss';
import sitemap from "@quasibit/eleventy-plugin-sitemap";


export default function (eleventyConfig) {

    eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
        // which file extensions to process
        extensions: 'html',
        // optional, output image formats
        formats: ['jpg', 'webp'],
        // optional, output image widths
        widths: [200, 400, 850, 1920, 2500],
        outputDir: 'public/images/',
        urlPath: '/images/',
        // Formatting image file names
        filenameFormat: function (id, src, width, format, options) {
            // Save the original file name
            const extension = path.extname(src);
            const name = path.basename(src, extension);
            // Add the size to the file name
            return `${name}-${width}w.${format}`;
        },
        // optional, attributes assigned on <img> override these values.
        defaultAttributes: {
            loading: 'lazy',
            sizes: '(max-width: 600px) 400px, 850px, 100vw', //default values
            decoding: 'async',
        },
    });

    eleventyConfig.addPlugin(pugPlugin, {
        globals: 'filters',
        async: true,
        debug: true
    });

    eleventyConfig.addPlugin(eleventyNavigation);

    const isProd = process.env.NODE_ENV === "production";

    // Мінімізуємо HTML тільки в продакшені
    if (isProd) {
        eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
            if (outputPath && outputPath.endsWith('.html')) {
                return htmlMinifier.minify(content, {
                    useShortDoctype: true,
                    removeComments: true,
                    collapseWhitespace: true
                });
            }
            return content;
        });
    }

    // Minify CSS only in production
    eleventyConfig.addTransform('postcss', async function (content, outputPath) {
        if (isProd && outputPath && outputPath.endsWith('.css')) {
            let output = await postcss([cssnano]).process(content, {from: outputPath});
            return output.css;
        }
        return content;
    });

    eleventyConfig.addCollection("navPages", function (collectionApi) {
        return collectionApi.getAll().filter((item) => {
            return "eleventyNavigation" in item.data;
        });
    });

    eleventyConfig.addCollection("blog", function (collection) {
        return collection.getFilteredByGlob("./src/blog/*.md").sort((a, b) => {
            return b.date - a.date;
        });
    });

    eleventyConfig.setBrowserSyncConfig({
        files: [
            './public/css/**/*.css',
            './public/**/*.html',
            './src/**/*.pug',
            './src/ts/**/*.ts',
            './public/js/**/*.js'
        ],
        injectChanges: true,
        watch: true,
        logLevel: "info"
    });

    eleventyConfig.addWatchTarget("./src/scss/**/*.scss")

    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/_redirects');
    eleventyConfig.addPassthroughCopy('./src/robots.txt');

    // normally, 11ty will render dates on blog posts in full JSDate format (Fri Dec 02 18:00:00 GMT-0600). That's ugly
    // this filter allows dates to be converted into a normal, locale format. view the docs to learn more (https://moment.github.io/luxon/api-docs/index.html#datetime)
    eleventyConfig.addFilter('postDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.setTemplateFormats(["md", "pug", "njk"]);

    eleventyConfig.addPlugin(sitemap, {
        lastModifiedProperty: "modified",
        sitemap: {
            hostname: "https://leonov.pp.ua", // replace with your website URL
            changefreq: "weekly",
            priority: 0.8,
        }
    });

    return {
        dir: {
            input: 'src',
            includes: '_includes',
            layouts: "_layouts",
            output: 'public',
        }
    };
}
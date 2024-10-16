# Eleventy + Pug + SCSS + TypeScript Starter Kit

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
- [How it Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Under the Hood](#under-the-hood)
- [Plans](#plans)
- [License](#license)

## Overview

In my daily work, I rely heavily on **Pug** for its significant acceleration in writing HTML, utilizing loops, templates, and making everything visually clearer. After spending a considerable amount of time integrating Pug into **Eleventy 3**, I finally breathed a sigh of relief. Moreover, I cannot imagine writing **CSS** without **SCSS**. By combining **Pug** and **SCSS**, you can boost your development speed significantly!

Having tried many static site generators—from **Gulp** to **Webpack**, and finally **Parcel**—I settled on **Eleventy**. While Eleventy also requires some customization, it runs much faster and, most importantly, has a blog system that transforms static websites into a mini CMS.

The design of this website is based on [this repository](https://github.com/Oak-Harbor-Kits/Starter-Kit-V4-Eleventy). I appreciate the great work and detailed guide by the author. This kit includes the same file structure but has been enhanced and refined. It will continue to be updated as it has become my primary development tool.

## Features
- **Eleventy 3** static site generator.
- **Pug** templating engine for faster HTML development.
- **SCSS** for modular, maintainable, and efficient CSS styling.
- **TypeScript** for strongly typed JavaScript development.
- **PostCSS** with **cssnano** for CSS minification.
- **Terser** for JavaScript minification.
- **Eleventy Image Plugin** for responsive image generation and optimization.
- **Luxon** for handling dates and times in templates.
- Integrated **BrowserSync** for live reloading during development.
- Blog functionality with featured posts support.

## Technologies
- **Eleventy (11ty)**: Static site generator.
- **Pug**: Templating engine that simplifies HTML.
- **SCSS**: CSS preprocessor for writing cleaner and more maintainable CSS.
- **TypeScript**: Type-safe JavaScript.
- **PostCSS & cssnano**: CSS post-processing and minification.
- **Terser**: JavaScript minifier.
- **Luxon**: Date and time formatting.
- **Eleventy Image Plugin**: Optimized image generation and responsive loading.
- **BrowserSync**: Live-reload server for development.

## File Structure
```bash
├── src
│   ├── _includes      # Pug templates and partials
│   ├── _layouts       # Layout files for pages
│   ├── assets         # Static assets (images, fonts)
│   ├── blog           # Blog posts in Markdown format
│   ├── scss           # SCSS stylesheets
│   ├── ts             # TypeScript files
│   ├── pages          # Page templates in Pug
│   └── robots.txt     # Robots file
├── public             # Generated output
│   ├── css            # Compiled CSS
│   ├── js             # Compiled and minified JS
│   ├── images         # Processed images
├── eleventy.config.js # Eleventy configuration file
├── package.json       # npm scripts and dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```
## How it Works

**Eleventy** compiles Pug templates and Markdown files into static HTML files.
**SCSS** is compiled into CSS and minified using PostCSS with cssnano.
**TypeScript** is compiled into JavaScript and minified with Terser.
**Eleventy** Image Plugin processes images into responsive formats and serves them efficiently. Unfortunately, I have not been able to make the class provided by <img> reassigned to <picture>. After reading the developers forum, I found out that this feature is still in development.
**BrowserSync** enables live reloading when files change during development.

## Installation

### 1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-folder>
```
### 2. Install dependencies:
```bash
git clone <repository-url>
cd <repository-folder>
```

### 3. Set up the project structure:
Make sure your folder structure follows the file structure described above.

## Usage

### Development

1.	Start the development server:
```bash
npm start
```
This will:
- Clean the public folder.
- Compile SCSS into CSS.
- Compile TypeScript into JavaScript.
- Run Eleventy in serve mode.
 -Automatically reload the browser on file changes via BrowserSync.

2. Working with templates and styles:

- Pug templates are located in the src/pages folder.
- SCSS files are in the src/scss folder.
- TypeScript's files are located in the src/ts folder.

### Production Build

1.	Build for production:
```bash
npm run build
```

This will:
- Clean the public directory.
- Compile and minify SCSS and JavaScript.
- Generate optimized images.
- Produce a fully static website ready for deployment.

## Under the Hood

- **Eleventy** processes templates from the src directory and outputs them to the public directory.
- **SCSS** files are compiled into CSS and placed in the public/css directory.
- **TypeScript's** files are compiled into JavaScript and placed in the public/js directory.
- **PostCSS** processes the compiled CSS for minification.
- **Terser** is used to minify JavaScript files.
- **BrowserSync** ensures live-reloading of the development server.
- **Luxon** handles date formatting within templates.
- The **Eleventy Image Plugin** is configured to optimize images and serve responsive versions.

## Plans

I am planning to add mixins for SCSS and PUG to the build to shorten the code and speed up development. For now, I'm releasing this version as is and will be happy to receive any comments and suggestions. You can contact me directly at any time by writing to me on Telegram - [t.me/hottabov](https://t.me/hottabov).

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as needed. 
/*eslint-disable*/
const { lstatSync, readdirSync, writeFileSync } = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src');

const isComponentDirectory = (source) => {
    const ignoredDirectories = ['utils', 'playground', 'ContextualMenu'];
    return lstatSync(source).isDirectory() && !ignoredDirectories.some(ignored => source.includes(ignored));
};

const isComponentFile = (source) => {
    const ignoredFiles = ['test', 'Component', 'index', 'snapshots'];
    return !ignoredFiles.some(ignored => source.includes(ignored));
};

const isComponentExported = (source) => {
    return !source.match(/^\_/);
};


const componentDirs = readdirSync(srcPath).map(name => path.join(srcPath, name)).filter(isComponentDirectory).map(directory => {
    return {
        path: directory,
        files: readdirSync(directory).filter(isComponentFile),
        fileNames: readdirSync(directory).filter(isComponentFile).filter(isComponentExported)
    };
});

// For every component directory.
componentDirs.map((directory) => {
    let fileContents = '';
    // Loop through its files.
    directory.fileNames.map((fileName) => {
        // Grab the file's exports.
        let components = require(path.join(directory.path, fileName));
        
        Object.keys(components).map((component) => {
            let paths = directory.path.split('/')
            let last = paths[paths.length-1]

            if (component === 'default') {
                fileContents += `export { default as ${components.default.name} } from '../lib/${last}/${fileName}';\n`;
            } else {
                fileContents += `export { ${component} } from './${fileName}';\n`;
            }
        });
    });
    // write the index file into the directory.
    let indexPath = path.join(directory.path, 'index.js');
    writeFileSync(indexPath, fileContents);
});

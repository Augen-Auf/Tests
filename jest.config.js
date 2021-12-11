const config = {
    verbose:false,
    preset: "jest-puppeteer",
    testRegex: "./src/.*.js$",
    rootDir: ".",
    testTimeout: 10000
};

module.exports = config;

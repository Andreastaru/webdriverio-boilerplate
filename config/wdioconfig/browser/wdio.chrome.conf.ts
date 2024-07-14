import { join } from 'path';
import { config } from '../wdio.shared.conf';

//
// =====================
// Server Configurations
// =====================
// For Selenium Grid
// config.port = 4444;
//
// ============
// Specs
// ============
// Define which test specs should run. The pattern is relative to the directory
// from which `wdio` was called.
//
// The specs are defined as an array of spec files (optionally using wildcards
// that will be expanded). The test for each spec file will be run in a separate
// worker process. In order to have a group of spec files run in the same worker
// process simply enclose them in an array within the specs array.
//
// If you are calling `wdio` from an NPM script (see https://docs.npmjs.com/cli/run-script),
// then the current working directory is where your `package.json` resides, so `wdio`
// will be called from there.
//
config.specs = ['../../../test/specs/**/*.ts'];
// Patterns to exclude.
//config.exclude = [
// 'path/to/excluded/files'
//];
// Suites
config.suites = {};
//
// ============
// Capabilities
// ============
// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
// time. Depending on the number of capabilities, WebdriverIO launches several test
// sessions. Within your capabilities you can overwrite the spec and exclude options in
// order to group specific specs to a specific capability.
//
// First, you can define how many instances should be started at the same time. Let's
// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
// files and you set maxInstances to 10, all spec files will get tested at the same time
// and 30 processes will get spawned. The property handles how many capabilities
// from the same test should run tests.
//
config.maxInstances = 10;
//
// If you have trouble getting all important capabilities together, check out the
// Sauce Labs platform configurator - a great tool to configure your capabilities:
// https://docs.saucelabs.com/reference/platforms-configurator
//
config.capabilities = [
    {
        // maxInstances can get overwritten per capability. So if you have an in-house Selenium
        // grid with only 5 firefox instances available you can make sure that not more than
        // 5 instances get started at a time.
        maxInstances: 5, // 5
        //
        browserName: 'chrome', // https://webdriver.io/docs/driverbinaries/#chromedriver
        acceptInsecureCerts: true,
        // @ts-ignore // Because 'wdio:chromedriverOptions' does not exist in type 'DesiredCapabilities | W3CCapabilities'
        'wdio:chromedriverOptions': {
            binary: './chromedriver', // For remote machine
        },
        // If outputDir is provided WebdriverIO can capture driver session logs
        // it is possible to configure which logTypes to include/exclude.
        // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
        // excludeDriverLogs: ['bugreport', 'server'],
    },
];
//
// ==============
// Chrome service
// ==============
//
// Services take over a specific job you don't want to take care of. They enhance
// your test setup with almost no effort. Unlike plugins, they don't add new
// commands. Instead, they hook themselves up into the test process.
config.services = (config.services ? config.services : []).concat([
    [
        'chromedriver',
        {
            port: 9515,
            logFileName: 'wdio-chromedriver.log', // default
            outputDir: './logs/chromedriver-logs', // overwrites the config.outputDir
            args: ['--silent', '--disable-extensions'],
        },
    ],
]);
//
// =====
// Hooks
// =====
//
/**
 * Hook that gets executed before the suite starts
 * @param {Object} suite suite details
 */
config.beforeSuite = function (suite) {
    browser.setTimeout({
        implicit: 2000,
        pageLoad: 10000,
        script: 1000,
    });
    browser.maximizeWindow();
    browser.url(<string>config.baseUrl);
};

exports.config = config;

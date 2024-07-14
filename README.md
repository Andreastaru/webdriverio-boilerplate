# WebdriverIO WEB Testing Boilerplate

**Introduction**

This boilerplate project provides a sample and ready-to-use template for end-to-end (e2e) and UI test automation using Mocha and WebdriverIO v8. As a QA Engineer, you can use this project to get started with UI testing quickly and efficiently.

**What You Need to Get Started**
To get started with UI test automation using WebdriverIO, you'll need:

-   Node.js and npm installed on your system
-   A basic understanding of JavaScript and UI testing concepts
-   Familiarity with WebdriverIO and Mocha (optional, but recommended)
-   A browser installed on your system (Chrome)

**Features**

-   WebdriverIO v8
-   Page Object model
-   Component model example (reusable ui parts within a page)
-   Screenshot capture for failing tests
-   Logger
-   Sample spec and form file using my Portfolio Website: [<img src="https://img.shields.io/badge/Andreas%20React-https://andreasreact.netlify.app/-blue" alt="Portfolio Website">](https://andreasreact.netlify.app/)
-   Running with wdio.conf no need for browser.url(YourUrl)
    **What is WebdriverIO?**

WebdriverIO is a popular test automation framework that allows you to write UI tests in a simple and efficient way. It provides a lot of features out of the box, including support for multiple browsers, mobile testing, and more.

**Project Structure**

The project is organized into the following folders and files:

-   `specs`: Contains the test specifications
-   `pageobjects`: Contains the page object models
-   `wdio.shared.conf.ts`: The WebdriverIO configuration file
-   `package.json`: The project dependencies and scripts

**How to Start**

**Download or clone the project**

**Install**

`npm install`

(optional) Might need different chromedriver

`npm install --save-dev chromedriver@YOURCHROMEVERSION`

**Run Tests**

`npm run test`

**Troubleshooting**

-   If you encounter issues with chromedriver, try updating to the latest version.
-   If you encounter issues with test failures, check the screenshot captures for more information.

**Tips and Tricks**

### 1. Use the `browser.debug()` command to pause the test execution

When debugging tests, use the `browser.debug()` command to pause the test execution and inspect the browser state.

### 2. Leverage the power of Page Objects

Page Objects are a great way to encapsulate the logic of a page and make your tests more maintainable. Use them to define the elements and actions on a page.

### 3. Take advantage of WebdriverIO's built-in wait mechanisms

WebdriverIO provides built-in wait mechanisms, such as `waitForVisible` and `waitForEnabled`, to help you wait for elements to be visible or enabled.

### 4. Use the `logger.debug()` statement to debug tests

When debugging tests, use the `logger.debug()` statement to print out information about the test execution.

### 5. Run tests in parallel to speed up test execution

Use WebdriverIO's built-in parallel testing feature to run tests in parallel and speed up test execution.

### 6. Learn more about WebdriverIO

[<img src="https://img.shields.io/badge/WebdriverIO%20API-https://webdriver.io/docs/api/-green" alt="WebdriverIO API">](https://webdriver.io/docs/api)

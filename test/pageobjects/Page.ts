import logger from '../services/logger';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
    private readonly errorMessage: string =
        'Element is not found with such label: ';

    // DOM shared tags
    private readonly anchor: string = 'a';
    private readonly input: string = 'input';
    button: string = 'button';

    async open(path: string) {
        return browser.url(path);
    }

    async getPageTitle(): Promise<string> {
        const title: string = await browser.getTitle();
        logger.info(`Returning page title: ${title}`);
        return title;
    }

    async waitForIsShown(
        isShown: boolean = true,
        timeout: number = 12000,
        interval: number = 2000,
        elementToWait?: any
    ): Promise<boolean | void> {
        const element: WebdriverIO.Element =
            elementToWait !== undefined
                ? elementToWait
                : await $(elementToWait);
        logger.info(`Waiting for element to be displayed: ${element.selector}`);

        try {
            return await element.waitForDisplayed({
                timeout: timeout,
                reverse: !isShown,
                interval: interval,
            });
        } catch (error) {
            const selector: string = element.selector.toString();
            logger.info(
                `Element did not appear within ${timeout}ms: ${selector} `
            );
            await driver.saveScreenshot(`./errorshots/${selector}.png`);
            return false;
        }
    }

    async waitForElementIsShown(
        element: WebdriverIO.Element,
        timeout: number = 10000,
        isShown: boolean = true
    ): Promise<boolean | void> {
        return await this.waitForIsShown(isShown, timeout, 1000, element);
    }

    async waitForElementIsShownInViewport(
        element: WebdriverIO.Element,
        timeout: number = 10000
    ): Promise<boolean | void> {
        await element.waitUntil(() => element.isDisplayedInViewport(), {
            timeout,
        });
    }

    async userScrollsIntoView(element: WebdriverIO.Element) {
        await this.sleep();
        await element.scrollIntoView();
        await this.sleep();
    }

    async clickElement(
        element: WebdriverIO.Element,
        sleepTime?: number
    ): Promise<boolean> {
        const isExisting = await element.isExisting();
        const elementsText = await element.getText();

        logger.info(`Clicking on element with selector: ${element.selector}`);

        if (isExisting) {
            await browser.execute(el => el.click(), element); // Selenium has default behaviour of scrollIntoView so i needed to find a workaround to let the page navigate user.
            if (sleepTime) await this.sleep(sleepTime);
            logger.debug(` Element (with text) is clicked: ${elementsText}`);
        }

        return isExisting;
    }

    async getElementText(element: WebdriverIO.Element): Promise<string> {
        const elementText = await element.getText();
        logger.info(
            `Element with selector ${element.selector} has text: ${elementText}`
        );
        return elementText;
    }

    async clickElementBySelector(selector: string): Promise<boolean> {
        return await this.clickElement(await $(selector));
    }

    async clickButtonWithText(text: string): Promise<boolean> {
        return await this.clickElementBySelector(`${this.button}=${text}`);
    }

    async getCurrentUrl(): Promise<string> {
        const currentUrl: string = await browser.getUrl();
        logger.info(`Returning current url: ${currentUrl}`);
        return currentUrl;
    }

    async sleep(ms: number = 1250): Promise<void> {
        logger.info(`Sleeping ms: ${ms}`);
        await browser.pause(ms);
    }

    async clickAnchorContainingText(text: string): Promise<boolean> {
        const element: WebdriverIO.Element = await $(`${this.anchor}*=${text}`);
        return await this.clickElement(element);
    }

    async findElementByLabel(
        elements: Array<WebdriverIO.Element>,
        label: string
    ): Promise<WebdriverIO.Element> {
        for (const element of elements) {
            logger.debug(
                `Iterating elements with text: "${label}" = "${await element.getText()}"?`
            );

            if (
                (await element.getText()).includes(label) &&
                (await element.isDisplayedInViewport())
            ) {
                logger.debug(
                    ` Returning found by label "${label}" element with id "${elements.indexOf(element)}". Its selector is "${element.selector}"`
                );
                return element;
            }
        }
        throw new Error(`E${this.errorMessage}${label}`);
    }

    async getParentElementByLabel(
        elements: Array<WebdriverIO.Element>,
        label: string
    ): Promise<WebdriverIO.Element> {
        for (const element of elements) {
            logger.debug(
                `Iterating elements with text: "${label}" = "${await element.getText()}"?`
            );

            if (
                (await element.getText()).includes(label) &&
                (await element.isDisplayedInViewport())
            ) {
                const parentElement: WebdriverIO.Element =
                    await element.parentElement();
                logger.debug(
                    ` Returning found by label "${label}" element's parent element: ${Object.entries(parentElement.parent).find(node => node.includes('selector'))}`
                );
                return parentElement;
            }
        }
        throw new Error(`Parent e${this.errorMessage}${label}`);
    }

    async setValueToElement(
        element: WebdriverIO.Element,
        value: string | number
    ): Promise<boolean> {
        const isExisting: boolean = await element.isExisting();
        if (isExisting) {
            await this.clickElement(element);
            logger.info(
                `Setting value "${value}" to field with selector "${element.selector}"`
            );
            await element.setValue(value);
        }
        return isExisting;
    }

    async setJSONValueToElement(
        element: WebdriverIO.Element,
        value: JSON
    ): Promise<boolean> {
        const isExisting: boolean = await element.waitForExist({
            timeout: 3000,
            interval: 2,
        });
        if (isExisting) {
            await this.clickElement(element);
            logger.info(
                `Setting value "${value}" to field with selector "${element.selector}"`
            );
            await element.setValue(JSON.stringify(value));
        }
        return isExisting;
    }

    async setValueToInputFieldByParentElementLabel(
        elements: Array<WebdriverIO.Element>,
        value: string,
        label: string
    ): Promise<boolean> {
        return await this.setValueToInputFieldOfElement(
            await this.getParentElementByLabel(elements, label),
            value,
            label
        );
    }

    async setValueToInputFieldOfElementFoundByLabel(
        elements: Array<WebdriverIO.Element>,
        value: string,
        label: string
    ): Promise<boolean> {
        return await this.setValueToInputFieldOfElement(
            await this.findElementByLabel(elements, label),
            value,
            label
        );
    }

    private async setValueToInputFieldOfElement(
        element: WebdriverIO.Element,
        value: string,
        label: string
    ): Promise<boolean> {
        if (label !== null) {
            logger.info(
                `Setting value "${value}" to input field of element found by label "${label}"`
            );
            return this.clearInputElementAndSetValue(
                await element.$(this.input),
                value
            );
        }

        logger.info(`Setting value "${value}" to input field`);
        return this.clearInputElementAndSetValue(await $(this.input), value);
    }

    private async clearInputElementAndSetValue(
        element: WebdriverIO.Element,
        value: string
    ): Promise<boolean> {
        const isExisting = await element.isExisting();
        if (isExisting) {
            await this.clearInputValue(element);
            logger.info(
                `Setting value "${value}" to the element: ${element.selector}`
            );
            await element.setValue(value);
        }
        return isExisting;
    }

    async clearInputValue(element: WebdriverIO.Element): Promise<boolean> {
        let isCleared: boolean = false;
        const keysArray: string[] = ['Control', 'a', 'Control', 'Delete'];
        if (await this.clickElement(element)) {
            logger.info(`Clearing value of the element ${element.selector}`);
            await browser.keys(keysArray);
            isCleared = true;
        }
        return isCleared;
    }

    async loggingBrowserErrors(): Promise<void> {
        const browserLogs = await browser.getPageLogs('console');
        browserLogs.forEach((log: { message: string }) =>
            logger.debug(log.message)
        );
    }

    async selectFirstOption(element: WebdriverIO.Element): Promise<void> {
        logger.info('Choosing first element from the drop-down');
        await this.clickElement(element);
        await this.sleep(); // Waiting for options to load, some cases front-end triggers api and it takes little time
        await browser.keys('ArrowDown');
        await browser.keys('Enter');
        logger.debug(`Selected option named as: ${await element.getText()}`);
    }

    async typeSomethingAndSelectFirstOption(
        element: WebdriverIO.Element,
        textOrNumber: string | number
    ): Promise<void> {
        await element.setValue(textOrNumber);
        await this.sleep(); // Waiting for options to load, some cases front-end triggers api and it takes little time
        await browser.keys('Enter');
        logger.debug(`Selected option named as: ${await element.getValue()}`);
    }
}

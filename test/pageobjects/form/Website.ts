import Page from '../Page';
import logger from '../../services/logger';

class Website extends Page {
    get languageActive(): Promise<WebdriverIO.Element> {
        return $('button[class*="_active"]');
    }

    get aboutLink(): Promise<WebdriverIO.Element> {
        return $('a[href="#about"]');
    }

    get experienceLink(): Promise<WebdriverIO.Element> {
        return $('a[href="#experience"]');
    }

    get projectsLink(): Promise<WebdriverIO.Element> {
        return $('a[href="#projects"]');
    }
    get contactLink(): Promise<WebdriverIO.Element> {
        return $('a[href="#contact"]');
    }

    get portfolio(): Promise<WebdriverIO.Element> {
        return $('a[href="/"]');
    }

    get aboutSectionServerIcon(): Promise<WebdriverIO.Element> {
        return $('img[alt="Server icon"]');
    }

    get contactSectionGithubIcon(): Promise<WebdriverIO.Element> {
        return $('img[alt="github"]');
    }

    async changeLanguageToEstonian() {
        await super.userScrollsIntoView(await this.languageActive);
        await super.clickButtonWithText('ET');
    }

    async navigateToTheAboutSection() {
        await this.navigateOnTheSite();
        await super.clickElement(await this.aboutLink);
        await super.waitForElementIsShownInViewport(
            await this.aboutSectionServerIcon
        );
    }

    async navigateToTheContactSection() {
        const contact: WebdriverIO.Element = await this.contactLink;
        super.userScrollsIntoView(contact);
        await super.clickElement(contact);
        await super.waitForElementIsShownInViewport(
            await this.contactSectionGithubIcon
        );
    }

    async navigateOnTheSite() {
        const portfolioWebsite: string = await super.getCurrentUrl();
        await logger.debug(
            `Checking navigation on the site ${portfolioWebsite}`
        );
    }

    async smokeTestOnTheLanguage() {
        const about: WebdriverIO.Element = await this.aboutLink;
        await logger.debug('This page default language should be English');
        await super.waitForElementIsShown(about);
        await super.getElementText(about);
    }
}

export default new Website();

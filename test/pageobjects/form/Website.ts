import Page from '../Page';
import logger from '../../services/logger';

import contactFormData from '../../test-data/contactForm.json';

class Website extends Page {
    get aboutLink(): Promise<WebdriverIO.Element> {
        return $('a[href="/about"]');
    }

    get contactLink(): Promise<WebdriverIO.Element> {
        return $('a[href="/contact"]');
    }

    get contactForm(): Promise<WebdriverIO.Element> {
        return $('#CONTACTFORM');
    }

    get nameInputField(): Promise<WebdriverIO.Element> {
        return $('input[name="name"]');
    }

    get emailInputField(): Promise<WebdriverIO.Element> {
        return $('input[name="email"]');
    }

    get messageTextarea(): Promise<WebdriverIO.Element> {
        return $('textarea[name="message"]');
    }

    get submitButton(): Promise<WebdriverIO.Element> {
        return $('button[type="submit"]');
    }
    get successText(): Promise<WebdriverIO.Element> {
        return $('#SUCCESS');
    }

    async navigateToTheAboutSection() {
        await this.navigateOnTheSite();
        await super.clickElement(await this.aboutLink);
        return super.getCurrentUrl();
    }

    async navigateToTheContactSection() {
        await super.clickElement(await this.contactLink);
        return super.getCurrentUrl();
    }

    async navigateOnTheSite() {
        const portfolioWebsite: string = await super.getCurrentUrl();
        logger.debug(`Checking navigation on the site ${portfolioWebsite}`);
    }

    async fillOutTheForm() {
        await super.setValueToElement(
            await this.nameInputField,
            contactFormData.name
        );
        await super.setValueToElement(
            await this.emailInputField,
            contactFormData.email
        );
        await super.setValueToElement(
            await this.messageTextarea,
            contactFormData.message
        );
    }

    async submitTheForm() {
        super.clickElement(await this.submitButton);
        super.waitForElementIsShown(await this.successText);
    }
}

export default new Website();

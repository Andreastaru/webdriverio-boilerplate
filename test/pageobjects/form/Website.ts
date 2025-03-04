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

    async navigateToTheAboutSection(): Promise<string> {
        await this.navigateOnTheSite();
        await super.clickElement(await this.aboutLink);
        return super.getCurrentUrl();
    }

    async navigateToTheContactSection(): Promise<string> {
        await super.clickElement(await this.contactLink);
        return super.getCurrentUrl();
    }

    async navigateOnTheSite(): Promise<void> {
        const portfolioWebsite: string = await super.getCurrentUrl();
        logger.debug(`Checking navigation on the site ${portfolioWebsite}`);
    }

    async fillOutTheForm(): Promise<void> {
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

    async submitTheForm(): Promise<string> {
        await super.clickElement(await this.submitButton);
        await super.waitForElementIsShown(await this.successText);
        return (await this.successText).getText();
    }
}

export default new Website();

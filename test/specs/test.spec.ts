import { expect } from '@wdio/globals';
import Website from '../pageobjects/form/Website';
import { websiteUrl } from '../../constants';

describe('My application', () => {
    it('Should navigate on the page', async () => {
        expect(await Website.navigateToTheAboutSection()).toContain(
            websiteUrl + '/about'
        );

        expect(await Website.navigateToTheContactSection()).toContain(
            websiteUrl + '/contact'
        );
    });

    it('Should fill the Contact form', async () => {
        expect(await Website.contactForm).toBeDisplayed();
        await Website.fillOutTheForm();
        await Website.submitTheForm();
        expect(await Website.successText).toHaveText(
            'Thank you for your message! I have received it and will get back to you soon.'
        );
    });
});

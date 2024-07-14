import { expect } from '@wdio/globals';
import Website from '../pageobjects/form/Website';

describe('My application', () => {
    it('Should show English language as default language', async () => {
        await Website.smokeTestOnTheLanguage();
        await expect(await Website.languageActive).toHaveText('EN');
        await expect(await Website.portfolio).toHaveText('Portfolio');
    });

    it('Should navigate automatically', async () => {
        await Website.navigateToTheAboutSection();
        await expect(
            await Website.aboutSectionServerIcon
        ).toBeDisplayedInViewport();
        await Website.navigateToTheContactSection();
        await expect(
            await Website.contactSectionGithubIcon
        ).toBeDisplayedInViewport();
    });

    it('Should change language to Estonian', async () => {
        await Website.changeLanguageToEstonian();
        await expect(await Website.languageActive).toHaveText('ET');
        await expect(await Website.aboutLink).toHaveText('Minust');
    });
});

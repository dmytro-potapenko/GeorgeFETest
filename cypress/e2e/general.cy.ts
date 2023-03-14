import { CY_LOCATORS } from '../../src/shared/cyLocators';
import { getCyIdSelector } from '../utils';

import { visit } from './utils';

describe('general spec', () => {
    it('TC_NUMBER: should have a proper logo text', () => {
        visit();

        cy.get(getCyIdSelector(CY_LOCATORS.HEADER))
            .get(getCyIdSelector(CY_LOCATORS.HEADER__LOGO_TEXT))
            .should('contain', 'George FE Test');
    });

    it('TC_NUMBER: should display a spinner while data is loading', () => {
        visit();

        cy.get(getCyIdSelector(CY_LOCATORS.SPINNER)).should('exist');
    });

    it('TC_NUMBER: should display not found text if the user goes to the route which does not exist', () => {
        cy.visit('http://localhost:3000/fake-route');

        cy.get(getCyIdSelector(CY_LOCATORS.INFO_SCREEN))
            .find(getCyIdSelector(CY_LOCATORS.INFO_SCREEN__TEXT))
            .should('contain', 'Page not found 😕');
    });
});

// eslint-disable-next-line spaced-comment
///  <reference types="cypress" />

import { CY_LOCATORS } from '../../src/shared/cyLocators';
import { getCyIdSelector } from '../utils';

import {
    errorCountriesRequest,
    errorCurrenciesRequest,
    successCountriesRequest,
    successCurrenciesRequest,
    verifySomethingWentWrongScreen,
    visit,
    wrongCountriesRequest,
    wrongCurrenciesRequest,
} from './utils';

describe('search spec', () => {
    describe('Base tests', () => {
        beforeEach(() => {
            successCurrenciesRequest();
            successCountriesRequest();
        });

        it('TC_NUMBER: should be auto redirected to the `/search` route if the user lands on `/`', () => {
            cy.visit('http://localhost:3000');
            cy.url().should('include', '/search');
        });

        it('TC_NUMBER: should have proper wording across the search screen', () => {
            visit();

            cy.get(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER))
                .get(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER__HEADER__LEFT_TEXT))
                .should('contain', 'Currency');
            cy.get(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER))
                .get(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER__HEADER__RIGHT_TEXT))
                .should('contain', 'Buy / Sell EUR');
        });
    });

    describe('Success requests', () => {
        beforeEach(() => {
            successCurrenciesRequest();
            successCountriesRequest();
            visit();
        });

        it('TC_NUMBER: should render proper data according to what data was received', () => {
            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .should('have.length', 2);

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(0)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__FLAG))
                .should('exist');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(1)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__FLAG))
                .should('exist');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(0)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__INFO))
                .should('contain', 'Fiji (Fiji Dollar - FJD)');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(1)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__INFO))
                .should('contain', 'Mexico (Mexican Peso - MXN)');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(0)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__CURRENCY_RATE))
                .find('p')
                .should('contain', '2.00 / 2.50');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(1)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__CURRENCY_RATE))
                .find('p')
                .should('contain', '22.38 / 23.58');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(0)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__CURRENCY_RATE))
                .find('b')
                .should('contain', 'EUR');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .eq(1)
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM__CURRENCY_RATE))
                .find('b')
                .should('contain', 'EUR');
        });

        it('TC_NUMBER: should filter search items according to the entered value in the search header', () => {
            cy.get(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER__SEARCH_INPUT))
                .type('fi');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .should('have.length', 1);

            cy.get(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.STICKY_CONTAINER__SEARCH_INPUT))
                .clear()
                .type('fake-string');

            cy.get(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER))
                .find(getCyIdSelector(CY_LOCATORS.SEARCH_ITEMS_CONTAINER__ITEM))
                .should('have.length', 0);
        });
    });

    describe('Error requests', () => {
        it('TC_NUMBER: should display something went wrong screen if any of the requests failed', () => {
            errorCurrenciesRequest();
            errorCountriesRequest();
            visit();

            verifySomethingWentWrongScreen();
        });

        it('TC_NUMBER: should display something went wrong screen if any of the requests failed', () => {
            successCurrenciesRequest();
            errorCountriesRequest();
            visit();

            verifySomethingWentWrongScreen();
        });

        it('TC_NUMBER: should display something went wrong screen if any of the requests failed', () => {
            errorCurrenciesRequest();
            successCountriesRequest();
            visit();

            verifySomethingWentWrongScreen();
        });

        it("TC_NUMBER: should display something went wrong screen if the received data is wrong and can't be properly mapped", () => {
            wrongCurrenciesRequest();
            wrongCountriesRequest();
            visit();

            verifySomethingWentWrongScreen();
        });
    });
});

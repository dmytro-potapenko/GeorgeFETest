import { CY_LOCATORS } from '../../src/shared/cyLocators';
import { getCyIdSelector } from '../utils';

export const successCurrenciesRequest = () => {
    cy.fixture('getCurrenciesData').then(data => {
        cy.intercept('GET', '**/currencies/**', {
            statusCode: 200,
            body: data.successResponse,
        }).as('successCurrenciesResponse');
    });
};

export const successCountriesRequest = () => {
    cy.fixture('getCountriesData').then(data => {
        cy.intercept('GET', '**/countries/**', {
            statusCode: 200,
            body: data.successResponse,
        }).as('successCountriesResponse');
    });
};

export const errorCurrenciesRequest = () => {
    cy.fixture('getCurrenciesData').then(data => {
        cy.intercept('GET', '**/currencies/**', {
            statusCode: 404,
            body: data.errorResponse,
        }).as('errorCurrenciesResponse');
    });
};

export const errorCountriesRequest = () => {
    cy.fixture('getCountriesData').then(data => {
        cy.intercept('GET', '**/countries/**', {
            statusCode: 404,
            body: data.errorResponse,
        }).as('errorCountriesResponse');
    });
};

export const wrongCurrenciesRequest = () => {
    cy.fixture('getCurrenciesData').then(data => {
        cy.intercept('GET', '**/currencies/**', {
            statusCode: 200,
            body: data.wrongResponse,
        }).as('wrongCurrenciesResponse');
    });
};

export const wrongCountriesRequest = () => {
    cy.fixture('getCountriesData').then(data => {
        cy.intercept('GET', '**/countries/**', {
            statusCode: 200,
            body: data.wrongResponse,
        }).as('wrongCountriesResponse');
    });
};

export const visit = () => {
    cy.visit('http://localhost:3000');
    cy.url().should('include', '/search');
};

export const verifySomethingWentWrongScreen = () => {
    cy.get(getCyIdSelector(CY_LOCATORS.INFO_SCREEN))
        .find(getCyIdSelector(CY_LOCATORS.INFO_SCREEN__TEXT))
        .should('contain', 'Oops...')
        .should('contain', 'Something went wrong 🙈')
        .should('contain', 'Please try again later');
};

Cypress.Commands.add('autoLogin', (email, password) => {
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}`)
    cy.get('input#email').type(email);
    cy.get('input#password').type(password);
    cy.get('button').contains('Login').click()
    cy.contains('Hello').should('be.visible');
});

Cypress.Commands.add('autoLogin', (email, password) => {
  cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}`);
  cy.get('input#email').type(email);
  cy.get('input#password').type(password);
  cy.get('button').contains('Login').click();
  cy.contains('Hello').should('be.visible');
});

Cypress.Commands.add('paste', { prevSubject: true }, (subject, pastePayload) => {
  cy.wrap(subject).invoke('val', pastePayload).trigger('input');
});

Cypress.Commands.add('logout', () => {
  // Hover over the avatar element to show the dropdown
  cy.get('span.ant-pro-global-header-header-actions-avatar').trigger('mouseover');

  // Give it a small delay to ensure dropdown is rendered
  cy.wait(500); // This wait can be adjusted

  // Click the Logout button
  cy.contains('span.ant-dropdown-menu-title-content', 'Logout').click();
});

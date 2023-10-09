Cypress.Commands.add('autoLogin', (email, password) => {
  // Send a request to check if the user is currently logged in
  cy.request({
    method: 'GET',
    url: '/api/auth/currUser',
    failOnStatusCode: false, // This ensures that a non-2xx response doesn't fail the command
  }).then((response) => {
    // Check the response to determine login status
    if (response.body.data && response.body.data.isLogin === false) {
      // User is not logged in, so perform the login operation
      cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}`);
      cy.get('input#email').type(email);
      cy.get('input#password').type(password);
      cy.get('button').contains('Login').click();
      cy.contains('Hello').should('be.visible');
    } else {
      // User is already logged in, so you can decide if there's any other operation you want to perform
      cy.log('User is already logged in.');
    }
  });
});

Cypress.Commands.add('paste', { prevSubject: true }, (subject, pastePayload) => {
  cy.wrap(subject).invoke('val', pastePayload).trigger('input');
});

Cypress.Commands.add('logout', () => {
  cy.wait(3000); // waits for 3 seconds
  // Hover over the avatar element to show the dropdown
  cy.get('span.ant-pro-global-header-header-actions-avatar').trigger('mouseover');

  // Give it a small delay to ensure dropdown is rendered
  cy.wait(500); // This wait can be adjusted

  // Click the Logout button
  cy.contains('span.ant-dropdown-menu-title-content', 'Logout').click();
});

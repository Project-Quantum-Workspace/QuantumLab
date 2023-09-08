describe('Admin User List', () => {
  beforeEach(() => {
    cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com')
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/admin/users`)
  })

  it('should load user data correctly', () => {
    cy.get('table').should('contain', 'Jarvis Cao');
  });

  // it('shows error notification when fetching users fails', () => {
  //   cy.intercept('GET', '/api/admin/users', {
  //     statusCode: 500
  //   }).as('failedFetch');
  //
  //   cy.visit('/admin/user-list');
  //   cy.wait('@failedFetch');
  //
  //   cy.get('body').should('contain', 'Error Fetching Users');
  // });
  //
  // it('updates multiple users to inactive and shows a notification', () => {
  //   // Select Jane and John
  //   cy.get('table').find('tbody > tr:nth-child(1)').find('td input[type="checkbox"]').click();
  //   cy.get('table').find('tbody > tr:nth-child(2)').find('td input[type="checkbox"]').click();
  //
  //   // Set them to Inactive
  //   cy.get('button').contains('Set Inactive').click();
  //   cy.wait('@setStatus').its('request.body').should('deep.include', {
  //     // Check if the correct uuids are being sent (this might need to be adjusted)
  //   });
  //
  //   // The users should be updated to Inactive
  //   cy.get('table').find('tbody > tr:nth-child(1)').should('contain', 'Inactive');
  //   cy.get('table').find('tbody > tr:nth-child(2)').should('contain', 'Inactive');
  //
  //   // A success notification should be shown
  //   cy.get('body').should('contain', 'Update Successful');
  // });
  //
  // it('updates multiple users to active and shows a notification', () => {
  //   // Select Jane and John
  //   cy.get('table').find('tbody > tr:nth-child(1)').find('td input[type="checkbox"]').click();
  //   cy.get('table').find('tbody > tr:nth-child(2)').find('td input[type="checkbox"]').click();
  //
  //   // Set them to Active
  //   cy.get('button').contains('Set Active').click();
  //   cy.wait('@setStatus').its('request.body').should('deep.include', {
  //     // Check if the correct uuids are being sent (this might need to be adjusted)
  //   });
  //
  //   // The users should be updated to Active
  //   cy.get('table').find('tbody > tr:nth-child(1)').should('contain', 'Active');
  //   cy.get('table').find('tbody > tr:nth-child(2)').should('contain', 'Active');
  //
  //   // A success notification should be shown
  //   cy.get('body').should('contain', 'Update Successful');
  // });
});

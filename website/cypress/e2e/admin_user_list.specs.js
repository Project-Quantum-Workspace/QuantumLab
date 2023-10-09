import { mockAuthIntercepts } from '../utils/authHelpers';

describe('Admin User List', () => {
  before(() => {
    mockAuthIntercepts();
    cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com');
  });

  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/admin/users', { fixture: 'users.json' }).as('fetchUsers');

    // Intercept the PATCH request to update user status and mimic successful update
    cy.intercept('PATCH', '/api/admin/users/**/status', (req) => {
      req.reply({
        statusCode: 200,
        body: { message: 'User updated successfully' },
      });
    });
  });

  it('should have all the expected headers', () => {
    cy.wait('@fetchUsers'); // Wait for the mock API call to complete
    // List out your expected headers
    const expectedHeaders = ['Name', 'User ID', 'Role(s)', 'Status'];

    // Check for the selection checkbox in the header
    cy.get('th').find('input[aria-label="Select all"]').should('exist');

    // Grab all the table headers and check their text
    cy.get('th').each((th, index) => {
      if (index > 0) {
        // Starting from 1 since the first column is the checkbox
        cy.wrap(th).should('contain.text', expectedHeaders[index - 1]);
      }
    });
  });

  it('should select and deselect a user with a checkbox', () => {
    // Locate the first checkbox in the table and check it
    cy.get('table tbody tr:first').find('input[type="checkbox"]').check();

    // Verify that the checkbox is checked
    cy.get('table tbody tr:first').find('input[type="checkbox"]').should('be.checked');

    // Uncheck the checkbox
    cy.get('table tbody tr:first').find('input[type="checkbox"]').uncheck();

    // Verify that the checkbox is unchecked
    cy.get('table tbody tr:first').find('input[type="checkbox"]').should('not.be.checked');
  });

  it('should select all rows when the header checkbox is checked', () => {
    // Check the checkbox in the header to select all rows
    cy.get('thead input[type="checkbox"]').check();

    // Verify that all checkboxes in the rows are checked
    cy.get('tbody input[type="checkbox"]').should('be.checked');
  });

  it('should load user data correctly', () => {
    cy.get('td').should('contain', 'John Doe');
  });

  it('should set button states based on the status of the first user', () => {
    // Get the status of the first row
    cy.get('table tbody tr:first').within(() => {
      cy.get('td.ant-table-cell')
        .contains(/Active|Inactive/)
        .invoke('text')
        .then((status) => {
          // Select the first row
          cy.get('input[type="checkbox"]').click();
        });
    });
    cy.wait(500);

    // Check the button state after getting the status
    cy.get('td.ant-table-cell')
      .contains(/Active|Inactive/)
      .invoke('text')
      .then((status) => {
        if (status.trim() === 'Active') {
          // Check if the "Set Active" button is disabled
          cy.contains('button', 'Set Active').should('be.disabled');
          cy.contains('button', 'Set Inactive').should('not.be.disabled');
        } else {
          cy.contains('button', 'Set Inactive').should('be.disabled');
          cy.contains('button', 'Set Active').should('not.be.disabled');
        }
      });
  });

  it('should set the user status', () => {
    let userStatus; // Declare a variable to store the status

    // Get the status of the first row
    cy.get('table tbody tr:first')
      .within(() => {
        cy.get('td')
          .contains(/Active|Inactive/)
          .invoke('text')
          .then((status) => {
            userStatus = status.trim(); // Store the status
            // Check the checkbox in the first row
            cy.get('input[type="checkbox"]').check();
          });
      })
      .then(() => {
        // Use .then() to chain commands after the .within() block is completed
        if (userStatus === 'Active') {
          cy.contains('button', 'Set Inactive').click();
          cy.wait(1000); // This is not recommended, but I kept it as in your original test
          cy.get('table tbody tr:first').should('contain', 'Inactive');
        } else {
          cy.contains('button', 'Set Active').click();
          cy.wait(1000);
          cy.get('table tbody tr:first').should('contain', 'Active');
        }
      });
  });
});

import {mockAuthIntercepts} from "../utils/authHelpers";

describe('Workspaces Info', () => {

  before(() => {
    mockAuthIntercepts();
    cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com');
  });

  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    mockAuthIntercepts();
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/workspace/4`);
  });

  it('should display workspace information', () => {
    cy.get('h1.ant-typography.css-k3n9e3.css-dev-only-do-not-override-1ocvw8')
        .should('have.text', 'AWS Example Project');
    cy.contains('Running').should('be.visible');
  });

  it('should go back to the list', () => {
    //Workspace Info Page
    cy.get('button.ant-btn-text:contains("Back to My Project")').click();
    cy.contains('Manage your projects in Quantum Workspace').should('be.visible');
  });

});

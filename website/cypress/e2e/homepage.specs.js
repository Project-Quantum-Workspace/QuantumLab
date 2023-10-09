import { mockAuthIntercepts } from '../utils/authHelpers';

describe('Homepage test', () => {

  after(() => {
    cy.logout();
  });

  // Visit the page once after logging in
  beforeEach(() => {
    // mockAuthIntercepts();
    // cy.autoLogin('workspacequantum@gmail.com', 'workspacequantum@gmail.com');
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/home`);
  });

  it.only('Three modules are successfully loaded', () => {
    cy.get('.ant-layout-content').should('contain', 'Composer');
    cy.get('.ant-layout-content').should('contain', 'Workspace');
    cy.get('.ant-layout-content').should('contain', 'Job Monitor');
  });

  it('Composer module redirects to composer', () => {
    cy.get(':nth-child(2) > :nth-child(1) > .ant-btn:contains("Launch")').click();
    cy.url().should('include', '/composer');
  });

  it('Workspace module redirects to workspace page', () => {
    cy.get(':nth-child(2) > .ant-btn:contains("View Last")').click();
    cy.url().should('include', '/workspace');
  });

  it('Job monitor module redirects to job monitor page', () => {
    cy.get(
      'button.ant-btn.css-dev-only-do-not-override-1ocvw8.ant-btn-primary.ant-btn-block:contains("Create")',
    ).click();
    cy.url().should('include', '/jobmonitor');
  });
});

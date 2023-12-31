import { workspaceInfoData, workspaceInfoUrl } from '../utils/workspaceInfoCy';
import { templateData, templatesEndpoint } from '../utils/listTemplateTableCy';
import { workspaceMockData, workspaceMockEndpoint } from '../utils/listWorkspaceTableCy';
import { workspaceIDData, workspaceIDUrl } from '../utils/templateCy';

describe('New a Workspace Form', () => {
  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    cy.intercept('GET', workspaceInfoUrl, workspaceInfoData).as('getTemplate');
    cy.intercept('GET', templatesEndpoint, templateData).as('getTemplate');
    cy.intercept('GET', workspaceMockEndpoint, workspaceMockData).as('getWorkspaces');
    cy.intercept('GET', workspaceIDUrl, workspaceIDData).as('workspaceInfo');
    cy.intercept('POST', '/api/workspaces*', (req) => {
      req.reply(201, { message: 'Mock submission successful!' });
    }).as('workspaceSubmission');
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/workspace/new`);
  });

  it('Show error message when user submit without entering information', () => {
    cy.get('.ant-btn-primary').click();
    cy.get('#name_help > .ant-form-item-explain-error').should('exist');
  });

  it('Template form is generated', () => {
    cy.get('.ant-select-selector').click();
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('#AvailableZone').should('exist');
    cy.get('#DiskSize').should('exist');
  });

  it('Allows users to submit form with properly filled information', () => {
    cy.get('#name').type('test');
    cy.get('#tags').type('CPU, Quskit');
    cy.get('#description').type('a example test');
    cy.get('.ant-select-selector').click();
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    // Clicking and selecting the 'AvailableZone' input
    cy.get('#AvailableZone').click();
    cy.get('.ant-select-item-option-content').contains('qh2-uom').click();

    // Entering number 64 into 'DiskSize' input
    cy.get('#DiskSize').type('64');
    cy.get('.ant-btn-primary').click();
    cy.get('.ant-notification-notice-message').should('exist').contains('Success');
  });

  it('Allows users to go back to workspace page', () => {
    // cy.get('a > .ant-btn').click();
    // cy.url().should('match', /\/workspace$/);
    cy.get('.ant-btn.go-back-button').contains('Cancel').click();
    // Check if the URL is the workspace page
    cy.url().should('include', '/workspace');

    // Verify that the redirected page contains the text "My Projects"
    cy.contains('My Projects');
  });
});

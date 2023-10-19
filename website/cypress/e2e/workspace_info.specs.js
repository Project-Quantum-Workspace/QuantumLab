import { workspaceIDData, workspaceIDUrl } from '../utils/templateCy';
import { workspaceMockData, workspaceMockEndpoint } from '../utils/listWorkspaceTableCy';
import { templateData, templatesEndpoint } from '../utils/listTemplateTableCy';
import { workspaceInfoData, workspaceInfoUrl } from '../utils/workspaceInfoCy';

describe('Workspaces Info', () => {
  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    cy.intercept('GET', workspaceInfoUrl, workspaceInfoData).as('getTemplate');
    cy.intercept('GET', templatesEndpoint, templateData).as('getTemplate');
    cy.intercept('GET', workspaceMockEndpoint, workspaceMockData).as('getWorkspaces');
    cy.intercept('GET', workspaceIDUrl, workspaceIDData).as('workspaceInfo');
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/workspace/1`);
  });

  it('should display workspace information', () => {
    cy.get('[data-test-id="workspace-name"]').should('have.text', 'AWS Example Project');
    cy.contains('Running').should('be.visible');
  });

  it('should go back to the list', () => {
    //Workspace Info Page
    cy.get('button.ant-btn-text:contains("Back to My Project")').click();
    cy.contains('Manage your projects in Quantum Workspace').should('be.visible');
  });
});

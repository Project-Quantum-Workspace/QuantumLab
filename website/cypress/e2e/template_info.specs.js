
import {workspaceInfoData, workspaceInfoUrl} from "../utils/workspaceInfoCy";
import {templateData, templatesEndpoint} from "../utils/listTemplateTableCy";
import {workspaceMockData, workspaceMockEndpoint} from "../utils/listWorkspaceTableCy";
import {workspaceIDData, workspaceIDUrl} from "../utils/templateCy";

describe('Template Info', () => {


  after(() => {
    cy.logout();
  });

  beforeEach(() => {
    cy.intercept('GET', workspaceInfoUrl, workspaceInfoData).as('getTemplate');
    cy.intercept('GET', templatesEndpoint, templateData).as('getTemplate');
    cy.intercept('GET', workspaceMockEndpoint, workspaceMockData).as('getWorkspaces');
    cy.intercept('GET', workspaceIDUrl, workspaceIDData).as('workspaceInfo');
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/workspace`);
    cy.get('.ant-tabs-tab-btn:contains("Templates")').click();
    cy.get('[class*="ant-icon-info"]').click();
  });

  it('should display template information', () => {
    //Template Info Page
    cy.url().should('include', '/template');
  });

  it('should go back to Templates tab when hit Back button', () => {
    cy.get('button.ant-btn-text:contains("Back to Templates")').click();
    cy.url().should('include', '/workspace');
    // check if displaying Templates Tab by default
    cy.get('.ant-tabs-tab-active:contains("Templates")').click();
  });

  it('should go to New Workspace when hit New Workspace button', () => {
    cy.get('[data-test-id="new-workspace-template"').click();
    cy.url().should('include', '/workspace/new');
    // check if Template Params are fetched by default
    // check selector type param
    cy.get('label').should('contain', 'Available Zone');
    // cy.get('input[id$=availableZone]').click();
    // cy.get('input[id$=availableZone]').invoke('attr', 'aria-expanded').should('eq', 'true');
    // check input type param
    cy.get('label').should('contain', 'Disk Size');
    // cy.get('input[id$=diskSize]').should('not.have.attr', 'aria-expanded');
  });
});
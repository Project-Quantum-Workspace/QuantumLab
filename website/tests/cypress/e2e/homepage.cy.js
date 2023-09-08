describe('Homepage test',()=>{
    beforeEach(()=>{
        cy.autoLogin('workspacequantum@gmail.com','workspacequantum@gmail.com')
        cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/home`)
    })
    it('Three modules are successfully loaded',()=>{
        cy.get('.ant-layout-content').should('contain','Composer')
        cy.get('.ant-layout-content').should('contain','Workspace')
        cy.get('.ant-layout-content').should('contain','Job Monitor')
        

    })

    it('Composer module redirects to composer',()=>{
        cy.get(':nth-child(2) > :nth-child(1) > .ant-btn:contains("Launch")').click();
        cy.url().should('include','/composer');

    })
    it('Workspace module redirects to workspacepage',()=>{
        cy.get(':nth-child(2) > .ant-btn:contains("View Last")').click();
        cy.url().should('include','/workspace');
    })
    it('Job monitor module redirects to jobmonitor page',()=>{
        cy.get(':nth-child(3) > .sc-bcPKhP > .ant-btn:contains("Create")').click();
        cy.url().should('include','/jobmonitor')
    })
})
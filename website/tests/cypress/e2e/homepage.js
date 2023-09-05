describe('Homepage test',()=>{
    beforeAll(()=>{
        cy.autoLogin('workspacequantum@gmail.com','workspacequantum@gmail.com')
        cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}/`)
    })
})
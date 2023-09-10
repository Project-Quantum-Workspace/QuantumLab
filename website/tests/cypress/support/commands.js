// Cypress.Commands.add('autoLogin', (uemail, upassword) => {
//
//     cy.request({
//         method: 'POST',
//         url:`${Cypress.env(Cypress.env('mock')?'QUANTUMLAB_WEB':'API_LINK')}/api/auth/login`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body:{
//             email:uemail,
//             password:upassword
//         }
//     })
//     .its('body')
//     .then((body)=>{
//         window.localStorage.setItem('token',body.accessToken)
//         console.log(body)
//     })
// })



Cypress.Commands.add('autoLogin', (email, password) => {
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}`)
    cy.get('input#email').type(email);
    cy.get('input#password').type(password);
    cy.get('button').contains('Login').click()
    cy.contains('Hello').should('be.visible');
});

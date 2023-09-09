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



Cypress.Commands.add('login', (email, password) => {
    cy.visit(`${Cypress.env('QUANTUMLAB_WEB')}`)
    // Fill in the email and password
    cy.get('input#email').type(email);

    // Assuming there's a similar input for password with an id of "password"
    // If the ID is different, you'll need to update this selector.
    cy.get('input#password').type(password);

    // Click the login button
    // Assuming there's a button with a text "Login" or some specific selector you can use
    cy.get('button').contains('Login').click()

    cy.contains('Hello').should('be.visible');


});

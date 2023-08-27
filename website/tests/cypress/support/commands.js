Cypress.Commands.add('autoLogin', (uemail, upassword) => {
    cy.request({
        method: 'POST',
        url:`${Cypress.env('API_LINK')}/auth/login`,
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            email:uemail,
            password:upassword
        }
    })
    .its('body')
    .then((body)=>{
        console.log(body)
        window.localStorage.setItem('token',body.accessToken)
    })
})

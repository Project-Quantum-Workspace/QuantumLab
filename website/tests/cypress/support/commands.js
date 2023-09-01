Cypress.Commands.add('autoLogin', (uemail, upassword) => {
    const mock_mode = true;
    cy.request({
        method: 'POST',
        url:`${Cypress.env(mock_mode?'QUANTUMLAB_WEB':'API_LINK')}/api/auth/login`,
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
        window.localStorage.setItem('token',body.accessToken)
        console.log(body)
    })
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
    Cypress.Commands.add('loginHRM', (username, password) => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('h5[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('contain.text', 'Login')
        cy.get('input[name="username"]').should('be.visible').type(username)
        cy.get('input[name="password"]').should('be.visible').type(password, { sensitive: true })
        cy.get('button[type="submit"]').should('be.enabled').click()  
    })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
    Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
        if (options && options.sensitive === true) {
            // hide text in logs
            options.log = false
        } 
        return originalFn(element, text, options)
    }) 

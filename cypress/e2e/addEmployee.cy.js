/// <reference types = "cypress"/>

describe('add Employee', () => {
  it('add Employee', () => {
    //login
    /* cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('h5[class="oxd-text oxd-text--h5 orangehrm-login-title"]').should('contain.text', 'Login')
    cy.get('input[name="username"]').should('be.visible').type('Admin')
    cy.get('input[name="password"]').should('be.visible').type('admin123')
    cy.get('button[type="submit"]').should('be.enabled').click()  */

    //use of cypress custom command
    cy.loginHRM('Admin', 'admin123')

    //dashboard header visible
    cy.get('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('be.visible')
    //click PIM
    cy.get('ul.oxd-main-menu>li:nth-child(2)').should('be.visible').click()
    //pim header visible
    cy.get('h6.oxd-text.oxd-text--h6.oxd-topbar-header-breadcrumb-module').should('be.visible')
    //add employee
    cy.get('div.orangehrm-header-container>button').should('be.enabled').click()
    cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title').should('be.visible').and('contain.text', 'Add Employee')
    //get auto-populated employee Id
    cy.get('[data-v-957b4417]>[data-v-1f99f73c]').last().invoke('prop', 'value').then((empId) => {

      //add employee
      cy.get('input[name="firstName"]').should('be.visible').type(empId+'FirstName')
      cy.get('input[name="middleName"]').should('be.visible').type('MiddleName')
      cy.get('input[name="lastName"]').should('be.visible').type('LastName')
      cy.get('button[type="submit"]').should('be.enabled').click()
      cy.get('h6.oxd-text.oxd-text--h6.orangehrm-main-title').should('be.visible').and('contain.text', 'Personal Details')

      
      //inputting license expiry date
      cy.get('input[placeholder^="yyyy"]').first().should('be.visible').type('2026-01-01')
      cy.get('input[placeholder^="yyyy"]').first().should('be.enabled').click() 

      //selecting value from nationality drop-down list
      cy.get('i.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first().should('be.visible').click()
      cy.get('[data-v-40acfd38][role="listbox"]>div>span').then((nationalityList) => {
        for(let i=0; i<nationalityList.length; i++){
          if(nationalityList[i].textContent === "Indian"){
            nationalityList[i].scrollIntoView()
            cy.wrap(nationalityList[i]).click()
            break
          } 
        }
      })

      //selecting value from martial status drop-down list
      cy.get('form.oxd-form>div:nth-child(5)>div:nth-child(1)>div').last().should('be.visible').click()
      cy.get('[data-v-40acfd38][role="listbox"]>div>span').then((maritalStatusList) => {
        for (let i=0; i<maritalStatusList.length; i++){
          if(maritalStatusList[i].textContent === "Married"){
            cy.wrap(maritalStatusList[i]).click()
            break
          }
        }
      })

      //inputting date of birth
      cy.get('input[placeholder^="yyyy"]').last().should('be.visible').type('1990-01-01')
      cy.get('input[placeholder^="yyyy"]').last().should('be.enabled').click() 

      //selecting gender radio-button
      cy.get('span.oxd-radio-input.oxd-radio-input--active.--label-right.oxd-radio-input').first().should('be.visible').click()

      cy.get('button[type="submit"]').first().should('be.enabled').click()


      //selecting value from blood type drop-down list
      cy.get('div.oxd-select-text-input').last().should('be.visible').click()
      cy.get('[data-v-40acfd38]>div>span').then((bloodTypeList) => {
        for(let i=0; i<bloodTypeList.length; i++){
          if(bloodTypeList[i].textContent === "O+"){
            bloodTypeList[i].scrollIntoView()
            cy.wrap(bloodTypeList[i]).click()
            break
          }
        }
      }) 

      cy.get('button[type="submit"]').last().should('be.enabled').click()

      
      //adding attachment
      cy.get('button[type="button"]').contains(' Add ').should('be.visible').click()
      cy.get('input[type="file"]').invoke('show').selectFile('cypress/support/Attachment1.png', {force: true})
      cy.get('button[type="submit"]:nth-child(3)').should('be.enabled').click()

      //downloading attachment
      cy.get('i.oxd-icon.bi-download').should('be.visible').click()
      cy.readFile('cypress/downloads/Attachment1.png').should('exist')


      //search and delete the added employee
      cy.contains('Employee List').click()
      cy.get('input.oxd-input.oxd-input').last().should('be.visible').type(empId)
      cy.get('button[type="submit"]').click()
      cy.get('button.oxd-icon-button.oxd-table-cell-action-space>i').last().click()
      cy.contains(' Yes, Delete ').click()
    })
  })
})
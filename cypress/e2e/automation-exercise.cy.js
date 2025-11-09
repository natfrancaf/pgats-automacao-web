/// <reference types="cypress" />  //autocomplete no codigo

//const { it } = require("mocha");

//const { it } = require("mocha");



// describe / context - suite de testeem um mesmo arquivo
//it - um teste dentro de um bloco ou conjunto de testes

/*
HOOKS
trechos que são executados em todos os testes
before --> 1x antes de todos os testes
beforeEach --> antes de cada teste
after --> depois de todos os testes
afterEach --> depois de cada teste

*/

import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
}from '../support/helpers'

describe('Automation exercise', () => {
    beforeEach(() => {
        cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        cy.get('a[href="/login"]').click()

    })
    it.only('Cadastrar um usuário', () => {
        const timestamp = new Date().getTime() //só pra gerar um valor pra incluir no email pq o site nao aceita emails repetidos


       // cy.viewport("iphone-8") comando pra mudar a resolucao do teste, pode alterar nas configs tbm

              
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        //cy.get('[data-qa="signup-email"]').type(`qa-tester-${timestamp}@test.com`)
        cy.get('[data-qa="signup-email"]').type(getRandomEmail())
        cy.contains('button', 'Signup').click()

        //para radio ou checkboxes usa check
        cy.get('#id_gender2').check()
        //cy.get('input[type=radio]').check('Mrs')

        cy.get('input#password').type('12345', { log: false}) //log false é para ocultar a senha na execução

        //para combobox ou selects usa o comando select
        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1987')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type('Bob')
        cy.get('input#last_name').type('Da Silva')
        cy.get('input#company').type('PGATS')
        cy.get('input#address1').type('Avenida Selenium, n 1005')
        cy.get('select#country').type('Canada')
        cy.get('input#state').type('California')
        cy.get('input#city').type('Los Angeles')
        cy.get('[data-qa="zipcode"]').type('90005')
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created')

    });

    it('Login de usuário com email e senha corretos', () => {
        

        cy.get('[data-qa="login-email"]').type('qa-tester-1762089847622@test.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible')

       // cy.contains(`Logged in as QA Tester`).should('be.visible') //contains não é pra asserção, mas é muito util pra isso
    });

    
    it('Login de Usuário com e-mail e senha incorretos', () => {
        
        cy.get('[data-qa="login-email"]').type('qa-tester-12@test.com')
        cy.get('[data-qa="login-password"]').type('1234dsd5')

        cy.get('[data-qa="login-button"]').click()

        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

    });

    it('Logout de usuário', () => {
        
        cy.get('[data-qa="login-email"]').type('qa-tester-1762089847622@test.com')
        cy.get('[data-qa="login-password"]').type('12345')

        cy.get('[data-qa="login-button"]').click()

        cy.get('i.fa-user').parent().should('contain', 'QA Tester')
        cy.get('a[href="/logout"]').should('be.visible').click()

       cy.url().should('contain', 'login')
    });

    it('Cadastrar usuário com email já existente', () => {
                
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-1762089847622@test.com`)
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    it('Enviar um Formulário de Contato com upload de arquivo', () => {
         cy.get('a[href*=contact]').click()
         
         cy.get('[data-qa="name"]').type(userData.name)
         cy.get('[data-qa="email"]').type(userData.email)
         cy.get('[data-qa="subject"]').type(userData.subject)
         cy.get('[data-qa="message"]').type(userData.message)

         cy.fixture('example.json').as('arquivo')
         cy.get('input[type=file]').selectFile('@arquivo')


         cy.get('[data-qa="submit-button"]').click()

         //asserts
         cy.get('.status').should('be.visible')
         cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
        
    });


});
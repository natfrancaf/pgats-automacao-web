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

import menu from '../modules/menu'
import login  from '../modules/login'
import cadastro from '../modules/cadastro';


describe('Automation exercise', () => {
    beforeEach(() => {
        //cy.viewport('iphone-xr')
        cy.visit('https://automationexercise.com/')
        menu.navegarParaLogin()
        //cy.get('a[href="/login"]').click()

    })
    it('Cadastrar um usuário', () => {
             
              
        login.preencherFormularioPreCadastro()

        cadastro.preencherFormularioCadastroCompleto()

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created')

    });

    it('Login de usuário com email e senha corretos', () => {
        

        login.preencherFormularioLogin(userData.user, userData.password)
        
        //assertion
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')

       // cy.contains(`Logged in as QA Tester`).should('be.visible') //contains não é pra asserção, mas é muito util pra isso
    });

    
    it('Login de Usuário com e-mail e senha incorretos', () => {

        login.preencherFormularioLogin(userData.user, '87352')
        
        
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

    });

    it('Logout de usuário', () => {
        
       login.preencherFormularioLogin(userData.user, userData.password)

       cy.get('i.fa-user').parent().should('contain', 'QA Tester')
      
       menu.efetuarLogout()

       //cy.url().should('contain', 'login')
       cy.url({ timeout: 10000 }).should('include', 'login')
    });

    //refatorar usando modules
    it('Cadastrar usuário com email já existente', () => {
                
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-1762089847622@test.com`)
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

     //refatorar usando modules
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
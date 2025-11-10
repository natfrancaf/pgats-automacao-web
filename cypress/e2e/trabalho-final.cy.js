import userData from '../fixtures/example.json'
import {
    getRandomNumber,
    getRandomEmail
}from '../support/helpers'

import menu from '../modules/menu'
import login  from '../modules/login'
import cadastro from '../modules/cadastro'
import contato from '../modules/contato'
import produtos from '../modules/produtos'
import pagamento from '../modules/pagamento'


describe('Trabalho Final', () => {
    beforeEach(() => {
       
        cy.visit('https://automationexercise.com/')
        menu.navegarParaLogin()
        

    })

    //Test Case 1
    it('Cadastrar um usuário', () => {
             
              
        login.preencherFormularioPreCadastro()

        cadastro.preencherFormularioCadastroCompleto()

        //Assert
        cy.url().should('includes', 'account_created')
        cy.contains('b', 'Account Created')

    });

    //Test Case 2
    it('Login de usuário com email e senha corretos', () => {
        

        login.preencherFormularioLogin(userData.user, userData.password)
        
        //assertion
        cy.get('i.fa-user').parent().should('contain', userData.name)
        cy.get('a[href="/logout"]').should('be.visible')

       
    });

    
    //Test Case 3
    it('Login de Usuário com e-mail e senha incorretos', () => {

        login.preencherFormularioLogin(userData.user, '87352')
        
        
        cy.get('.login-form > form > p').should('contain', 'Your email or password is incorrect!')

    });

    //Test Case 4
    it('Logout de usuário', () => {
        
       login.preencherFormularioLogin(userData.user, userData.password)

       cy.get('i.fa-user').parent().should('contain', 'QA Tester')
      
       menu.efetuarLogout()

       cy.url({ timeout: 10000 }).should('include', 'login')
    });

    
    //Test Case 5
    it('Cadastrar usuário com email já existente', () => {
                
       
        cy.get('[data-qa="signup-name"]').type('QA Tester')
        cy.get('[data-qa="signup-email"]').type(`qa-tester-1762089847622@test.com`)
        cy.contains('button', 'Signup').click()

        cy.get('.signup-form > form > p').should('contain', 'Email Address already exist!')
    });

    
    //Test Case 6
    it('Enviar um Formulário de Contato com upload de arquivo', () => {
         
        contato.preencherContatoCompleto()
        
         //asserts
         cy.get('.status').should('be.visible')
         cy.get('.status').should('have.text', 'Success! Your details have been submitted successfully.')
        
    });

    //Test Case 8
    it('Verificar página de produtos e página de detalhes do produto ', () => {

        login.preencherFormularioLogin(userData.user, userData.password)
        menu.navegarParaProdutos()

       
        cy.get('a[href="/product_details/1"]').should('be.visible').click()

        //asserts
        cy.get('.product-information > h2').should('have.text', 'Blue Top')
        cy.get('.product-information > :nth-child(3)').should('have.text', 'Category: Women > Tops')
        cy.get(':nth-child(5) > span').should('have.text', 'Rs. 500')
        cy.get('.product-information > :nth-child(6)').should('have.text', 'Availability: In Stock')
        cy.get('.product-information > :nth-child(7)').should('have.text', 'Condition: New')
        cy.get('.product-information > :nth-child(8)').should('have.text', 'Brand: Polo')
    })

    //Test Case 9
    it('Pesquisar produto', () => {
        login.preencherFormularioLogin(userData.user, userData.password)
        menu.navegarParaProdutos()

        cy.get('#search_product').type('Stylish Dress')
        cy.get('#submit_search').should('be.visible').click()


        //asserts
        cy.contains('h2.title.text-center', 'Searched Products').should('be.visible')
        cy.get('.productinfo > p').should('have.text', 'Stylish Dress')



    })

    //Test Case 10
    it('Verificar subscrição na home page', () => {

        cy.get('footer').scrollIntoView()
        cy.get('.single-widget > h2').should('have.text', 'Subscription')

        cy.get('#susbscribe_email').type(userData.email)
        cy.get('#subscribe').click()

        cy.get('#success-subscribe .alert-success')
         .should('be.visible')
         .and('contain.text', 'You have been successfully subscribed!');


    })

    //Test Case 15
    it('Cadastrar usuário antes de finalizar a compra', () => {

        login.preencherFormularioPreCadastro()
        cadastro.preencherFormularioCadastroCompleto()
        cy.contains('b', 'Account Created')

        cy.get('[data-qa="continue-button"]').should('be.visible').click()

      
       produtos.adicionarProduto1()
       produtos.adicionarProduto2()
      
       menu.navegarParaCarrinho()

       cy.get('.col-sm-6 > .btn').should('be.visible').click()

       cy.get('#product-1').should('be.visible')
       cy.get('#product-2').should('be.visible')

       cy.get('.form-control').type('Texto de teste')
       cy.get('a[href="/payment"]').should('be.visible').click()

       pagamento.incluirCartao()

       cy.get('.col-sm-9 > p').should('have.text', 'Congratulations! Your order has been confirmed!')

       cadastro.deletarConta()
    
    })



});
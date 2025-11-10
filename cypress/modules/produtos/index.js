import menu from '../../modules/menu'

class Produtos{
    adicionarProduto1(){
        menu.navegarParaProdutos()
        cy.get('a[href="/product_details/1"]').should('be.visible').click()
        cy.get(':nth-child(5) > .btn').click()
        
                     
        cy.get('.modal-title').should('have.text', 'Added!')
        cy.get('.modal-footer > .btn').should('be.visible').click()
    }

    adicionarProduto2(){
        menu.navegarParaProdutos()
        cy.get('a[href="/product_details/2"]').should('be.visible').click()
        cy.get(':nth-child(5) > .btn').click()

        cy.get('.modal-title').should('have.text', 'Added!')
        cy.get('.modal-footer > .btn').should('be.visible').click()
    }
}

export default new Produtos
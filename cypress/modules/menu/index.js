/**
export function navegarParaLogin(){
    cy.get('a[href="/login"]').click()
}
*/

//usar classe fica mais legível

class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click()

}
  efetuarLogout(){
     cy.get('a[href="/logout"]').should('be.visible').click()
  }

  navegarParaProdutos(){
     cy.get('a[href="/products"]').should('be.visible').click()

      cy.url({ timeout: 10000 }).should('include', 'products')
    }

  navegarParaCarrinho(){
    cy.get('.shop-menu > .nav > :nth-child(3) > a').should('be.visible').click()
     cy.url().should('includes', 'view_cart')
  }

}

export default new Menu()
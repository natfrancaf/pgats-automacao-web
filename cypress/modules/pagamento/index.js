import { faker } from '@faker-js/faker'

class Pagamento{
    incluirCartao(){
        cy.get('[data-qa="name-on-card"]').type(faker.person.fullName())
        cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
        cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
        cy.get('[data-qa="expiry-month"]').type('10')
        cy.get('[data-qa="expiry-year"]').type('2028')
        cy.get('[data-qa="pay-button"]').should('be.visible').click()

    }
}

export default new Pagamento
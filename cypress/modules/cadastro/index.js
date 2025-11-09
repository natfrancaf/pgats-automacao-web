import { faker } from '@faker-js/faker'

class Cadastro{
    preencherFormularioCadastroCompleto(){
        cy.get('#id_gender2').check()
       
        cy.get('input#password').type('12345', { log: false}) //log false é para ocultar a senha na execução

        //para combobox ou selects usa o comando select
        cy.get('select[data-qa=days]').select('20')
        cy.get('select[data-qa=months]').select('September')
        cy.get('select[data-qa=years]').select('1987')

        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').type('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 333')

        cy.get('[data-qa="create-account"]').click()

    }

}


export default new Cadastro
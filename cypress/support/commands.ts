import 'cypress-file-upload'

const BASE_URL = 'https://novo-sig.homolog.ledes.net'

declare global {
  namespace Cypress {
    interface Chainable {
      selecionarOpcao(dataOpenCy: string, dataSearchCy: string, valor: string, closeButtonCy?: string): Chainable<void>
      loginPorFixture(fixtureKey: string): Chainable<void>
      navegarParaProposta(substep: string): Chainable<void>
      marcarVinculoInstitucional(): Chainable<void>
      marcarVinculoEmpregaticio(): Chainable<void>
    }
  }
}

Cypress.Commands.add('selecionarOpcao', (dataOpenCy: string, dataSearchCy: string, valor: string, closeButtonCy?: string) => {
  cy.get(`[data-cy="${dataOpenCy}"]`).click()
  cy.get(`[data-cy="${dataSearchCy}"]`).clear().type(valor)
  cy.contains('[role="option"]', valor).first().click({ force: true })
  if (closeButtonCy) {
    cy.get(`[data-cy="${closeButtonCy}"]`).click()
  }
})

Cypress.Commands.add('loginPorFixture', (fixtureKey: string) => {
  cy.session(fixtureKey, () => {
    cy.fixture(fixtureKey).then((dados) => {
      const credenciais = dados.login ?? dados.propostaValida?.login
      cy.visit(BASE_URL)
      cy.get('[data-cy="email"]').type(credenciais.email)
      cy.get('[data-cy="senha"]').type(credenciais.senha)
      cy.get('[data-cy="loginButton"]').click()
      cy.url().should('include', '/home')
    })
  })
})

Cypress.Commands.add('navegarParaProposta', (substep: string) => {
  cy.visit(`${BASE_URL}/edital/33/minhas-propostas/${Cypress.env('propostaId')}`)
  cy.get(`[data-cy="${substep}"]`).click()
})

Cypress.Commands.add('marcarVinculoInstitucional', () => {
  cy.get('[data-cy="possui-vinculo-institucional"]').then(($checkbox) => {
    if (!$checkbox.is(':checked')) {
      cy.get('[data-cy="possui-vinculo-institucional-box"]').click()
    }
  })
})

Cypress.Commands.add('marcarVinculoEmpregaticio', () => {
  cy.get('[data-cy="possui-vinculo-empregaticio"]').then(($checkbox) => {
    if (!$checkbox.is(':checked')) {
      cy.get('[data-cy="possui-vinculo-empregaticio-box"]').click()
    }
  })
})
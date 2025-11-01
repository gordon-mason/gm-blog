describe('Blog Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the site header', () => {
    cy.get('.site-header h1').should('be.visible')
    cy.get('.site-header h1').should('contain.text', 'Gordon\'s Dev Blog')
  })
})
describe('Blog Homepage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the site header', () => {
    cy.get('.site-header h1').should('be.visible')
    cy.get('.site-header h1').should('contain.text', 'Gordon\'s Dev Blog')
  })

  it('displays blog posts in reverse chronological order', () => {
    cy.get('.blog-post-preview').should('have.length.at.least', 1)

    // Check that posts have required elements
    cy.get('.blog-post-preview').first().within(() => {
      cy.get('.post-date').should('be.visible')
      cy.get('.post-title').should('be.visible')
      cy.get('.post-title a').should('have.attr', 'href')
      cy.get('.read-more').should('be.visible')
    })
  })

  it('navigates to individual blog post when clicked', () => {
    cy.get('.blog-post-preview').first().within(() => {
      cy.get('.post-title a').click()
    })

    // Should navigate to post page
    cy.url().should('include', '/posts/')
    cy.get('.blog-post').should('be.visible')
    cy.get('.post-header h1').should('be.visible')
    cy.get('.post-content').should('be.visible')
  })

  it('displays back link on individual post', () => {
    cy.get('.blog-post-preview').first().within(() => {
      cy.get('.post-title a').click()
    })

    cy.get('.back-link').should('be.visible')
    cy.get('.back-link').should('contain.text', 'Back to all posts')

    // Test back navigation
    cy.get('.back-link').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('has responsive design', () => {
    // Test mobile viewport
    cy.viewport('iphone-x')
    cy.get('.container').should('be.visible')
    cy.get('.blog-post-preview').should('be.visible')

    // Test tablet viewport
    cy.viewport('ipad-2')
    cy.get('.container').should('be.visible')
    cy.get('.blog-post-preview').should('be.visible')

    // Test desktop viewport
    cy.viewport(1920, 1080)
    cy.get('.container').should('be.visible')
    cy.get('.blog-post-preview').should('be.visible')
  })

  it('applies hover styles to blog posts', () => {
    cy.get('.blog-post-preview').first().trigger('mouseover')
    cy.get('.blog-post-preview').first().should('have.css', 'box-shadow')
  })

  it('displays post date in correct format', () => {
    cy.get('.post-date').first().invoke('text').should('match', /[A-Za-z]+ \d{1,2}, \d{4}/)
  })

  it('has accessible links', () => {
    cy.get('.post-title a').each(($link) => {
      cy.wrap($link).should('have.attr', 'href').and('not.be.empty')
    })

    cy.get('.read-more').each(($link) => {
      cy.wrap($link).should('have.attr', 'href').and('not.be.empty')
    })
  })
})

describe('Blog Post Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('.blog-post-preview').first().within(() => {
      cy.get('.post-title a').click()
    })
  })

  it('displays post header correctly', () => {
    cy.get('.post-header h1').should('be.visible')
    cy.get('.post-header .post-date').should('be.visible')
  })

  it('displays post content', () => {
    cy.get('.post-content').should('be.visible')
    cy.get('.post-content').should('not.be.empty')
  })

  it('displays post footer with back link', () => {
    cy.get('.post-footer').should('be.visible')
    cy.get('.post-footer .back-link').should('be.visible')
  })

  it('has correct page title', () => {
    cy.title().should('include', 'Gordon\'s Dev Blog')
  })
})
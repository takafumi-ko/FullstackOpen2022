describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#username')
        cy.get('#password')
        cy.contains('login')
    })

    describe('Login', function () {
        it.only('succeeds with correct credentials', function () {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.contains('login').click()

            cy.contains('Matti Luukkainen logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('kyonen')
            cy.contains('login').click()

            cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
            cy.contains('wrong username or password')

            cy.get('.caution').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
})
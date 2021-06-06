describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')

        cy.createUser({
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        })

        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#username')
        cy.get('#password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
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

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'mluukkai', password: 'salainen' })
            cy.createBlog({
                title: 'title',
                author: 'author',
                url: 'url'
            })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').click()
            cy.get('#title').type('title sample')
            cy.get('#author').type('author sample')
            cy.get('#url').type('url sample')
            cy.contains('create').click()
            cy.contains('view').click()
            cy.contains('title sample')
            cy.contains('author sample')
            cy.contains('url sample')
        })

        it('5.20 can like', function () {
            cy.contains('title author').contains('view').click()
            cy.contains('likes 0')
            cy.contains('like').click()
            cy.contains('likes 1')
            cy.contains('like').click()
            cy.contains('likes 2')
        })

        it.only('5.21 can delete', function () {
            cy.contains('title author').contains('view').click()
            cy.contains('remove').click({ force: true })
            cy.on('window:confirm', (message) => {
                expect(message).to.equal('Remove blog title by author')
            })

            cy.get('html').should('not.contain', 'view')
        })
    })
})
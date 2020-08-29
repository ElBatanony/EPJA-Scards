describe('Simple testing', function() {
    it('just works', function () {
        cy.visit('/');
        
        cy.get('#hello')
            .invoke('text')
            .should('match', /hello/);
    });
});
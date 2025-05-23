describe('Record Details Page', () => {
  it('should load the new record form', () => {
    cy.visit('/records/new');
    cy.get('input[formControlName="title"]').type('Test Record');
    cy.get('button').contains('Save').click();
    cy.url().should('include', '/records');
  });
});

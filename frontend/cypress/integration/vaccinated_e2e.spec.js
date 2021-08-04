describe('Vaccinated application', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });

  // The page is opened
  it('Frontpage is opened', function() {
    cy.contains('Vaccinated Application');
  });

  // The page contains form and elements wit the text
  it('Frontpage contains a form', function() {
    cy.get('form')
      .contains('Please select the information you are interested in');
    cy.contains('Orders/vaccines arrived');
    cy.contains('Please select range or a day and set the date and time');
    cy.contains('This date only');
  });

  // The page/form has a submit button
  it('Frontpage contains a submit button', function() {
    cy.get('.submit').within(() => {
      cy.get('button');
    });
  });

  // Change category, timing and enter date & time
  // Check the result
  describe('Fill the form correctly in, send it and get righ result', function() {
    it('Select the category and enter date & time then submit', function() {
      cy.get('form > fieldset > div').eq(1).click();
      cy.get('fieldset').eq(1).within(() => {
        cy.get('input').eq(1)
          .click();
      });
      cy.get('#total-date').type('2021-03-12');
      cy.get('#total-time').type('18:00');
      cy.get('.submit').within(() => {
        cy.get('button').click();
      });
      cy.contains('Injections given: 3762');
    });
  });

  describe('Send the form with empty field and get an notification/error', function() {
    it('Submit form without entering any data', function() {
      cy.get('.submit').within(() => {
        cy.get('button').click();
      });
      cy.get('.error')
        .should('contain', 'Ooops...something went wrong.')
        .and('have.css', 'color', 'rgb(220, 30, 50)')
        .and('have.css', 'border-bottom', '2px solid rgb(220, 30, 50)');
    });
  });
});

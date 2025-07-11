/// <reference types="cypress" />
beforeEach(() => {
  cy.fixture('ingredients.json').then((mockIngredients) => {
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 200,
      body: mockIngredients
    }).as('getIngredients');
  });

  cy.intercept('GET', '**/auth/user', {
    fixture: 'user.json'
  }).as('getUser');

  cy.intercept('POST', '**/orders', {
    fixture: 'order.json'
  }).as('createOrder');

  cy.setCookie('accessToken', 'Bearer mockAccessToken');
  window.localStorage.setItem('refreshToken', 'mockRefreshToken');

  cy.visit('/');
  cy.wait('@getIngredients');
});
afterEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
describe('Добавление ингредиента в конструктор', () => {
  it('Добавление ингредиента', () => {
    cy.get('[data-cy="ingredient-card"]').first().as('firstIngredient');

    cy.get('@firstIngredient').find('button').click();

    cy.get('[data-cy="constructor-ingredient"]').should('exist');
  });
});
describe('Октрытие и закрытие модального окна', () => {
  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
  });
  it('Закрытие модального окна ингредиента через кнопку', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('Закрытие модального окна ингредиента через оверлей', () => {
    cy.get('[data-cy="ingredient-card"]').first().click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
describe('Оформление заказа', () => {
  it('Оформление заказа', () => {
    cy.get('[data-cy="ingredient-card"]')
      .filter(':contains("булка")')
      .first()
      .find('button')
      .click();

    cy.get('[data-cy="ingredient-card"]')
      .filter(':contains("Биокотлета")')
      .first()
      .find('button')
      .click();

    cy.get('[data-cy="place-order-button"]').click();

    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').should('contain.text', '123456');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="constructor-ingredient"]').should(
      'not.contain',
      'Биокотлета'
    );
  });
});

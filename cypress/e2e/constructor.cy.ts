/// <reference types="cypress" />
const ingredientCard = '[data-cy="ingredient-card"]';
const constructorIngredient = '[data-cy="constructor-ingredient"]';
const modalClose = '[data-cy="modal-close"]';
const modal = '[data-cy="modal"]';
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
    cy.get(ingredientCard).first().as('firstIngredient');

    cy.get('@firstIngredient').find('button').click();

    cy.get(constructorIngredient).should('exist');
  });
});
describe('Октрытие и закрытие модального окна', () => {
  it('Открытие модального окна ингредиента', () => {
    cy.get(ingredientCard).first().click();
    cy.get(modal).should('be.visible');
  });
  it('Закрытие модального окна ингредиента через кнопку', () => {
    cy.get(ingredientCard).first().click();
    cy.get(modalClose).click();
    cy.get(modal).should('not.exist');
  });
  it('Закрытие модального окна ингредиента через оверлей', () => {
    cy.get(ingredientCard).first().click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get(modal).should('not.exist');
  });
});
describe('Оформление заказа', () => {
  it('Оформление заказа', () => {
    cy.get(ingredientCard)
      .filter(':contains("булка")')
      .first()
      .find('button')
      .click();

    cy.get(ingredientCard)
      .filter(':contains("Биокотлета")')
      .first()
      .find('button')
      .click();

    cy.get('[data-cy="place-order-button"]').click();

    cy.wait('@createOrder');

    cy.get(modal).should('be.visible');
    cy.get(modal).should('contain.text', '123456');

    cy.get(modalClose).click();
    cy.get(modal).should('not.exist');

    cy.get(constructorIngredient).should(
      'not.contain',
      'Биокотлета'
    );
  });
});

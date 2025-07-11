import { burgerConstructorSlice } from './burgerConstructorSlice';
import { TIngredient, TConstructorIngredient } from '../../utils/types';

describe('burgerConstructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  const testBun: TIngredient = {
    _id: '1',
    name: 'Test Bun',
    type: 'bun',
    price: 100,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image: '',
    image_mobile: '',
    image_large: ''
  };

  const testIngredient: TConstructorIngredient = {
    _id: '2',
    name: 'Test Ingredient',
    type: 'main',
    price: 50,
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    id: 'constructor-1'
  };

  it('addBun', () => {
    const actual = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addBun(testBun)
    );
    expect(actual.bun).toEqual(testBun);
  });

  it('addIngredient', () => {
    const actual = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(testIngredient)
    );
    expect(actual.ingredients).toHaveLength(1);
    expect(actual.ingredients[0]).toEqual(testIngredient);
  });

  it('removeIngredient', () => {
    const stateWithIngredient = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(testIngredient)
    );
    
    const actual = burgerConstructorSlice.reducer(
      stateWithIngredient,
      burgerConstructorSlice.actions.removeIngredient(testIngredient.id)
    );
    expect(actual.ingredients).toHaveLength(0);
  });

  it('moveIngredient', () => {
    const secondIngredient: TConstructorIngredient = {
      ...testIngredient,
      _id: '3',
      id: 'constructor-2'
    };
    
    let state = burgerConstructorSlice.reducer(
      initialState,
      burgerConstructorSlice.actions.addIngredient(testIngredient)
    );
    state = burgerConstructorSlice.reducer(
      state,
      burgerConstructorSlice.actions.addIngredient(secondIngredient)
    );
    
    const actual = burgerConstructorSlice.reducer(
      state,
      burgerConstructorSlice.actions.moveIngredient({ fromIndex: 0, toIndex: 1 })
    );
    
    expect(actual.ingredients[0].id).toBe('constructor-2');
    expect(actual.ingredients[1].id).toBe('constructor-1');
  });
});
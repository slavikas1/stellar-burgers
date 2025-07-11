import  ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('тесты ingredientsSlice', () => {
  const ingredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01.png'
  };

  it('вызов fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.pending('', undefined)
    );
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('вызов fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled([ingredient], '', undefined)
    );

    expect(state.ingredients).toEqual([ingredient]);
    expect(state.loading).toBe(false);
  });

  it('вызов fetchIngredients.rejected', () => {
    const errorMessage = 'Test error';
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(null, '', undefined, errorMessage)
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
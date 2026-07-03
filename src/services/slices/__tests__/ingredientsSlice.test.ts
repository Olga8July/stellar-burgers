import { ingredientsReducer, fetchIngredients } from '../ingredientsSlice';

describe('Тесты редьюсера ingredientsSlice', () => {
  // 1. Неизвестный экшен с undefined
  test('должен вернуть начальное состояние при неизвестном экшене', () => {
    const initialState = undefined;
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const result = ingredientsReducer(initialState, unknownAction);

    expect(result).toEqual({
      items: [],
      loading: false,
      error: null
    });
  });

  // 2. Pending
  test('должен установить loading в true и очистить error при pending', () => {
    const initialState = {
      items: [],
      loading: false,
      error: 'предыдущая ошибка'
    };

    const action = { type: fetchIngredients.pending.type };
    const result = ingredientsReducer(initialState, action);

    expect(result.loading).toBe(true);
    expect(result.error).toBeNull();
  });

  // 3. Fulfilled
  test('должен сохранить ингредиенты и установить loading в false при fulfilled', () => {
    const initialState = {
      items: [],
      loading: true,
      error: null
    };

    const mockIngredients = [
      {
        _id: '1',
        name: 'Булка',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 50,
        image: 'test.png',
        image_mobile: 'test-mobile.png',
        image_large: 'test-large.png'
      }
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients
    };

    const result = ingredientsReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.items).toEqual(mockIngredients);
  });

  // 4. Rejected с ошибкой
  test('должен сохранить сообщение об ошибке при rejected', () => {
    const initialState = {
      items: [],
      loading: true,
      error: null
    };

    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Ошибка сети' }
    };

    const result = ingredientsReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка сети');
  });

  // 5. Rejected без сообщения об ошибке
  test('должен установить дефолтную ошибку при rejected без message', () => {
    const initialState = {
      items: [],
      loading: true,
      error: null
    };

    const action = {
      type: fetchIngredients.rejected.type,
      error: {}
    };

    const result = ingredientsReducer(initialState, action);

    expect(result.loading).toBe(false);
    expect(result.error).toBe('Ошибка загрузки ингредиентов');
  });
});

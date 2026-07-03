import {
  constructorReducer,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown
} from '../constructorSlice';
import { createOrder } from '../orderSlice';

describe('Тесты редьюсера constructorSlice', () => {
  test('должен вернуть начальное состояние при неизвестном экшене', () => {
    const initialState = undefined;
    const unknownAction = { type: 'UNKNOWN_ACTION' };

    const result = constructorReducer(initialState, unknownAction);

    expect(result).toEqual({
      bun: null,
      ingredients: []
    });
  });

  test('должен добавить булку при addBun', () => {
    const initialState = { bun: null, ingredients: [] };
    const mockBun = {
      _id: '1',
      id: 'unique-id-1', // ← добавили это поле
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
    };

    const result = constructorReducer(initialState, addBun(mockBun));

    expect(result.bun).toEqual(mockBun);
  });

  test('должен добавить ингредиент при addIngredient', () => {
    const initialState = { bun: null, ingredients: [] };
    const mockIngredient = {
      _id: '2',
      id: 'unique-id-2',
      name: 'Котлета',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 5,
      calories: 200,
      price: 100,
      image: 'test.png',
      image_mobile: 'test-mobile.png',
      image_large: 'test-large.png'
    };

    const result = constructorReducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(result.ingredients).toHaveLength(1);
    expect(result.ingredients[0]).toEqual(mockIngredient);
  });

  test('должен удалить ингредиент по индексу при removeIngredient', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Ингредиент 1' },
        { _id: '2', name: 'Ингредиент 2' },
        { _id: '3', name: 'Ингредиент 3' }
      ]
    } as any;

    const result = constructorReducer(initialState, removeIngredient(1));

    expect(result.ingredients).toHaveLength(2);
    expect(result.ingredients[0]._id).toBe('1');
    expect(result.ingredients[1]._id).toBe('3');
  });

  test('должен переместить ингредиент вверх при moveIngredientUp', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Ингредиент 1' },
        { _id: '2', name: 'Ингредиент 2' },
        { _id: '3', name: 'Ингредиент 3' }
      ]
    } as any;

    const result = constructorReducer(initialState, moveIngredientUp(1));

    expect(result.ingredients[0]._id).toBe('2');
    expect(result.ingredients[1]._id).toBe('1');
    expect(result.ingredients[2]._id).toBe('3');
  });

  test('должен переместить ингредиент вниз при moveIngredientDown', () => {
    const initialState = {
      bun: null,
      ingredients: [
        { _id: '1', name: 'Ингредиент 1' },
        { _id: '2', name: 'Ингредиент 2' },
        { _id: '3', name: 'Ингредиент 3' }
      ]
    } as any;

    const result = constructorReducer(initialState, moveIngredientDown(1));

    expect(result.ingredients[0]._id).toBe('1');
    expect(result.ingredients[1]._id).toBe('3');
    expect(result.ingredients[2]._id).toBe('2');
  });

  test('должен очистить конструктор при createOrder.fulfilled', () => {
    const initialState = {
      bun: { _id: '1', name: 'Булка' },
      ingredients: [{ _id: '2', name: 'Ингредиент' }]
    } as any;

    const action = {
      type: createOrder.fulfilled.type,
      payload: { name: 'order', number: 12345 }
    };

    const result = constructorReducer(initialState, action);

    expect(result.bun).toBeNull();
    expect(result.ingredients).toEqual([]);
  });

  test('должен не изменять состояние при createOrder.pending', () => {
    const initialState = {
      bun: { _id: '1', name: 'Булка' },
      ingredients: [{ _id: '2', name: 'Ингредиент' }]
    } as any;

    const action = {
      type: createOrder.pending.type,
      payload: undefined
    };

    const result = constructorReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  test('должен не изменять состояние при createOrder.rejected', () => {
    const initialState = {
      bun: { _id: '1', name: 'Булка' },
      ingredients: [{ _id: '2', name: 'Ингредиент' }]
    } as any;

    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка заказа' }
    };

    const result = constructorReducer(initialState, action);

    expect(result).toEqual(initialState);
  });
});

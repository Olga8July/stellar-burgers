import { test, expect } from '@playwright/test';

test.describe('Добавление ингредиента из списка в конструктор', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });
  });

  test('добавление начинки', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(
      page
        .getByTestId('burger-constructor')
        .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
    ).toBeVisible();
  });

  test('добавление соуса', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Соус Spicy-X' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(
      page.getByTestId('burger-constructor').filter({ hasText: 'Соус Spicy-X' })
    ).toBeVisible();
  });

  test('добавление булки', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(
      page
        .getByTestId('burger-constructor')
        .filter({ hasText: 'Краторная булка N-200i' })
    ).toBeVisible();
  });

  test('замена булки', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Флюоресцентная булка R2-D3' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(
      page
        .getByTestId('burger-constructor')
        .filter({ hasText: 'Флюоресцентная булка R2-D3' })
    ).toBeVisible();
  });
});

test.describe('Работа модальных окон ингредиента', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });
  });

  test('открытие модального окна', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(modal).toContainText('Биокотлета из марсианской Магнолии');
  });

  test('закрытие модального окна по клику на крестик', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();

    await modal.getByTestId('close-modal-button').click();

    await expect(modal).not.toBeVisible();
  });

  test('закрытие модального окна по клику на overlay', async ({ page }) => {
    await page.goto('/');

    const ingredientsList = page.getByTestId('ingredients-list');

    await expect(ingredientsList).toBeVisible();

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .click();

    const modal = page.getByTestId('modal');
    const overlay = page.getByTestId('modal-overlay');

    await expect(modal).toBeVisible();
    await expect(overlay).toBeVisible();

    await overlay.click({ position: { x: 10, y: 10 } });

    await expect(modal).not.toBeVisible();
  });
});

test.describe('Создание заказа', () => {
  test.beforeEach(async ({ page, context }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
      url: '**/ingredients',
      update: false
    });

    await context.addCookies([
      {
        name: 'accessToken',
        value:
          'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMzAyOGZiNmExNzJkMDAxYjk4Y2MwZSIsImlhdCI6MTc4MTYwNTQ5MSwiZXhwIjoxNzgxNjA2NjkxfQ.RYjGU0sD5JRbnJEyPtaFioKxCp9dbGLHlpLACVSk_K8',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await page.addInitScript(() => {
      localStorage.setItem(
        'refreshToken',
        'ea3e317064a2414bfd17caec96323445112806d2913439bf362d130b586617593458d1be74f4be12'
      );
    });

    await page.routeFromHAR('./tests/hars/user.har', {
      url: '**/user',
      update: false
    });

    await page.routeFromHAR('./tests/hars/order.har', {
      url: '**/orders',
      update: false
    });

    await page.goto('/');
  });

  test.afterEach(async ({ page, context }) => {
    await context.clearCookies();

    await page.addInitScript(() => {
      localStorage.removeItem('refreshToken');
    });

    await context.close();
  });

  test('Процесс создания заказа', async ({ page }) => {
    const ingredientsList = page.getByTestId('ingredients-list');

    await ingredientsList
      .getByRole('listitem')
      .filter({ hasText: 'Краторная булка N-200i' })
      .getByRole('button', { name: 'Добавить' })
      .click();

    await expect(
      page
        .getByTestId('burger-constructor')
        .filter({ hasText: 'Краторная булка N-200i' })
    ).toBeVisible();

    await expect(
      page
        .getByTestId('burger-constructor')
        .filter({ hasText: 'Оформить заказ' })
    ).toBeVisible();

    await page
      .getByTestId('burger-constructor')
      .getByRole('button', { name: 'Оформить заказ' })
      .click();

    const modal = page.getByTestId('modal');

    await expect(modal).toBeVisible();
    await expect(modal).toContainText('12345');

    await modal.getByTestId('close-modal-button').click();

    await expect(modal).not.toBeVisible();

    await expect(page.getByTestId('burger-constructor')).toContainText(
      'Выберите булки'
    );
    await expect(page.getByTestId('burger-constructor')).toContainText(
      'Выберите начинку'
    );
  });
});
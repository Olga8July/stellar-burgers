import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors/selectors';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <main className={styles.containerMain}>
        <h1
          className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
        >
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <div className='text text_type_main-medium pt-4'>
            Ошибка загрузки ингредиентов: {error}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};

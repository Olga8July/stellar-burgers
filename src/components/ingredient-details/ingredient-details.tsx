import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

import { useSelector } from '../../services/store';
import {
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors/selectors';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const ingredients = useSelector(selectIngredients);
  const loading = useSelector(selectIngredientsLoading);
  const error = useSelector(selectIngredientsError);

  const ingredientData = ingredients.find((item) => item._id === id);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-medium pt-4'>
        Ошибка загрузки: {error}
      </div>
    );
  }

  if (!ingredientData) {
    return (
      <div className='text text_type_main-medium pt-4'>
        Ингредиент не найден
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};

'use client';

import { Field, FieldArray, getIn } from 'formik';
import { useId } from 'react';
import type {
  AddRecipeFormValues,
  DynamicIngredientsProps,
} from '@/types/addRecipe';
import s from './DynamicIngredients.module.css';

export default function DynamicIngredients({ ingredients }: DynamicIngredientsProps) {
  const fieldId = useId();

  return (
    <FieldArray name="ingredientsList">
      {({ push, remove, form }) => {
        const values = form.values as AddRecipeFormValues;

        const selectedIngredient = ingredients.find(
          (ingredient) => ingredient.id === values.selectedIngredientId
        );

        const ingredientsList = values.ingredientsList || [];

        const ingredientsListError = getIn(form.errors, 'ingredientsList');
        const ingredientsListTouched = getIn(form.touched, 'ingredientsList');

        const handleAddIngredient = () => {
          const amount = values.amount.trim();

          if (!selectedIngredient || !amount) {
            return;
          }

          const isAlreadyAdded = ingredientsList.some(
            (item) => item.ingredientId === selectedIngredient.id
          );

          if (isAlreadyAdded) {
            return;
          }

          push({
            ingredientId: selectedIngredient.id,
            name: selectedIngredient.name,
            amount,
          });

          form.setFieldValue('selectedIngredientId', '');
          form.setFieldValue('amount', '');
        };

        return (
          <section className={s.wrapper}>
            <h3 className={s.sectionTitle}>Ingredients</h3>

            <div className={s.controls}>
              <div className={s.fieldGroup}>
                <label
                  className={s.label}
                  htmlFor={`${fieldId}-selectedIngredientId`}
                >
                  Name
                </label>

                <Field
                  className={s.select}
                  name="selectedIngredientId"
                  id={`${fieldId}-selectedIngredientId`}
                  as="select"
                >
                  <option value="">Select ingredient</option>

                  {ingredients.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </Field>
              </div>

              <div className={s.amountBlock}>
                <div className={s.fieldGroup}>
                  <label className={s.label} htmlFor={`${fieldId}-amount`}>
                    Amount
                  </label>

                  <Field
                    className={s.input}
                    name="amount"
                    id={`${fieldId}-amount`}
                    type="text"
                    placeholder="e.g. 100g"
                  />
                </div>

                <button
                  type="button"
                  className={s.addButton}
                  onClick={handleAddIngredient}
                  disabled={!selectedIngredient || !values.amount.trim()}
                >
                  Add new Ingredient
                </button>
              </div>
            </div>

            {typeof ingredientsListError === 'string' && ingredientsListTouched && (
              <p className={s.error}>{ingredientsListError}</p>
            )}

            <div className={s.listHeader}>
              <span>Name:</span>
              <span>Amount:</span>
            </div>

            <ul className={s.ingredientList}>
              {ingredientsList.map((item, index) => (
                <li
                  key={`${item.ingredientId}-${index}`}
                  className={s.ingredientItem}
                >
                  <span className={s.ingredientName}>{item.name}</span>
                  <span className={s.ingredientAmount}>{item.amount}</span>

                  <button
                    type="button"
                    className={s.removeButton}
                    onClick={() => remove(index)}
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      }}
    </FieldArray>
  );
}
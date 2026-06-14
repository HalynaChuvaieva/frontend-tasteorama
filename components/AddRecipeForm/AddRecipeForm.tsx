'use client';

import { Formik, Form, Field } from 'formik';
import { useId } from 'react';
import { addRecipeValidationSchema } from '@/lib/validation/addRecipeValidationSchema';
import DynamicIngredients from './DynamicIngredients/DynamicIngredients';
import s from './AddRecipesForm.module.css';
import {
  AddRecipeFormValues,
  AddRecipeFormProps,
 } from '@/types/addRecipe';

const initialValues: AddRecipeFormValues = {
  recipeTitle: '',
  recipeDescription: '',
  cookingTime: 10,
  calories: 150,
  category: 'Soup',
  photo: null,
  selectedIngredientId: '',
  amount: '',
  ingredientsList: [],
  instructions: '',
};

export default function AddRecipeForm({ ingredients }: AddRecipeFormProps) {
  const fieldId = useId();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addRecipeValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form className={s.form}>
        <section className={s.mainSection}>
          <h3 className={s.sectionTitle}>General Information</h3>

          <div className={s.fieldGroup}>
            <label className={s.label} htmlFor={`${fieldId}-recipeTitle`}>
              Recipe Title
            </label>
            <Field
              className={s.input}
              name="recipeTitle"
              id={`${fieldId}-recipeTitle`}
              type="text"
              placeholder="Enter the name of your recipe"
            />
          </div>

          <div className={s.fieldGroup}>
            <label className={s.label} htmlFor={`${fieldId}-recipeDescription`}>
              Recipe Description
            </label>
            <Field
              className={s.textarea}
              name="recipeDescription"
              id={`${fieldId}-recipeDescription`}
              as="textarea"
              placeholder="Enter a brief description of your recipe"
            />
          </div>

          <div className={s.ingredientRow}>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-cookingTime`}>
                Cooking time (min)
              </label>
              <Field
                className={s.input}
                name="cookingTime"
                id={`${fieldId}-cookingTime`}
                type="number"
              />
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-calories`}>
                Calories
              </label>
              <Field
                className={s.input}
                name="calories"
                id={`${fieldId}-calories`}
                type="number"
              />
            </div>
            <div className={s.fieldGroup}>
              <label className={s.label} htmlFor={`${fieldId}-category`}>
                Category
              </label>
              <Field
                className={s.select}
                name="category"
                id={`${fieldId}-category`}
                as="select"
              >
                <option value="Soup">Soup</option>
                <option value="Salad">Salad</option>
                <option value="Dessert">Dessert</option>
              </Field>
            </div>
          </div>

          <DynamicIngredients ingredients={ingredients} />

          <h3 className={s.sectionTitle}>Instructions</h3>

          <div className={s.fieldGroup}>
            <label className={s.label} htmlFor={`${fieldId}-instructions`}>
              Instructions
            </label>
            <Field
              className={s.textarea}
              name="instructions"
              id={`${fieldId}-instructions`}
              as="textarea"
              placeholder="Enter a text"
            />
          </div>

          <button type="submit" className={s.btnPrimary}>
            Publish Recipe
          </button>
        </section>

        <section className={s.photoSection}>
          <div className={s.photoUpload}>
            <span>📷</span>
            <span>Upload photo</span>
            <input name="photo" type="file" accept="image/*" />
          </div>
        </section>
      </Form>
    </Formik>
  );
}

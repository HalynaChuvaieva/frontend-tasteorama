'use client';

import { strict } from 'assert';
import { Formik, Form, Field } from 'formik';

// import { useId } from 'react';

interface Props {
  ingredients: { id: string, name: string }[];
}

const validationSchema = yupToFormErrors.object({});

const initialValues = {
  recipeTitle: '',
  recipeDescription: '',
  cookingTime: 10,
  calories: 150,
  category: 'Soup',
  photo: null,
  nameIngredients: 'Broccoli',
  amount: '100g',
};

export default function addRecipeForm({ ingredients }: Props) {
  const fieldId = userId();


  return (
    <Formik
      initialValues={initialValues}
    // validationSchema={ }
    // onSubmit={ }
    >
      <Form>
        <section>
          <h3>General Information</h3>
          <Field
            name="recipeTitle"
            type="text"
            placeholder="Enter the name of your recipe"
          />
          <Field
            name="recipeDescription"
            type="text"
            as="textarea"
            placeholder="Enter a brief description of your recipe"
          />
          <Field name="cookingTime" type="number" />
          <Field name="calories" type="number" />
          <Field name="category" as="select" />

          <h3>Ingredients</h3>
          <Field name="nameIngredients" as="select">
            {
              ingredients.map( //це рендеримо за допомогою пропсів, інфа в пропс передається
                            // з app\(private routes)\add-recipe\page.tsx
          // <option value="">1</option>
          // <option value="morning">12</option>
          // <option value="afternoon">15</option>
              ) //Потрібно дописати  )
            }
          </Field>
          <Field name="amount" type="text" />

          <button type="button" onClick={'handleFunction'}>Add new Ingredient
          </button>
          <table>
            <h3>
              Тут має бути табличка яка буде відоображити список інгерієнтів{' '}
            </h3>
          </table>

          <h3>Instructions</h3>
          <Field
            name="instructions"
            type="text"
            as="textarea"
            placeholder="Enter a text"
          />
          <button type="submit" onClick={'handleFunction'}>
            Publish Recipe
          </button>
        </section>

        <section >
          <input name="photo" type="file" />
        </section>

      </Form>
    </Formik>
  );
}

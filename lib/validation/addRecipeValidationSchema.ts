import * as Yup from 'yup';

export const addRecipeValidationSchema = Yup.object({
  ingredientsList: Yup.array()
    .of(
      Yup.object({
        ingredientId: Yup.string().required('Please select an ingredient'),
        amount: Yup.string().trim().required('Please enter the amount'),
      })
    )
    .min(1, 'Please add at least one ingredient'),
});
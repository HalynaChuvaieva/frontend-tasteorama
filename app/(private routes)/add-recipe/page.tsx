import AddRecipeForm from '@/components/AddRecipeForm/addRecipeForm';

export default async function AddRecipePage() {
  const ingredients = await getIngredients(); //запит до БД

  return (
    <>
      <h2>Add Recipe</h2>
      <AddRecipeForm ingredients={ingredients} />
    </>
  );
}

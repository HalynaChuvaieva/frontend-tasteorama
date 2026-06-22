import AddRecipeForm from '@/components/AddRecipeForm/AddRecipeForm';
import { getIngredients } from '@/lib/api/ingredientsApi';

export default async function AddRecipePage() {
  const ingredients = await getIngredients().catch(() => []);

  return <AddRecipeForm ingredients={ingredients} />;
}

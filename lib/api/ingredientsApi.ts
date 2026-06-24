import type { IngredientOption, IngredientOptionFilter } from '@/types/ingredient';
import { nextServer } from './api';

export async function getIngredients(): Promise<Ingredient[]> {
  const { data } = await nextServer.get<Ingredient[]>('/ingredients');
  console.log('Ingredients: ', data);

  return data;
}

export async function getIngredientsFilter(): Promise<
  IngredientOptionFilter[]
> {
  const res = await fetch('/api/ingredients');
  if (!res.ok) throw new Error('Failed to fetch ingredients');
  return res.json();
}

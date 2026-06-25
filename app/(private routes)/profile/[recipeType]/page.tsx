import { notFound } from 'next/navigation';
import ProfileNavigation from '@/components/ProfileNavigation/ProfileNavigation';
import ProfileRecipesList from '@/components/ProfileRecipesList/ProfileRecipesList';
import {
  fetchMyRecipesServer,
  fetchFavoriteRecipesServer,
} from '@/lib/api/serverApi';
import { FetchRecipesResponse } from '@/lib/api/clientApi';
type Props = {
  params: Promise<{ recipeType: string }>;
};

export default async function ProfileRecipeTypePage({ params }: Props) {
  const { recipeType } = await params;

  if (recipeType !== 'own' && recipeType !== 'favorites') {
    notFound();
  }

  let initialData: FetchRecipesResponse = {
    recipes: [],
    totalPages: 0,
    totalRecipes: 0,
    page: 1,
    perPage: 12,
  };

  if (recipeType === 'own') {
    initialData = await fetchMyRecipesServer(1);
  } else {
    initialData = await fetchFavoriteRecipesServer(1);
  }
  async function fetchMoreRecipesAction(page: number) {
    'use server';
    if (recipeType === 'own') {
      return fetchMyRecipesServer(page);
    } else {
      return fetchFavoriteRecipesServer(page);
    }
  }

  return (
    <main
      style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <ProfileNavigation />

      <ProfileRecipesList
        initialRecipes={initialData.recipes}
        totalPages={initialData.totalPages}
        totalRecipes={initialData.totalRecipes}
        recipeType={recipeType as 'own' | 'favorites'}
        fetchMoreFn={fetchMoreRecipesAction}
      />
    </main>
  );
}

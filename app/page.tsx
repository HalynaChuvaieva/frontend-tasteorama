import RecipeList from '@/components/RecipesList/RecipesList';
import Hero from '@/components/Hero/Hero';

export default function App() {
  return (
    <>
      <Hero />
      <RecipeList
        initialRecipes={[]}
        totalPages={1}
        totalRecipes={12}
        searchQuery=""
        currentCategory=""
      />
    </>
  );
}

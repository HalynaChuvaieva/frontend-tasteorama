import { redirect } from "next/navigation";

export default function RecipesPage() {
  redirect("/recipes/filter/all");
}

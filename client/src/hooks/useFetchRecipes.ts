import axios from "../config/axios.config";
import { useEffect, useState } from "react";
import { RecipeType } from "../types/RecipeType";
import { getErrorMessage } from "../utils/getApiError";

export function useFetchRecipes(url: string) {
    const [recipes, setRecipes] = useState<RecipeType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getRecipes() {
            try {
                setError(null);
                const res = await axios.get(url);
                const { recipes } = res.data;
                setRecipes(recipes);
            } catch (err) {
                setError(getErrorMessage(err));
            } finally {
                setLoading(false);
            }
        }

        getRecipes();
    }, [url]);

    return { recipes, loading, error }
}

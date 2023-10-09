import { useEffect, useState } from "react";
import axios from "../config/axios.config";
import { RecipeType } from "../types/RecipeType";

type AuthorData = {
    name: string;
    id: string;
}

export default function useFetchAuthor(recipeData: RecipeType | null) {
    const [authorData, setAuthorData] = useState<AuthorData | null>(null)
    async function fetchAuthor() {
        try {
            const res = await axios.post("get-author", {
                authorId: recipeData?.authorId,
            });
            const { author } = res.data;
            setAuthorData(author)

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (recipeData) {
            fetchAuthor()
        }
    }, [recipeData])

    return { authorData }

}

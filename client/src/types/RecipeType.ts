export type Comment = {
    text: string;
    username: string;
    userId: string;
    _id: string;
}

export type RecipeType = {
    _id: string;
    authorId: string;
    title: string;
    comments: Comment[];
    likes: string[];
    tags: string[];
    ingredients: string[];
    timeToMake: string;
    description: string;
    image: string
}

export type RecipeCardProps = RecipeType & {
    recipes?: RecipeType[],
    setRecipes?: React.Dispatch<React.SetStateAction<RecipeType[]>>
}
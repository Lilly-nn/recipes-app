export type RecipeType = {
    _id: string;
    authorId: string;
    title: string;
    comments: string[];
    likes: string[];
    tags: string[];
    ingredients: string[];
    timeToMake: string;
}
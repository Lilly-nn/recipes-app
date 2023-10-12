export type UserInfo = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

export type UserData = {
    _id: string;
    name: string;
    email: string;
    isActivated?: boolean;
    city: string;
    createdAt: string;
}
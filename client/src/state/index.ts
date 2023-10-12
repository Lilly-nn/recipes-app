import { atom } from "recoil"
export const authorized = atom({
    key: 'authState', // unique ID (with respect to other atoms/selectors)
    default: localStorage.getItem('user_id') || false, // default value (aka initial value)
});
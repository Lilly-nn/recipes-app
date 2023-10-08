import { UserInfo } from "../types/userInfo";
import { registerErrors } from "../types/validation";

export function validateInputs(userInfo: UserInfo) {
    const errors = {} as registerErrors;
    const { name, password, confirmPassword } = userInfo;
    if (name.length < 6) {
        errors.name = "Name should contain at least 6 characters";
    }
    if (password.trim().length < 8) {
        errors.password = "Password should contain at least 8 characters";
    }
    if (password.trim() !== confirmPassword.trim()) {
        errors.confirmPassword = "Passwords should match"
    }
    return errors;
}


import * as Yup from 'yup';

export const registerSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).max(16).required("Please enter your password"),
    confirmPassword: Yup.string().min(6).max(16)
        .required()
        .oneOf([Yup.ref('password'), null], "Password must match"),
})

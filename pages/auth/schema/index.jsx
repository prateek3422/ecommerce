import * as yup from 'yup'



export const signupSchema = yup.object({
    name: yup.string().min(2).max(30).required('Please enter your name'),
    email: yup.string().email().required("Please enter your email"),
    password: yup.string().min(6).required("Please enter your password")

})
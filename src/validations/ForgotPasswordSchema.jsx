import * as yup from 'yup';

const ForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .min(3, "Email must be at least 3 characters"),
});

export default ForgotPasswordSchema;

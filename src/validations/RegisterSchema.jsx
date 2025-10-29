 import * as yup from 'yup';
 
 const RegisterSchema = yup.object({
    fullName: yup.string().required("Full Name IS Request").min(3,"min length is 3"),
    userName: yup.string().required("User Name IS Request").min(3,"min length is 3"),
    password: yup.string().required("password IS Request").min(3,"min length is 3").max(20,"Max is 20"),
    phoneNumber: yup.string().required("phoneNumber IS Request").min(3,"min length is 3"),
    email: yup.string().required("email IS Request").min(3,"min length is 3"),

  })
  export default RegisterSchema; 
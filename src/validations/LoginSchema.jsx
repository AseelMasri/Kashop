 import * as yup from 'yup';
 
 const LoginSchema = yup.object({
      email: yup.string().required("email IS Request").min(3,"min length is 3"),
      password: yup.string().required("password IS Request").min(3,"min length is 3").max(20,"Max is 20"),

  })
  export default LoginSchema; 
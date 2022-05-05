import * as yup from "yup";

const UserShape = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  balance: yup.number().default(0),
});

const LoginShape = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const UpdateUserShape = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("Invalid email"),
  password: yup.string().min(6, "Password must be at least 6 characters"),
});

export { UserShape, LoginShape, UpdateUserShape };

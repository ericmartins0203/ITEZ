import * as yup from "yup";

const ExpendShape = yup.object().shape({
  value: yup
    .number()
    .positive("Value is positive")
    .required("Value is required"),
  date: yup.date().required("Date is required"),
  type: yup.string().required("Type is required"),
  description: yup.string().default("No description"),
});

const UpdateExpendShape = yup.object().shape({
  value: yup.number().positive("Expend is a positive value"),
  date: yup.date(),
  description: yup.string(),
});

export { ExpendShape, UpdateExpendShape };

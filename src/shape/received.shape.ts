import * as yup from "yup";

const ReceivedShape = yup.object().shape({
  value: yup
    .number()
    .positive("Value is positive")
    .required("Value is required"),
  date: yup.date().required("Date is required"),
  description: yup.string().default("No description"),
});

const UpdateReceivedShape = yup.object().shape({
  value: yup.number().positive("Received is a positive value"),
  date: yup.date(),
  description: yup.string(),
});

export { ReceivedShape, UpdateReceivedShape };

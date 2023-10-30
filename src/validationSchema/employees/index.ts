import * as yup from 'yup';

export const employeeValidationSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().required(),
  position: yup.string().required(),
  salary: yup.number().integer().required(),
  date_hired: yup.date().required(),
  user_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});

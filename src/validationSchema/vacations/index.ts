import * as yup from 'yup';

export const vacationValidationSchema = yup.object().shape({
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  duration: yup.number().integer().required(),
  status: yup.string().required(),
  employee_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});

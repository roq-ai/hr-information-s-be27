import * as yup from 'yup';

export const payrollValidationSchema = yup.object().shape({
  gross_salary: yup.number().integer().required(),
  net_salary: yup.number().integer().required(),
  tax: yup.number().integer().required(),
  deductions: yup.number().integer().required(),
  bonus: yup.number().integer().nullable(),
  employee_id: yup.string().nullable().required(),
  user_id: yup.string().nullable().required(),
});

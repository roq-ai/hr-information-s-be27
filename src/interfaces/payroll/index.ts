import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PayrollInterface {
  id?: string;
  employee_id: string;
  gross_salary: number;
  net_salary: number;
  tax: number;
  deductions: number;
  bonus?: number;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  user?: UserInterface;
  _count?: {};
}

export interface PayrollGetQueryInterface extends GetQueryInterface {
  id?: string;
  employee_id?: string;
  user_id?: string;
}

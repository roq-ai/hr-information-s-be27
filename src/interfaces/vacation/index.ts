import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VacationInterface {
  id?: string;
  start_date: any;
  end_date: any;
  duration: number;
  status: string;
  employee_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  user?: UserInterface;
  _count?: {};
}

export interface VacationGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  employee_id?: string;
  user_id?: string;
}

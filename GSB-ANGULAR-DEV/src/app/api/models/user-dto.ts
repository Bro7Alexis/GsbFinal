/* tslint:disable */
import { MedicamentDto } from './medicament-dto';
export interface UserDto {
  address: string;
  email: string;
  firstName: string;
  gender: 'Male' | 'Female';
  id: number;
  image: string;
  lastName: string;
  medicines: Array<MedicamentDto>;
  role: 'Admin' | 'Doctor' | 'Comptable' | 'Commercial';
}

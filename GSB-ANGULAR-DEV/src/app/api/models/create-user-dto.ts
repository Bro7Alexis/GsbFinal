/* tslint:disable */
export interface CreateUserDto {
  address: string;
  email: string;
  firstName: string;
  gender: 'Male' | 'Female';
  image?: string;
  lastName: string;
  password: string;
  role: 'Admin' | 'Doctor' | 'Comptable' | 'Commercial';
}

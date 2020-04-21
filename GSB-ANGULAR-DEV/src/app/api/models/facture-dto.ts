/* tslint:disable */
import { UserDto } from './user-dto';
export interface FactureDto {
  commercialId: UserDto;
  date: string;
  doctor: UserDto;
  id: number;
  orders: number;
}

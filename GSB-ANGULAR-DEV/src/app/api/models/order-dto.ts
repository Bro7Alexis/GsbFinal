/* tslint:disable */
import { MedicamentDto } from './medicament-dto';
export interface OrderDto {
  id: number;
  medicine: MedicamentDto;
  quantity: number;
}

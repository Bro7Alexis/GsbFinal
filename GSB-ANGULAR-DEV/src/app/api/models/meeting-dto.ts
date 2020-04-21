/* tslint:disable */
import { UserDto } from './user-dto';
export interface MeetingDto {
  attendee: UserDto;
  date: number;
  hours: string;
  id: number;
  organizer: UserDto;
  state: 'Declined' | 'Accepted' | 'Pending';
}

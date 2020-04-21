import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { MeetingService } from '../../api/services/meeting.service';
import { ProfilComponent } from '../profil/profil.component'

@Component({
  selector: 'app-meeting',
  templateUrl: './meeting.component.html',
  styleUrls: ['./meeting.component.scss']
})
export class MeetingComponent implements OnInit {
  UserId:number;
  title = 'Mes rendez-vous';

  constructor(
    private roleService : RoleService,
    private meetingService : MeetingService,
    private theme : ProfilComponent
  ) { }

  ngOnInit() {
    this.theme.setDefaultTheme();
    this.UserId = this.roleService.getId();
    this.meetingService.getMeetingId(this.UserId).toPromise().then(
      userMeetings => console.log(userMeetings)
    )
  }

}

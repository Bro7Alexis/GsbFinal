import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchBarService } from '../services/search-bar.service';
import { UserService } from '../api/services/user.service';
import { UserDto } from '../api/models/user-dto';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material';
import { RoleService } from '../services/role.service';
import { ProfilComponent } from '../component/profil/profil.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarConfig, MatSnackBar} from '@angular/material/snack-bar';
import { MeetingService } from '../api/services/meeting.service'
import { CreateMeetingDto } from '../api/models';

export interface hoursData{
  hours:string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class MedecinUserComponent implements OnInit {
  @ViewChild(MatCalendar, {static: false}) _datePicker: MatCalendar<Date>;
  selectedDate: Date;
  datesToHighlight = [''];
  role: any;
  startDate : Date;
  hide : boolean;
  Data : hoursData[] = [];
  data : string[];
  displayhours = [];
  UserDto: UserDto[] = [];
  formGroup : FormGroup;
  selectedHours:string;
  trueDate : any;
  snackConfig: MatSnackBarConfig = {duration: 100000};
  activatedUserRoute:number;

  hours = [
    { hours : '9:00'},
    { hours : '9:30'},
    { hours : '10:00'},
    { hours : '10:30'},
    { hours : '11:00'},
    { hours : '11:30'},
    { hours : '12:00'},
    { hours : '14:00'},
    { hours : '14:30'},
    { hours : '15:00'},
    { hours : '15:30'},
    { hours : '16:00'},
    { hours : '16:30'},
    { hours : '17:00'},
    ];

    constructor(
                private route: ActivatedRoute,
                public searchb: SearchBarService,
                private userService: UserService,
                private roleService: RoleService,
                private theme: ProfilComponent,
                private formBuilder: FormBuilder,
                private snackBar : MatSnackBar,
                private meetingService : MeetingService
                ) { 
                this.formGroup = this.formBuilder.group({
                 CalendarDate : ['', Validators.required],
                 CalendarHours : ['', Validators.required]
                });
               }

  ngOnInit() {
    this.activatedUserRoute = Number(this.route.snapshot.params.id);
    this.startDate = new Date();
    this.getChangedValue(this.startDate);
    this.route.params.subscribe(params => {
      this.userService.getUserId(params.id).subscribe(user => { this.UserDto.push(user)});
    });

    this.role = this.roleService.getRole();
    this.theme.setDefaultTheme();
    
  }

  getChangedValue(e: Date)  {
    this.selectedDate = e;
    if(this.selectedDate.getTime() <= new Date().getTime()){
        this.hide = true;
    }else{
      this.hide = false;
    }

    let newDate = this.selectedDate.toLocaleDateString().replace('-', '/');
    this.trueDate = new Date(newDate).getTime();

    this.meetingService.getMeetingSearchDateId({date : this.trueDate, id : this.activatedUserRoute}).toPromise().then(
      userMeetings=> {
        this.Data = userMeetings;

        const data = this.Data;
        if (data.length !== 0) {
          const filteredArray  = this.hours.filter(function(array_el){
            return data.filter(function(anotherOne_el){
               return anotherOne_el.hours == array_el.hours;
            }).length == 0;
         });
          this.displayhours = filteredArray;
      } else {
          this.displayhours = this.hours;
        }

      }
    );

  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.datesToHighlight
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());

      return highlightDate ? 'special-date' : '';
    };
  }

  getHours(e: string){
    this.selectedHours = e; 
  }

  saveMeeting(){
    console.log(this.route.snapshot.params.id);
    if(this.selectedHours && this.trueDate ){
      const createMeetingDto : CreateMeetingDto = {
        attendee : this.roleService.getId(),
        organizer: this.activatedUserRoute,
        date : this.trueDate,
        hours:this.selectedHours
      }
      this.meetingService.putMeeting(createMeetingDto).toPromise().then(
        () => {
          this.snackBar.open('Votre rdv a bien été pris en compte', 'OK', this.snackConfig);
        },
        error => this.snackBar.open(error.error.message, 'OK', this.snackConfig)
      )
    }else{
      this.snackBar.open('Veuillez selectionner une date et une heure.', 'OK', this.snackConfig);
    }
  }
}

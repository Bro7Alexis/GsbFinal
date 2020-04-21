import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../../api/services/user.service';
import { UserDto } from '../../api/models/user-dto';
import { AuthService } from '../../services/auth/auth.service';
import { Router, Route } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { NavService } from 'src/app/services/nav.service';

// tslint:disable-next-line: no-empty-interface
// tslint:disable-next-line: class-name
export interface navList{
  name: string;
  rout: string;
  icon: string;
  role: string[];
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})



export class NavComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private readonly authservice: AuthService,
              public auth: AuthService,
              public router: Router,
              private readonly roleService: RoleService,
              public navService: NavService,
              ) {}

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    public UserDto: UserDto[] = [];
    private role: any;

    navList: navList[] = [
      // {
      //     name: 'Acceuil',
      //     rout: '/dashboard',
      //     icon: 'home',
      //     role: ['Admin']
      // },
      {
        name: 'Utilisateurs',
        rout: '/users',
        icon: 'supervised_user_circle',
        role: ['Directeur', 'Admin']
      },
      // {
      //     name: 'Médecins',
      //     rout: '/medecins',
      //     icon: 'supervised_user_circle',
      //     role: ['Commercial', 'Admin']
      // },
      {
          name: 'Prendre rendez-vous',
          rout: '/commercials',
          icon: 'calendar_today',
          role: ['Commercial', 'Admin', 'Doctor']
      },
      {
          name: 'Médicaments',
          rout: '/medicaments',
          icon: 'local_hospital',
          role: ['Commercial', 'Admin', 'Doctor', 'Comptable']
      },
      {
          name: 'Factures',
          rout: '/bills',
          icon: 'assignment',
          role: ['Admin', 'Comptable']
      },
  ];

  navList1: navList[] = [
  {
    name: 'Mes rendez-vous',
    rout: '/user/meetings',
    icon: 'calendar_view_day',
    role: ['Commercial', 'Admin', 'Doctor']
  },
  // {
  //   name: 'Mes factures',
  //   rout: '/user/bills',
  //   icon: 'assignment',
  //   role: ['Commercial', 'Admin', 'Doctor', 'Comptable']
  // },
  {
    name: 'Mes médicaments',
    rout: '/user/medicines',
    icon: 'local_hospital',
    role: ['Commercial', 'Admin', 'Doctor']
  },
  {
    name: 'Profil',
    rout: '/profil',
    icon: 'person',
    role: ['Commercial', 'Admin', 'Doctor', 'Comptable']
  }

];

  ngOnInit() {
    this.userService.getUserMe().subscribe(user => this.UserDto.push(user));
    this.role = this.roleService.getRole();
  }

  logout() {
    this.authservice.logout();
  }

}

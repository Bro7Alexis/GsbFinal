import { Component } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { SearchBarService } from '../../services/search-bar.service';
import { NavService } from 'src/app/services/nav.service';
import { ProfilComponent } from '../profil/profil.component';
import { UserDto } from 'src/app/api/models/user-dto';
import { UserService } from 'src/app/api/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    public search: SearchBarService,
    public navService: NavService,
    private theme : ProfilComponent,
    private userService: UserService
    ) {}
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { 
            title: 'Nombre d\'utilisateurs', 
            cols: 3, 
            rows: 1 
          },
          { 
            title: 'Ajouter des utilisateurs', 
            cols: 3, 
            rows: 1 
          },
          { 
            title: 'Fiches à valider d\'urgence', 
            cols: 3, 
            rows: 1 
          },
          { 
            title: 'Dernières connections',
            cols: 3, 
            rows: 1 
          },
          { 
            title: 'Notes de frais à rembourser', 
            cols: 3, 
            rows: 1 
          }
        ];
      }

      return [
        { 
          title: 'Nombre d\'utilisateurs', 
          cols: 1,
          rows: 1 
        },
        { title: 'Ajouter des utilisateurs', cols: 1, rows: 1 },
        { title: 'Fiches à valider d\'urgence', cols: 1, rows: 1 },
        { title: 'Dernières connections', cols: 2, rows: 3 },
        { title: 'Notes de frais à rembourser', cols: 1, rows: 2 }
      ];
    })
  );
  title = 'Acceuil';
  Users: UserDto[] = [];
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.navService.show();
    this.theme.setDefaultTheme();

    // this.userService.getUser().pipe(
    //   map(response => response),
    //   tap(users =>  users)
    // )
    // .subscribe(users => this.Users = users);
}

}

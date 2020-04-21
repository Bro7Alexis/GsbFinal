import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/api/models/user-dto';
import { UserService } from 'src/app/api/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { RoleService } from 'src/app/services/role.service';
import { ProfilComponent } from '../profil/profil.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class FicheUserComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private readonly roleService: RoleService,
    public router: Router,
    private theme : ProfilComponent
  ) { }

  private role: any;
  UserDto: UserDto[] = [];
  User: UserDto[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUserId(params.id).subscribe(user => { this.UserDto.push(user), console.log(user); });
    });
    this.userService.getUserMe().subscribe(user => this.User.push(user));
    this.role = this.roleService.getRole();
    this.theme.setDefaultTheme();
  }

  deleteUser(){
    this.route.params.subscribe(params => {
      this.userService.deleteUserId(params.id).subscribe();
      this.router.navigateByUrl('/users');
    });
  }

}

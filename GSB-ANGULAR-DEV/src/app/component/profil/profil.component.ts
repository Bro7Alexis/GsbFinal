import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { UserService } from 'src/app/api/services/user.service';
import { UserDto } from '../../api/models/user-dto';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UpdateUserDto } from 'src/app/api/models/update-user-dto';
import { MatSnackBarConfig, MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  role: any;
  url: any;
    // let's define default theme
  themeColor = 'light-theme';
  checked = false;
  disabled = false;

  formUpdateCredential: FormGroup;

  title = 'Profil';

  id: number;

  private UserDto: UserDto[] = [];

  snackConfig: MatSnackBarConfig = {duration: 100000};

  constructor(public navService: NavService,
              public userService: UserService,
              private readonly snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private readonly roleService: RoleService,
              private router: Router) {
                this.formUpdateCredential = this.formBuilder.group({
                    firstName: ['',  Validators.required],
                    lastName: ['',  Validators.required],
                    email: ['', Validators.compose([Validators.email, Validators.required])],
                    address: ['',  Validators.required],
                    password: ['',  Validators.required]
                });
              }



  ngOnInit() {
    this.userService.getUserMe().subscribe(user => {this.UserDto.push(user),
      this.id = user.id,
      this.formUpdateCredential = this.formBuilder.group({
        firstName: [user.firstName, Validators.required],
        lastName: [user.lastName, Validators.required],
        email: [user.email, Validators.compose([Validators.email, Validators.required])],
        address: [user.address, Validators.required],
        password: ['',  Validators.required],
    });
    });
    this.role = this.roleService.getRole();
    this.navService.show();
    this.setDefaultTheme();
    if(this.themeColor === 'dark-theme' ){
      this.checked = true;
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = (event.target as FileReader).result;
      }
    }
  }

  UpdateCredential(): void {
    if (this.formUpdateCredential.valid) {
      const UpdateUserDto: UpdateUserDto = {
        email: this.formUpdateCredential.value.email,
        password: this.formUpdateCredential.value.password,
        firstName: this.formUpdateCredential.value.firstname,
        lastName: this.formUpdateCredential.value.lastname,
        address: this.formUpdateCredential.value.adresse
      };
      this.userService.postUserId(this.formUpdateCredential.value).toPromise().then(
        () => {
          this.snackBar.open('Votre compte à crée', 'OK', this.snackConfig);
          this.router.navigate(['profil']);
        },
        error => this.snackBar.open(error.error.message, 'OK', this.snackConfig)
      );
    } else {
      this.snackBar.open('Veuillez remplir tous les champs', 'OK', this.snackConfig);
    }
  }

  setDefaultTheme(){

    // if theme is stored in storage - use it

    if(localStorage.getItem('pxTheme')){

        //set theme color to one from storage
        this.themeColor = localStorage.getItem('pxTheme');

        //add that class to body
        const body = document.getElementsByTagName('body')[0];
        body.classList.add(this.themeColor);
    }
}

themeSwitcher(){

  const body = document.getElementsByTagName('body')[0];
  body.classList.remove(this.themeColor);

  // switch theme
  (this.themeColor == 'light-theme')?this.themeColor = 'dark-theme':this.themeColor = 'light-theme';

  body.classList.add(this.themeColor);

  //save it to local storage

  localStorage.setItem('pxTheme',this.themeColor);

}

}

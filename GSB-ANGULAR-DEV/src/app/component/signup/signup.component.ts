import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleEnum } from 'src/app/enum/role.enum';
import { GenderEnum } from 'src/app/enum/gender.enum';
import { MatSnackBarConfig, MatSnackBar} from '@angular/material/snack-bar';
import { CreateUserDto } from 'src/app/api/models/create-user-dto';
import { AuthService } from 'src/app/api/services/auth.service';
import { Router } from '@angular/router';
import { NavService } from 'src/app/services/nav.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  private url = 'http://localhost:3000/api/avatar';
  fileToUpload: File = null;
  filename: string;
  formInput: FormGroup;
  snackConfig: MatSnackBarConfig = {duration: 100000};

  roles: string[] = Object.keys(RoleEnum).filter((v) => isNaN(+v));
  genders: string[] = Object.keys(GenderEnum).filter((v) => isNaN(+v));

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private readonly snackBar: MatSnackBar,
    private authService: AuthService,
    private navService: NavService,
    private location: Location,
    private router: Router) {

    this.formInput = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      adresse: ['', Validators.required],
      image: ['',]
    });
   }

  ngOnInit() {
    this.navService.hide();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.filename = this.fileToUpload.name;
  }

  signup(): void {
    if (this.formInput.valid) {
      // tslint:disable-next-line: one-variable-per-declaration
      const userToCreate: CreateUserDto = {
        email: this.formInput.value.email,
        password: this.formInput.value.password,
        firstName: this.formInput.value.firstname,
        lastName: this.formInput.value.lastname,
        address: this.formInput.value.adresse,
        role: this.formInput.value.role,
        gender: this.formInput.value.gender,
        image: this.filename
      };
      this.authService.putAuthSignup(userToCreate).toPromise().then(
        () => {
          if(this.formInput.value.image){
            // tslint:disable-next-line: new-parens
            const formData = new FormData;
            formData.append('file', this.fileToUpload, this.filename);
            this.http.post(this.url, formData)
              .subscribe(res => {
                console.log(res);
              });
          }
          this.snackBar.open('Votre compte à crée', 'OK', this.snackConfig);
          this.router.navigate(['medecins']);
        },
        error => this.snackBar.open(error.error.message, 'OK', this.snackConfig)
      );
    } else {
      this.snackBar.open('Renseigner les champs sans erreur.', 'OK', this.snackConfig);
    }
    }

    GoBack() {
      this.location.back();
    }
}

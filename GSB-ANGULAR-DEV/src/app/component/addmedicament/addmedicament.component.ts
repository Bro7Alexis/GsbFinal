import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBarConfig, MatSnackBar} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicamentsService } from '../../api/services/medicaments.service';
import { MedicamentDto } from 'src/app/api/models/medicament-dto';
import { map, tap } from 'rxjs/operators';
import { CreateMedicamentDto } from 'src/app/api/models/create-medicament-dto';
import { HttpClient } from '@angular/common/http';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-addmedicament',
  templateUrl: './addmedicament.component.html',
  styleUrls: ['./addmedicament.component.scss']
})
export class AddmedicamentComponent implements OnInit {

  private url = 'http://localhost:3000/api/avatar';
  formInput: FormGroup;
  fileToUpload: File = null;
  filename: string;
  snackConfig: MatSnackBarConfig = {duration: 100000};
  private url_image:any;
  private id:number;

  constructor(public dialogRef: MatDialogRef<AddmedicamentComponent>,
    private fb: FormBuilder,
    private http: HttpClient,
    private medicamentService: MedicamentsService,
    private snackBar: MatSnackBar,
    private roleService : RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) 
    { 
      this.formInput = this.fb.group({
        nom: ['', Validators.required],
        description: ['', Validators.required],
        img: ['', Validators.required],
        commercial: [this.id, Validators.required],
        prix: ['', Validators.required]
      });
    }

  ngOnInit() {

    this.id = this.roleService.getId();
    this.formInput = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required],
      commercial: [this.id, Validators.required],
      prix: ['', Validators.required]
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.filename = this.fileToUpload.name;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url_image = (event.target as FileReader).result;
      }
    }
  }

  add(){
    if (this.formInput.valid) {
      // tslint:disable-next-line: one-variable-per-declaration
      const medToCreate: CreateMedicamentDto = {
        nom: this.formInput.value.nom,
        description: this.formInput.value.description,
        img: this.filename,
        commercial : this.id,
        prix:this.formInput.value.prix
      };
      this.medicamentService.putMedicaments(medToCreate).toPromise().then(
        () => {
          if(this.formInput.value.img){
            // tslint:disable-next-line: new-parens
            const formData = new FormData;
            formData.append('file', this.fileToUpload, this.filename);
            this.http.post(this.url, formData)
              .subscribe(res => {
                console.log(res);
              });
          }
          this.dialogRef.close();
          this.snackBar.open('Votre médicament à été crée', 'OK', this.snackConfig);
        },
        error => this.snackBar.open(error.error.message, 'OK', this.snackConfig)
      );
    } else {
      this.snackBar.open('Renseigner les champs sans erreur.', 'OK', this.snackConfig);
    }
  }

}

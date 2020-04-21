import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBarConfig, MatSnackBar} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturesService } from '../../api/services/factures.service';
import { CreateFactureDto } from 'src/app/api/models/create-facture-dto';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrls: ['./add-facture.component.scss']
})
export class AddFactureComponent implements OnInit {

  formInput: FormGroup;
  snackConfig: MatSnackBarConfig = {duration: 100000}

  constructor(public dialogRef: MatDialogRef<AddFactureComponent>,
    private fb: FormBuilder,
    private factureService: FacturesService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) 
    { 
      this.formInput = this.fb.group({
        prix_hotel: ['', Validators.required],
        description: ['', Validators.required],
        prix_repas: ['', Validators.required],
        nombre_kilometre: ['', Validators.required],
        prix_transport: ['', Validators.required],
        date:['', Validators.required]
      });
    }

  ngOnInit() {
  }

  // add(){
  //   if (this.formInput.valid) {
  //     // tslint:disable-next-line: one-variable-per-declaration
  //     const factureToCreate: CreateFactureDto = {
  //       date: this.formInput.value.date,
  //       prix_hotel: this.formInput.value.prix_hotel,
  //       prix_repas: this.formInput.value.prix_repas,
  //       nombre_kilometre: this.formInput.value.nombre_kilometre,
  //       prix_transport: this.formInput.value.prix_transport,
  //     };
  //     this.factureService.putFactures(factureToCreate).toPromise().then(
  //       () => {
  //         this.dialogRef.close();
  //         this.snackBar.open('Votre facture à été crée', 'OK', this.snackConfig);
  //       },
        
  //       error => this.snackBar.open(error.error.message, 'OK', this.snackConfig)
  //     );
  //   } else {
  //     this.snackBar.open('Renseigner les champs sans erreur.', 'OK', this.snackConfig);
  //   }

  // }

}

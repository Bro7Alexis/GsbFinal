
import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';
import { MedicamentsService } from '../../api/services/medicaments.service';
import { MedicamentDto } from 'src/app/api/models/medicament-dto';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dialog',
  templateUrl: './updateMedicamentDialog.component.html',
  styleUrls: ['./updateMedicamentDialog.component.scss']
})
// tslint:disable-next-line: component-class-suffix
export class UpdateMedicamentDialog implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdateMedicamentDialog>,
              private fb: FormBuilder,
              private medicamentService: MedicamentsService,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  public MedicamentDto: MedicamentDto[] = [];

  ngOnInit() {
    this.medicamentService.getMedicamentsId(this.data.id).subscribe(medicament => {this.MedicamentDto.push(medicament), console.log(medicament)});
  }

}
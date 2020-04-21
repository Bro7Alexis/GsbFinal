import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacturesService } from '../../../api/services/factures.service';
import { FactureDto } from '../../../api/models/facture-dto';
import { map, tap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/role.service';


@Component({
  selector: 'app-updatefacture',
  templateUrl: './updatefacture.component.html',
  styleUrls: ['./updatefacture.component.scss']
})
export class UpdatefactureComponent implements OnInit {
  private Facture: FactureDto[] = [];
  private formInput: FormGroup;
  private role: string;
  constructor(
              private factureService:FacturesService,
              public dialogRef: MatDialogRef<UpdatefactureComponent>,
              private fb:FormBuilder,
              private roleService: RoleService,
              @Inject(MAT_DIALOG_DATA) public data: any
             ) { 
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
    this.factureService.getFacturesId(this.data.id).pipe(
      map(response => response),
      tap(facture =>  facture)    // users array [Object, Object, Object]
    )
    .subscribe(factures => this.Facture.push(factures));
    this.role = this.roleService.getRole();          
  }

  deleteFacture(){
    this.factureService.deleteFacturesId(this.data.id).subscribe();
    this.dialogRef.close();
  }

}

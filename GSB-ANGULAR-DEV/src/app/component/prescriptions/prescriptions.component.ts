import { Component, OnInit } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { FacturesService } from '../../api/services/factures.service';
import { FactureDto } from '../../api/models/facture-dto';
import { map, tap } from 'rxjs/operators';
import { RoleService } from 'src/app/services/role.service';
import { AddFactureComponent } from '../add-facture/add-facture.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfilComponent } from '../profil/profil.component';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  private role: any;

  constructor(
              public navService:NavService,
              private factureService : FacturesService,
              private roleService: RoleService,
              private dialog: MatDialog,
              private theme : ProfilComponent,
              ) { }

              title = "Factures";

  private FactureDto: FactureDto[] = [];

  addFacture(): void {
    const dialogRef = this.dialog.open(AddFactureComponent, {
    width: '800px',
    });
    dialogRef.afterClosed().subscribe(result => {
     this.ngOnInit();
    });
  }

  ngOnInit() {
    this.navService.show();
    this.factureService.getFactures().pipe(
      map(response => response),
      tap(factures =>  factures)    // users array [Object, Object, Object]
    )
    .subscribe(factures => this.FactureDto = factures);
    this.role = this.roleService.getRole();
    this.theme.setDefaultTheme();
}

}

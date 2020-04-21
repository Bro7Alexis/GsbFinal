import { Component, OnInit } from '@angular/core';
import { ProfilComponent } from '../profil/profil.component';
import { FacturesService } from '../../api/services/factures.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {
title = "Mes factures";
userId:number;
  constructor(
    private theme : ProfilComponent,
    private facturesService : FacturesService,
    private roleService : RoleService
  ) { }

  ngOnInit() {
    this.userId = this.roleService.getId();
    this.theme.setDefaultTheme();
    this.facturesService.getFacturesDoctorId(this.userId).toPromise().then(
      userBills => console.log(userBills)
    )
  }

}

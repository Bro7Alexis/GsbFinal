import { Component, OnInit } from '@angular/core';
import { ProfilComponent } from '../profil/profil.component';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.scss']
})
export class MedicinesComponent implements OnInit {

  title = 'Mes médicaments';

  constructor(
    private theme : ProfilComponent
  ) { }

  ngOnInit() {
    this.theme.setDefaultTheme();
  }

}

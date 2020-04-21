import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { PageEvent } from '@angular/material/paginator';
import { NavService } from 'src/app/services/nav.service';
import { ProfilComponent } from '../profil/profil.component';

// tslint:disable-next-line: class-name

@Component({
  selector: 'app-patiens',
  templateUrl: './patiens.component.html',
  styleUrls: ['./patiens.component.scss']
})

export class PatiensComponent implements OnInit {
title = "Prendre rendez-vous";
isShow = true;

  constructor(
    private profilComponent : ProfilComponent
  ) { }
  
  ngOnInit(): void {
    this.profilComponent.setDefaultTheme();
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

}

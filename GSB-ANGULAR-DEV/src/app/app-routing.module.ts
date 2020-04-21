import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavComponent } from './component/nav/nav.component';
import { MedecinsComponent } from './component/medecins/medecins.component';
import { PatiensComponent } from './component/patiens/patiens.component';
import { MedicamentsComponent } from './component/medicaments/medicaments.component';
import { PrescriptionsComponent } from './component/prescriptions/prescriptions.component';
import { ProfilComponent } from './component/profil/profil.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { MedecinUserComponent } from './medecin-user/user.component';
import { SignupComponent } from './component/signup/signup.component';
import { AuthGuard } from './auth/auth.service';
import { RoleEnum } from './enum/role.enum';
import { RoleGuardService } from '../app/services/guards/auth/role-guard.service';
import { TableComponent } from './component/table/medecintable/table.component';
import { UsersComponent } from './component/users/users.component';
import { UsersTableComponent } from './component/table/users-table/users-table.component';
import { FicheUserComponent } from './component/fiche-user/user.component';
import { MeetingComponent } from './component/meeting/meeting.component';
import { BillComponent } from './component/bill/bill.component';
import { MedicinesComponent } from './component/medicines/medicines.component';



const routes: Routes = [
  { path : '', redirectTo: 'login', pathMatch: 'full'},
  { path : 'login', component: LoginComponent },
   { path : 'signup', component: SignupComponent},
  { path : '', component : NavComponent, canActivate : [AuthGuard], children : [
    { path : 'dashboard', component : DashboardComponent, canActivate: [RoleGuardService],  data: {
      expectedRole: 'Admin'
      }
     },
    { path : 'medecins', component : MedecinsComponent, children : [
      { path : 'table', component : TableComponent},
      ]
    },
    { path : 'commercial/user/:id', component : MedecinUserComponent},
    { path : 'users/user/:id', component : FicheUserComponent},
    { path : 'users', component: UsersComponent, children : [
      { path : 'table', component : UsersTableComponent},
      ],
    },
    { path : 'commercials', component : PatiensComponent },
    { path : 'medicaments', component : MedicamentsComponent },
    { path : 'bills', component : PrescriptionsComponent },
    { path : 'profil', component : ProfilComponent },
    { path : 'user/meetings', component : MeetingComponent },
    { path : 'user/bills', component : BillComponent },
    { path : 'user/medicines', component : MedicinesComponent },
    // { path : 'signup', component: SignupComponent, canActivate: [RoleGuardService],  data: {
    //   expectedRole: 'Admin'
    //   }
    //  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
// tslint:disable-next-line: max-line-length
// export const routinComponents = [LoginComponent, DashboardComponent, NavComponent, MedecinsComponent, PatiensComponent, MedicamentsComponent, PrescriptionsComponent, ProfilComponent];

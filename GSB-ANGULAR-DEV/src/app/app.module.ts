import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavService } from './services/nav.service';
import { RoleService } from './services/role.service';
import { PatiensComponent } from './component/patiens/patiens.component';
import { MedicamentsComponent } from './component/medicaments/medicaments.component';
import { PrescriptionsComponent } from './component/prescriptions/prescriptions.component';
import { ProfilComponent } from './component/profil/profil.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NavComponent } from './component/nav/nav.component';
import { LoginComponent } from './component/login/login.component';
import { MedecinsComponent } from './component/medecins/medecins.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';
import { TableComponent } from './component/table/medecintable/table.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { CookieModule } from '@ngx-toolkit/cookie';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialogModule, MAT_DATE_LOCALE } from '@angular/material';
import { UpdateMedicamentDialog } from './component/updateMedicamentDialog/updateMedicamentDialog.component';
import { DatePipe } from '@angular/common';

// import { TinyCalendar } from 'angular-tiny-calendar';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { MatButtonModule, MatMenuModule, MatToolbarModule, MatIconModule, MatCardModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarService } from './services/search-bar.service';
import { MedecinUserComponent } from './medecin-user/user.component';
import { SignupComponent } from './component/signup/signup.component';
import { SignupService } from './component/signup/signup.service';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { TokenInterceptorService } from './services/token-interceptor/token-interceptor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UsersComponent } from './component/users/users.component';
import { UsersTableComponent } from './component/table/users-table/users-table.component';
import { FicheUserComponent } from './component/fiche-user/user.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AddmedicamentComponent } from './component/addmedicament/addmedicament.component';
import { AddFactureComponent } from './component/add-facture/add-facture.component';
import { FacturetableComponent } from './component/table/facturetable/facturetable.component';
import { UpdatefactureComponent } from './component/table/updatefacture/updatefacture.component';
import { CommercialtableComponent } from './component/table/commercialtable/commercialtable.component';
import { SearchEnumComponent } from './component/search-enum/search-enum.component';
import { MeetingComponent } from './component/meeting/meeting.component';
import { BillComponent } from './component/bill/bill.component';
import { MedicinesComponent } from './component/medicines/medicines.component';




// I keep the new line
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    PatiensComponent,
    MedicamentsComponent,
    PrescriptionsComponent,
    ProfilComponent,
    LoginComponent,
    MedecinsComponent,
    TableComponent,
    SearchBarComponent,
    MedecinUserComponent,
    SignupComponent,
    UsersComponent,
    UsersTableComponent,
    FicheUserComponent,
    UpdateMedicamentDialog,
    AddmedicamentComponent,
    AddFactureComponent,
    FacturetableComponent,
    UpdatefactureComponent,
    CommercialtableComponent,
    SearchEnumComponent,
    MeetingComponent,
    BillComponent,
    MedicinesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatSlideToggleModule,
    CookieModule.forRoot()
  ],
  providers: [NavService, SearchBarService, ApiService, SignupService,MatDatepickerModule,
              RoleService,ProfilComponent,DatePipe,
          {
            provide: HTTP_INTERCEPTORS, 
            useClass: TokenInterceptorService,
            multi: true, 
          },
          {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateMedicamentDialog,
    AddmedicamentComponent,
    AddFactureComponent,
    UpdatefactureComponent
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
  ]
})
export class AppModule {
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { ApiService } from 'src/app/services/api.service';
import { RoleService } from 'src/app/services/role.service';
import { MedicamentsService } from '../../api/services/medicaments.service';
import { MedicamentDto } from 'src/app/api/models/medicament-dto';
import { MatDialog } from '@angular/material/dialog';
import { UpdateMedicamentDialog } from '../updateMedicamentDialog/updateMedicamentDialog.component';
import { AddmedicamentComponent } from '../addmedicament/addmedicament.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfilComponent } from '../profil/profil.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FacturesService } from 'src/app/api/services/factures.service';
import { CreateFactureDto } from 'src/app/api/models/create-facture-dto';
import { OrderService } from 'src/app/api/services/order.service';
import { CreatOrderDto } from 'src/app/api/models/creat-order-dto'
import { MatSnackBarConfig, MatSnackBar} from '@angular/material/snack-bar';
// tslint:disable-next-line: class-name

@Component({
  selector: 'app-medicaments',
  templateUrl: './medicaments.component.html',
  styleUrls: ['./medicaments.component.scss']
})

export class MedicamentsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    pageIndex = 0;
    pageSize = 5;
    private role: any;
    animal: string;
    name: string;
    search = '';
    title = 'Medicaments';
    public MedicamentDto: MedicamentDto[] = [];
    public MedicamentDtoById: MedicamentDto[] = [];
    snackConfig: MatSnackBarConfig = {duration: 100000};
    
    constructor(public navService: NavService,
                private factureService: FacturesService,
                private roleService: RoleService,
                private medicamentService: MedicamentsService,
                private dialog: MatDialog,
                private router:Router,
                private route:ActivatedRoute,
                private theme: ProfilComponent ,
                private orderService : OrderService,
                private snackBar : MatSnackBar) { }

     openDialog(id: any): void {
      const dialogRef = this.dialog.open(UpdateMedicamentDialog, {
      width: '800px',
      data: {id: id}
      });
    }

    addMedicament(): void {
      const dialogRef = this.dialog.open(AddmedicamentComponent, {
      width: '800px',
      });
      dialogRef.afterClosed().subscribe(result => {
       this.ngOnInit();
      });
    }

  deleteMedicament(id: number){
    this.medicamentService.deleteMedicamentsId(id).subscribe(res => this.ngOnInit());
    this.router.navigate(['/medicaments'],{relativeTo:this.route})
  }

    ngOnInit() {
    this.getMedicines(this.search);
      this.navService.show();
      this.role = this.roleService.getRole();
      console.log(this.role);
      this.theme.setDefaultTheme();
      this.getBills();
      this.getOrders();
      
    }

    getMedicines(search: string): void {
      this.medicamentService.getMedicaments({pageIndex: this.pageIndex, pageSize: this.pageSize, search}).toPromise().then(
        paginatedMedicines => {
          this.MedicamentDto = paginatedMedicines.elements;
          this.paginator.length = paginatedMedicines.nbElements;
        }
      );
    }
  
    pageChange(event: PageEvent): void {
      if (event.pageSize !== this.pageSize) {
        this.paginator.firstPage();
      }
  
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
  
  
      this.getMedicines(this.search);
    }
  
    searchChanged(search: string) {
      this.paginator.firstPage();
      this.search = search;
      this.getMedicines(this.search);
    }

    buyMedicine(id:number){
      const CreatOrderDto : CreatOrderDto = {
        medicine : id,
        quantity : 3
      }
      this.orderService.putOrder(CreatOrderDto).toPromise().then( () => {
        const createFactureDto : CreateFactureDto = {
          commercialId : 1,
          date : "Tue Apr 14 2020",
          doctor : this.roleService.getId(),
          orders : 1
        }
        this.factureService.putFactures(createFactureDto).toPromise().then( () => { (error: any) => console.log(error) } );
        this.snackBar.open('Le médicament à été commandé', 'OK', this.snackConfig);
      },error => console.log(error)
      );
    }

    getBills(){
      this.factureService.getFacturesId(this.roleService.getId()).toPromise().then( userBills => console.log(userBills))   
    }

    getOrders(){
      this.orderService.getOrderId(this.roleService.getId()).toPromise().then( userBills => console.log(userBills))   
    }

    ngOnDestroy() {
     
    }

}

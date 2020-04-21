import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SearchBarService } from '../../services/search-bar.service';
import { Router } from '@angular/router';
import { UserService } from '../../api/services/user.service';
import { UserDto } from '../../api/models/user-dto';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { NavService } from 'src/app/services/nav.service';
import { RoleService } from 'src/app/services/role.service';
import { ProfilComponent } from '../profil/profil.component';

interface Food {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  role: any;
  loading: boolean;

  constructor(public searchb: SearchBarService,
              private router: Router,
              private userService: UserService,
              public navService: NavService,
              private readonly roleService: RoleService,
              private theme: ProfilComponent) { }

  title = 'Utilisateurs';

  Users: UserDto[] = [];

  searchTerm: string;
  isShow = true;
  firstname:string = '';
  lastname :string ='';
  email:string = '';
  selectRole :number = -1;
  selectedRole:string = 'Tout';
  selection = new SelectionModel<UserDto>(true, []);
  dataSource = new MatTableDataSource<UserDto>(this.Users);
  foods: Food[] = [
    {value: 0, viewValue: 'Admin'},
    {value: 1, viewValue: 'Doctor'},
    {value: 2, viewValue: 'Compatble'}
  ];

  displayedUsers = []; // La liste qui est liée à la vue (celle qui est affichée)
  paginatorInfo: PageEvent = {pageSize: 5, pageIndex: 0, length: this.Users.length}; // Les informations que l'on lie au paginateur

  getSelected(role:number): void {
    this.selectRole = role;
    this.getUsers();
    switch(role){
      case -1  : this.selectedRole = 'Tout';
                break;
      case  0  : this.selectedRole = 'Admin';
                break;
      case  1  : this.selectedRole = 'Doctor';
                break;
      case  2  : this.selectedRole = 'Comptable';
                break;
      case  3  : this.selectedRole = 'Commercial';
                break;
      default : this.selectedRole = 'Tout';
    }
  }
  onSearchFirstnameChange(searchNameValue: string): void {  
    this.firstname = searchNameValue;
    this.getUsers();
  }
  onSearchLastnameChange(searchLastnameValue: string): void {  
    this.lastname = searchLastnameValue;
    this.getUsers();
  }
  onSearchEmailChange(searchEmailValue: string): void {  
    this.email = searchEmailValue;
    console.log(this.email);
    this.getUsers();
  }

  getUsers(){
    this.userService.getUser({role : this.selectRole, name : this.firstname, lastname: this.lastname, email : this.email }).subscribe(users => {
      this.Users = users as UserDto[],
      this.displayedUsers = this.Users;
      this.paginatorInfo.length = this.displayedUsers.length;
      // this.displayedUsers = this.paginateElements<UserDto>(this.Users, this.paginatorInfo);
      // tslint:disable-next-line: max-line-length
      this.displayedUsers = this.paginateElements<UserDto>(this.displayedUsers, this.paginatorInfo); // On pagine nos éléments qui correspondent à la recherche
      });
  }
  
  ngOnInit() {
  // this.searchb.show();
  // tslint:disable-next-line: max-line-length
  this.getUsers();
  this.theme.setDefaultTheme();
  this.role = this.roleService.getRole();
  this.navService.show();
  }
  
  // Méthode déclenchée lorsque l'utilisateur change de page ou change la taille du paginateur
  pageChange(event: PageEvent): void {
  this.paginatorInfo = event; // On met à jour la variable qui contient les informations du paginateur
  this.displayedUsers = this.paginateElements<UserDto>(this.Users, this.paginatorInfo); // On pagine nos éléments affichés
  }
  
  /*Méthode paramétrique qui permet de paginer des éléments de n'importe quel type
  Prend en paramètre un tableau d'élément et un paginateur
  Retourne un tableau d'élément du même type
  */
  paginateElements<T>(elements: T[], paginator: PageEvent): T[] {
  return elements.filter((element, index) => {
  const start = paginator.pageIndex * paginator.pageSize; // On construit l'indice de départ.
  const end = start + paginator.pageSize - 1; // On construit l'indice de fin.
  return index >= start && index <= end; // On conserve que les éléments qui sont compris entre les indices de départ et de fin.
  });
  }
  
  deleteUser(e: number) {
  this.userService.deleteUserId(e).subscribe( x => {
    this.ngOnInit();
  });
  }
  
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  
  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserDto): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  toggleDisplay() {
    this.isShow = !this.isShow;
  }
}

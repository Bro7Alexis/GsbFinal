import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SearchBarService } from '../../../services/search-bar.service';
import { Router } from '@angular/router';
import { UserService } from '../../../api/services/user.service';
import { UserDto } from '../../../api/models/user-dto';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit {

  constructor(
              public searchb: SearchBarService,
              private router: Router,
              private userService: UserService
              ) { }
searchTerm: string;

Users: UserDto[] = [];
selection = new SelectionModel<UserDto>(true, []);
dataSource = new MatTableDataSource<UserDto>(this.Users);


displayedUsers = []; // La liste qui est liée à la vue (celle qui est affichée)
paginatorInfo: PageEvent = {pageSize: 5, pageIndex: 0, length: this.Users.length}; // Les informations que l'on lie au paginateur

ngOnInit() {
// this.searchb.show();
// tslint:disable-next-line: max-line-length
// this.userService.getUser().subscribe(users => {
// this.Users = users as UserDto[],
// this.displayedUsers = this.Users;
// this.paginatorInfo.length = this.displayedUsers.length;
// // this.displayedUsers = this.paginateElements<UserDto>(this.Users, this.paginatorInfo);
// // tslint:disable-next-line: max-line-length
// this.displayedUsers = this.paginateElements<UserDto>(this.displayedUsers, this.paginatorInfo); // On pagine nos éléments qui correspondent à la recherche
// });
}

// Méthode déclenchée lorsqu'une recherche est faite dans notre composant de recherche
search(query: string): void {
// Si la recherche est vide on affecte tous les éléments à la liste que l'on affiche
this.displayedUsers = this.Users;

// Sinon on filtre les éléments dont le nom ou le prénom ne commence pas par la chaîne recherchée
if (query !== '') {
this.displayedUsers = this.Users.filter((doctor) => {

const len = query.length; // On récupère la taille de la chaîne recherchée
// tslint:disable-next-line: max-line-length
const firstname = doctor.firstName.trim().substr(0, len).toLocaleLowerCase(); // On crée une sous chaîne du prénom de la même taille que celle recherchée
const lastname = doctor.lastName.trim().substr(0, len).toLowerCase(); // Idem ave cle nom

// On vérifie ensuite l'égalité des chaînes (on transforme ces chaînes en minuscule pour ne pas être sensible à la casse)
const firstNameMatched = firstname === query.toLowerCase();
const lastNameMatched = lastname === query.toLowerCase();

// On conserve les éléments si la sous-chaîne créée avec le prénom ou celle créée avec le nom correspond
return firstNameMatched || lastNameMatched;
});
}

this.paginatorInfo.pageIndex = 0; // On remet le paginateur à la première page
this.paginatorInfo.length = this.displayedUsers.length; // On affecte la taille des éléments trouvés à la taille du paginateur
// tslint:disable-next-line: max-line-length
this.displayedUsers = this.paginateElements<UserDto>(this.displayedUsers, this.paginatorInfo); // On pagine nos éléments qui correspondent à la recherche
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

}

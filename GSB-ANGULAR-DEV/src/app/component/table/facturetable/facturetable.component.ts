import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { SearchBarService } from '../../../services/search-bar.service';
import { Router } from '@angular/router';
import { FacturesService } from '../../../api/services/factures.service';
import { FactureDto } from '../../../api/models/facture-dto';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdatefactureComponent } from '../updatefacture/updatefacture.component';

@Component({
  selector: 'app-facturetable',
  templateUrl: './facturetable.component.html',
  styleUrls: ['./facturetable.component.scss']
})
export class FacturetableComponent implements OnInit {

    constructor(
                  public searchb: SearchBarService,
                  private router: Router,
                  private factureService: FacturesService,
                  private dialog: MatDialog
                ) { }

  Factures: FactureDto[] = [];
  DisplayFactures = []; // La liste qui est liée à la vue (celle qui est affichée)
  paginatorInfo: PageEvent = {pageSize: 5, pageIndex: 0, length: this.Factures.length};

  ngOnInit() {
    this.factureService.getFactures().subscribe(users => {
      this.Factures = users as FactureDto[],
      this.DisplayFactures = this.Factures;
      this.paginatorInfo.length = this.DisplayFactures.length;
      // this.displayedUsers = this.paginateElements<UserDto>(this.Users, this.paginatorInfo);
      // tslint:disable-next-line: max-line-length
      this.DisplayFactures = this.paginateElements<FactureDto>(this.DisplayFactures, this.paginatorInfo); // On pagine nos éléments qui correspondent à la recherche
      });
      }

      // Méthode déclenchée lorsqu'une recherche est faite dans notre composant de recherche
search(query: string): void {
  // Si la recherche est vide on affecte tous les éléments à la liste que l'on affiche
  this.DisplayFactures = this.Factures;
  
  // Sinon on filtre les éléments dont le nom ou le prénom ne commence pas par la chaîne recherchée
  if (query !== '') {
  this.DisplayFactures = this.Factures.filter((facture) => {
  
  const len = query.length; // On récupère la taille de la chaîne recherchée
  // tslint:disable-next-line: max-line-length
  const firstname = facture.date.trim().substr(0, len).toLocaleLowerCase(); // On crée une sous chaîne du prénom de la même taille que celle recherchée
  
  // On vérifie ensuite l'égalité des chaînes (on transforme ces chaînes en minuscule pour ne pas être sensible à la casse)
  const firstNameMatched = firstname === query.toLowerCase();
  
  // On conserve les éléments si la sous-chaîne créée avec le prénom ou celle créée avec le nom correspond
  return firstNameMatched;
  });
  }
  
  this.paginatorInfo.pageIndex = 0; // On remet le paginateur à la première page
  this.paginatorInfo.length = this.DisplayFactures.length; // On affecte la taille des éléments trouvés à la taille du paginateur
  // tslint:disable-next-line: max-line-length
  this.DisplayFactures = this.paginateElements<FactureDto>(this.DisplayFactures, this.paginatorInfo); // On pagine nos éléments qui correspondent à la recherche
  }

  // Méthode déclenchée lorsque l'utilisateur change de page ou change la taille du paginateur
pageChange(event: PageEvent): void {
  this.paginatorInfo = event; // On met à jour la variable qui contient les informations du paginateur
  this.DisplayFactures = this.paginateElements<FactureDto>(this.Factures, this.paginatorInfo); // On pagine nos éléments affichés
  }

  paginateElements<T>(elements: T[], paginator: PageEvent): T[] {
    return elements.filter((element, index) => {
    const start = paginator.pageIndex * paginator.pageSize; // On construit l'indice de départ.
    const end = start + paginator.pageSize - 1; // On construit l'indice de fin.
    return index >= start && index <= end; // On conserve que les éléments qui sont compris entre les indices de départ et de fin.
    });
    }

    seeFacture(id){
      const dialogRef = this.dialog.open(UpdatefactureComponent, {
        width: '800px',
        data: {id: id}
        });
        dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
         });
    }
  }
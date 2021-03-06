import { Component, OnInit } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { ApiService } from '../../services/api.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

// tslint:disable-next-line: class-name
export interface medecinsList {
  firstName: string;
  lastName: string;
  id: number;
  email?: string;
}

@Component({
  selector: 'app-medecins',
  templateUrl: './medecins.component.html',
  styleUrls: ['./medecins.component.scss']
})

export class MedecinsComponent implements OnInit {

  constructor(public searchb: SearchBarService, private api: ApiService, private router: Router) {}

  public searchTerm: string;

  public title = 'Medecins';

  public medecinsList: medecinsList[] = [];

  displayedMedecins = []; // La liste quiest liée à la vue (celle qui est affichée)
  paginatorInfo: PageEvent = {pageSize: 15, pageIndex: 0, length: this.medecinsList.length}; // Les informations que l'on lie au paginateur

  getuser(){
    this.api.getApiService('user').subscribe(data => {this.medecinsList = data as medecinsList[],
      this.displayedMedecins = this.medecinsList, 
      this.paginatorInfo.pageIndex = 0,
      this.paginatorInfo.length = this.displayedMedecins.length,
      this.displayedMedecins = this.paginateElements<medecinsList>(this.displayedMedecins, this.paginatorInfo);});
  }

  ngOnInit() {
    this.getuser();
  }

  // Méthode déclenchée lorsqu'une recherche est faite dans notre composant de recherche
  search(query: string): void {
    // Si la recherche est vide on affecte tous les éléments à la liste que l'on affiche
    this.displayedMedecins = this.medecinsList;

    // Sinon on filtre les éléments dont le nom ou le prénom ne commence pas par la chaîne recherchée
    if (query !== '') {
      this.displayedMedecins = this.medecinsList.filter((doctor) => {

        const len = query.length; // On récupère la taille de la chaîne recherchée
        // tslint:disable-next-line: max-line-length
        const firstname = doctor.firstName.trim().substr(0, len).toLocaleLowerCase(); // On crée une sous chaîne du prénom de la même taille que celle recherchée
        const lastname = doctor.lastName.trim().substr(0, len).toLowerCase(); // Idem ave cle nom

        // On vérifie ensuite l'égalité des chaînes (on transforme ces chaînes en minuscule pour ne pas être sensible à la casse)
        const firstNameMatched = firstname === query.toLowerCase();
        const lastNameMatched = lastname === query.toLowerCase();

        console.log(firstname);

        // On conserve les éléments si la sous-chaîne créée avec le prénom ou celle créée avec le nom correspond
        return firstNameMatched || lastNameMatched;
      });
    }

    this.paginatorInfo.pageIndex = 0; // On remet le paginateur à la première page
    this.paginatorInfo.length = this.displayedMedecins.length; // On affecte la taille des éléments trouvés à la taille du paginateur
    // tslint:disable-next-line: max-line-length
    this.displayedMedecins = this.paginateElements<medecinsList>(this.displayedMedecins, this.paginatorInfo); // On pagine nos éléments qui correspondent à la recherche
  }

  // Méthode déclenchée lorsque l'utilisateur change de page ou change la taille du paginateur
  pageChange(event: PageEvent): void {
    this.paginatorInfo = event; // On met à jour la variable qui contient les informations du paginateur
    this.displayedMedecins = this.paginateElements<medecinsList>(this.medecinsList, this.paginatorInfo); // On pagine nos éléments affichés
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

fiche(id: any) {
  this.router.navigate(['medecins/user', { id }]);
  console.log(id);
}

}

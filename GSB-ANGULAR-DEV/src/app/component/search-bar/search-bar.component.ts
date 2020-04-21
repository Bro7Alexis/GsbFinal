import { Component, OnInit, EventEmitter, OnDestroy, Output  } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnDestroy {

  @Output() searchChanged: EventEmitter<string> = new EventEmitter<string>(); //On créer un évenement de sortie de type string

  //On créer un Sujet de String pour réagir différemment lorsque l'utilisateur tape dans le champs de saisie
  debouncer: Subject<string> = new Subject<string>();

    // On crée un attribut ref pour contenir l'adresse mémoire de l'écouteur qui s'abonne à un Observable qui l'on initailise à null
    ref: Subscription = null;
  constructor(public searchb: SearchBarService) {
    this.searchb.show;
    this.ref = this.debouncer.pipe(
      //N'envoies pas d'information tant que la chaîne est identique à celle précédemment tapée
      distinctUntilChanged(), 

      //Ajoute un délai de 250 millisecondes entre chaque valeur
      debounceTime(250), 

      //Permet d'éffectuer un traitement pour chaque valeur, ici on envoie la chaîne qui est tapée
      tap(q => this.searchChanged.emit(q))
    ).subscribe();
   }

  // tslint:disable-next-line: member-ordering
  public searchDoctors: string; // Typer le type de la searchbar
  searchDoctorsUpdate = new Subject<string>(); // a chaque clique sur le clavier

  ngOnDestroy() {
    //Sécurité pour éviter les fuites mémoire, on néttoie l'édresse mémoire qui correspond à l'écouteur utiliser lors d'un .subscribe()
    if (!!this.ref) {
      this.ref.unsubscribe();
    }
  }

  search(q: string): void {
    //On envoie une nouvelle information à notre Sujet
    this.debouncer.next(q);
  }

}

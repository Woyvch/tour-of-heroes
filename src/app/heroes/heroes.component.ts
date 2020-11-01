import { Component, OnInit, } from '@angular/core';

import { Hero } from '../hero'; // import the Hero symbol
/* import { HEROES } from '../mock-heroes'; // import the mock HEROES*/
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service'; // import the MessageService

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
/*  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  }; */

  // A property called heroes to expose the HEROES array
  heroes: Hero[];

  /*selectedHero: Hero;
  constructor(private _heroService: HeroService, private _messageService: MessageService) { }*/

  constructor(private _heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  // A method to retrieve the heroes from the heroService
  getHeroes(): void {
    /* this.heroes = this._heroService.getHeroes(); */
    this._heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;
    this._messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  }*/

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this._heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this._heroService.deleteHero(hero).subscribe();
  }

}

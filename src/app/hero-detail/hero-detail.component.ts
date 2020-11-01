import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero'; // import the Hero symbol
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // The hero property must be an Input property, because the external HeroesComponent will bind to it 
  @Input() hero: Hero;
  
  constructor(
    private _route: ActivatedRoute, // holds information about the route to this instance
    private _location: Location, //service for interacting with the browser
    private _heroService: HeroService, // gets hero data from the remote server
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this._route.snapshot.paramMap.get('id');
    this._heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this._location.back();
  }

  save(): void {
    this._heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // import HTTP symbols

import { Observable, of } from 'rxjs'; // import from the RXJS library
import { catchError, map, tap } from 'rxjs/operators'; // Import the catchError symbol

import { Hero } from './hero'; // import the Hero symbol
//import { HEROES } from './mock-heroes'; // import the mock HEROES
import { MessageService } from './message.service'; // import the message service

// Make the HeroService available to the dependency injection system by registering a provider
@Injectable({
  providedIn: 'root'
})

export class HeroService {
  /* Log a HeroService message with the MessageService */
  private log(message: string) {
    this._messageService.add(`HeroService: ${message}`);
  }
  private _heroesUrl = 'api/heroes';  // URL to web api

  constructor(private _http: HttpClient, private _messageService: MessageService) { }
  // A method to return the mock heroes
  /* getHeroes(): Hero[] {
    return HEROES;
  } */

  /* The heroes web API expects a special header in HTTP save requests */
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /* A method that emits a single value, the array of mock heroes */
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
    this._messageService.add('HeroService: fetched heroes');
    // GET heroes from the server
    return this._http.get<Hero[]>(this._heroesUrl).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this._heroesUrl}/?id=${id}`;
    return this._http.get<Hero[]>(url).pipe(
      map(heroes => heroes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this._messageService.add(`HeroService: fetched hero id=${id}`);
    const url = `${this._heroesUrl}/${id}`; //constructs a request URL with the desired hero's id.
    return this._http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /* Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this._http.put(this._heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /* POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this._http.post<Hero>(this._heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /* DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this._heroesUrl}/${id}`;
    return this._http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this._http.get<Hero[]>(`${this._heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

}

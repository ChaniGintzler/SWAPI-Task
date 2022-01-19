import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  concat,
  forkJoin,
  from,
  observable,
  Observable,
  of,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  groupBy,
  expand,
  map,
  concatMap,
  mergeMap,
  switchMap,
  tap,
  filter,
} from 'rxjs/internal/operators';
import { Vehicle } from '../models/vehicle.model';
import { Pilot } from '../models/pilot.model';

@Injectable({
  providedIn: 'root',
})
export class ApiDataService implements OnInit {
  url = environment.baseUrl;
  private maxVehicles: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  maxVehicle$ = this.maxVehicles.asObservable();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  async getMaxVehicle() {
    let pilotsUrls: any[] = [];
    let vehicles = await this.getvehiclesRec(`${this.url}vehicles`)
      .pipe(
        tap((item) =>
          item.map((ve: Vehicle) => {
            ve.pilots.forEach((p) => {
              if (!pilotsUrls.includes(p)) {
                pilotsUrls.push(p);
              }
            });
          })
        )
      )
      .toPromise();

    forkJoin(this.convertPilotsUrlsToObs(pilotsUrls)).subscribe((res) => {
      vehicles = vehicles
        .map((element: Vehicle) => {
          let pilotsWithPlanet = res.filter((pilot: any) =>
            element.pilots.includes(pilot.url)
          );
          return {
            ...element,
            pilotsWithPlanet,
            sumPopulation: pilotsWithPlanet
              .map((item: any) =>
                isNaN(+item.planet.population) ? 0 : +item.planet.population
              )
              .reduce((prev, curr) => prev + curr, 0),
          };
        })
        .sort((a: Vehicle, b: Vehicle) => b.sumPopulation - a.sumPopulation);

      /*--- I didnt know whether to show multiple objects if their populations are eqeul

      // let arrSums=allve.map(a => (a.sumPopulation));
      //let max =Math.max(...arrSums) ;
      //allve.filter(ve=>ve.sumPopulation==max

      //----*/
     
      this.maxVehicles.next([vehicles[0]]);
    });
  }

  convertPilotsUrlsToObs(pilots: any): any {
    console.log(pilots);
    if (!pilots) return [];
    else return pilots.map((p: any) => this.getPilotWithPlanetObsByUrl(p));
  }

  getPilotWithPlanetObsByUrl(url: string) {
    return this.http
      .get(url)
      .pipe(
        switchMap((pilot: any) =>
          this.getDataByUrl(pilot.homeworld).pipe(
            map((planet: any) => ({ ...pilot, planet: planet }))
          )
        )
      );
  }

  getDataByUrl(url: string): Observable<any> {
    if (url) {
      return this.http.get(url);
    } else {
      return of(null);
    }
  }

  getPilotsForVehicle(pilots: string[]): void {
    pilots.map((pilot: any) =>
      this.getPilotWithPlanetObsByUrl(pilot).subscribe((res) => (pilot = res))
    );
  }

  getPlanet(id: number): Observable<any> {
    const url = `${this.url}planets/${id}`;
    return this.http.get(url);
  }

  getvehiclesRec(url: string): Observable<any> {
    return this.getDataByUrl(url).pipe(
      concatMap((data: any) => {
        if (data.next) {
          return this.getvehiclesRec(data.next).pipe(
            map((resultsToJoin: any) => [
              ...data.results.filter((res: Vehicle) => res.pilots.length > 0),
              ...resultsToJoin,
            ])
          );
        } else {
          return of(data.results);
        }
      })
    );
  }
}

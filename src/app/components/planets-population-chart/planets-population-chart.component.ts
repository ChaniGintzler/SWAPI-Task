import { Component, OnInit } from '@angular/core';
import { combineLatest, forkJoin } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/internal/operators';
import { Planet } from 'src/app/models/planet';
import { ApiDataService } from 'src/app/services/api-data.service';

@Component({
  selector: 'app-planets-population-chart',
  templateUrl: './planets-population-chart.component.html',
  styleUrls: ['./planets-population-chart.component.scss'],
})
export class PlanetsPopulationChartComponent implements OnInit {
  planets$: any;
  ids = [1, 2, 6, 7, 8];

  constructor(private service: ApiDataService) {}

  ngOnInit(): void {
    this.getPlanets();
  }

  getPlanets(): void {
    this.planets$ = combineLatest(
      this.ids.map((id) =>
        this.service.getPlanet(id).pipe(
          map((planet) => {
            return { ...planet, height: +planet.population / 10000000 };
          }),catchError(error=>{throw error})
        )
      )
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiDataService } from 'src/app/services/api-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-highest-sum-population',
  templateUrl: './highest-sum-population.component.html',
  styleUrls: ['./highest-sum-population.component.scss'],
})
export class HighestSumPopulationComponent implements OnInit {
 
  url = environment.baseUrl;
  results$: Observable<any>;
  
  constructor(private service: ApiDataService) {
    this.results$ = this.service.maxVehicle$;
  }

  ngOnInit(): void {
    this.service.getMaxVehicle();
  }
}

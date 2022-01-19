import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HighestSumPopulationComponent } from './components/highest-sum-population/highest-sum-population.component';
import { PlanetsPopulationChartComponent } from './components/planets-population-chart/planets-population-chart.component';
@NgModule({
  declarations: [
    AppComponent,
    HighestSumPopulationComponent,
    PlanetsPopulationChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

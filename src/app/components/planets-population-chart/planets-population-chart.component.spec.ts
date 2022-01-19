import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetsPopulationChartComponent } from './planets-population-chart.component';

describe('PlanetsPopulationChartComponent', () => {
  let component: PlanetsPopulationChartComponent;
  let fixture: ComponentFixture<PlanetsPopulationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetsPopulationChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetsPopulationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

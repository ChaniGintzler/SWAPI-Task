import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighestSumPopulationComponent } from './highest-sum-population.component';

describe('HighestSumPopulationComponent', () => {
  let component: HighestSumPopulationComponent;
  let fixture: ComponentFixture<HighestSumPopulationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighestSumPopulationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighestSumPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

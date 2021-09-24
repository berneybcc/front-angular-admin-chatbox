import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasReportComponent } from './graficas-report.component';

describe('GraficasReportComponent', () => {
  let component: GraficasReportComponent;
  let fixture: ComponentFixture<GraficasReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficasReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

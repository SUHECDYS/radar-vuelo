import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHotspotsPage } from './dashboard-hotspots.page';

describe('DashboardHotspotsPage', () => {
  let component: DashboardHotspotsPage;
  let fixture: ComponentFixture<DashboardHotspotsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHotspotsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardHotspotsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

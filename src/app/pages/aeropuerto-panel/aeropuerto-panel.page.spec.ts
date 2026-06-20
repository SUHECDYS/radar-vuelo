import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeropuertoPanelPage } from './aeropuerto-panel.page';

describe('AeropuertoPanelPage', () => {
  let component: AeropuertoPanelPage;
  let fixture: ComponentFixture<AeropuertoPanelPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AeropuertoPanelPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeropuertoPanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

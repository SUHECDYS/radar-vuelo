import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VueloDetallePage } from './vuelo-detalle.page';

describe('VueloDetallePage', () => {
  let component: VueloDetallePage;
  let fixture: ComponentFixture<VueloDetallePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VueloDetallePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VueloDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

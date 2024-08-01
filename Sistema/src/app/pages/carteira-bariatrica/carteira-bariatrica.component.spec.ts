import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteiraBariatricaComponent } from './carteira-bariatrica.component';

describe('CarteiraBariatricaComponent', () => {
  let component: CarteiraBariatricaComponent;
  let fixture: ComponentFixture<CarteiraBariatricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarteiraBariatricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteiraBariatricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidaCarteiraComponent } from './valida-carteira.component';

describe('ValidaCarteiraComponent', () => {
  let component: ValidaCarteiraComponent;
  let fixture: ComponentFixture<ValidaCarteiraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidaCarteiraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidaCarteiraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
